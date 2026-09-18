"use client";
import { useState } from "react";
import Image from "next/image";
import { MapPin, Calendar, Users, Settings, Fuel, ChevronRight } from "lucide-react";
import carsData from "../../data/car.json";

export default function RentalMobil() {
  // 1. State untuk menyimpan input jumlah kursi, dimulai dari 1
  const [seatQuery, setSeatQuery] = useState(1);
  
  // 2. State untuk tipe penyewaan (Tanpa Sopir / Dengan Sopir)
  const [rentalType, setRentalType] = useState("Tanpa Sopir");

  // 3. Logika Filter: Menampilkan mobil yang kursinya >= input pengguna
  const filteredCars = carsData.filter((car) => {
    return car.seats >= seatQuery;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[50vh] flex flex-col justify-center overflow-hidden">
        {/* Background Gambar */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1920&auto=format&fit=crop')" }}
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="relative z-20 text-center px-4 mt-[-80px]">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Sewa Mobil Mudah & Fleksibel
          </h1>
          <p className="text-white/90 text-lg">Temukan armada terbaik untuk perjalanan Anda.</p>
        </div>
      </section>

      {/* --- WIDGET PENCARIAN (Menumpuk di atas Hero) --- */}
      <section className="relative z-30 max-w-5xl mx-auto px-4 -mt-24 w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          
          {/* Pilihan Tipe Rental (Radio Button Style) */}
          <div className="flex items-center gap-6 mb-6 pb-4 border-b border-gray-100">
            <span className="font-bold text-gray-800">Rental Mobil</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="rentalType" 
                className="w-4 h-4 text-orange-600 focus:ring-orange-500 accent-orange-600" 
                checked={rentalType === "Tanpa Sopir"}
                onChange={() => setRentalType("Tanpa Sopir")}
              />
              <span className="text-gray-700 text-sm">Tanpa Sopir</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="rentalType" 
                className="w-4 h-4 text-orange-600 focus:ring-orange-500 accent-orange-600"
                checked={rentalType === "Dengan Sopir"}
                onChange={() => setRentalType("Dengan Sopir")}
              />
              <span className="text-gray-700 text-sm">Dengan Sopir</span>
            </label>
          </div>

          {/* Form Input dengan layout baru */}
          <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
            
            {/* Input Lokasi */}
            <div className="w-full md:w-5/12">
              <label className="block text-xs font-bold text-gray-600 mb-2">Lokasi Rental Anda</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari kota atau wilayah" 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm text-gray-800"
                />
              </div>
            </div>

            {/* Input Jumlah Kursi (Stepper Style) */}
            <div className="w-full md:w-4/12">
              <label className="block text-xs font-bold text-gray-600 mb-2">
                Kapasitas Penumpang
              </label>
              <div className="flex items-center justify-between border border-gray-300 rounded-lg p-1.5 w-full bg-white">
                
                {/* Ikon & Teks Label */}
                <div className="flex items-center gap-3 pl-2">
                  <Users className="text-gray-400" size={18} />
                  <span className="text-sm font-medium text-gray-700">
                    {seatQuery} Orang
                  </span>
                </div>

                {/* Tombol Plus Minus */}
                <div className="flex items-center gap-2 pr-1">
                  <button 
                    onClick={() => setSeatQuery(prev => Math.max(1, prev - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                  >
                    -
                  </button>
                  <button 
                    onClick={() => setSeatQuery(prev => prev + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- HASIL FILTER & DAFTAR MOBIL --- */}
      <section className="w-full py-16">
        <div className="max-w-5xl mx-auto px-4">
          
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Pilihan Mobil Tersedia
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {filteredCars.length > 0 
                  ? `Menampilkan ${filteredCars.length} mobil yang cukup untuk ${seatQuery} penumpang.` 
                  : `Maaf, tidak ada mobil yang muat untuk ${seatQuery} penumpang.`}
              </p>
            </div>
          </div>

          {/* Grid Mobil */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {filteredCars.map((car) => (
              <div 
                key={car.id} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 w-full bg-gray-100">
                  <Image 
                    src={car.image} 
                    alt={car.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                    {car.type}
                  </span>
                </div>

                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{car.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
                    <div className="flex items-center text-gray-700 text-sm font-medium">
                      <Users size={16} className="mr-2 text-orange-500 shrink-0" />
                      {car.seats} Kursi
                    </div>
                    <div className="flex items-center text-gray-700 text-sm font-medium">
                      <Settings size={16} className="mr-2 text-orange-500 shrink-0" />
                      {car.transmission}
                    </div>
                    <div className="flex items-center text-gray-700 text-sm font-medium">
                      <Fuel size={16} className="mr-2 text-orange-500 shrink-0" />
                      {car.fuel}
                    </div>
                    <div className="flex items-center text-gray-700 text-sm font-medium">
                      <Calendar size={16} className="mr-2 text-orange-500 shrink-0" />
                      Tahun {car.year}
                    </div>
                  </div>

                  <div className="mt-auto border-t border-gray-100 pt-4 flex items-end justify-between gap-2">
                    <div>
                      <span className="text-xs text-gray-500 block font-medium">Mulai dari</span>
                      <div className="text-lg font-bold text-orange-600">
                        Rp{car.price.toLocaleString("id-ID")}<span className="text-xs font-normal text-gray-500">/hari</span>
                      </div>
                      <div className="h-5 mt-1 flex items-center">
                        {car.isAllIn ? (
                          <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-sm uppercase tracking-wide border border-green-200">
                            ✓ All-In Package
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-sm uppercase tracking-wide border border-gray-200">
                            Unit Only
                          </span>
                        )}
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/6282283225920?text=${encodeURIComponent(`Halo Admin Happy Tour, saya tertarik untuk rental mobil ${car.name} (${rentalType}). Apakah masih tersedia?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1 shrink-0 shadow-sm hover:shadow cursor-pointer"
                    >
                      <span>Sewa</span>
                      <ChevronRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}