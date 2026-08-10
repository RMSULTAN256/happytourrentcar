import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    // Menangkap IP dari body request
    const { ip } = await req.json();

    if (!ip) {
      return NextResponse.json({ status: "ignored" }, { status: 400 });
    }

    const client = await clientPromise;
    const collection = client.db("analytics").collection("pending_ips");

    // Cek spam/duplikat dalam 2 menit terakhir
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const recent = await collection.findOne({
      ip,
      createdAt: { $gte: twoMinutesAgo }
    });

    if (recent) {
      return NextResponse.json({ status: "duplicate_skipped" });
    }

    // 1. Simpan ke MongoDB (seperti biasa)
    await collection.insertOne({
      ip,
      createdAt: new Date(),
    });

    try {
      const n8nWebhookUrl = "https://rmsrms.app.n8n.cloud/webhook/analyst";
      console.log('Try sending result to n8n');
      await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.N8N_AUTH_TOKEN}`
        },
        body: JSON.stringify({
          ip: ip,
          timestamp: new Date().toISOString(),
          message: "Ada pengunjung baru!"
        })
      });
    } catch (webhookError) {
      console.error("Gagal mengirim ke n8n:", webhookError);
    }

    return NextResponse.json({ status: "queued_and_sent_to_n8n" });

  } catch (error) {
    console.error("Terjadi kesalahan pada Server:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}