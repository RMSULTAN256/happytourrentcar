"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Users, Check, Minus, Plus, Star, Info, X, ChevronRight, ArrowLeft } from "lucide-react";
import tourPackages from "../../../data/paket.json";

interface ActivityItem {
  name: string;
  keyword?: string; 
  image?: string;
}

interface ItineraryDay {
  day: string;
  title?: string;
  activities: (ActivityItem | string)[];
}

type OptionKey = 'batam_only' | 'batam_bintan';

export default function DetailPaketTour() {
  // 1. STATE & KONFIGURASI 2 PILIHAN PAKET
  const [selectedOption, setSelectedOption] = useState<OptionKey>('batam_only');
  const [pax, setPax] = useState(5); 

  // STATE UNTUK PETA DINAMIS
  const [selectedPlace, setSelectedPlace] = useState("");

  // Data Konfigurasi Paket
  const packageOptions = {
    batam_only: {
      price: 650,
      minPax: 5,
      title: "Pakej 3D2N Batam",
      shortSub: "Min. 5 Pax • Eksplorasi Batam Saja",
      includes: [
        "Tiket Ferry Johor to Batam 2 Way",
        "Hotel 3 Bintang 2 Malam",
        "Transport Full AC selama 3 Hari",
        "Breakfast 2x, Lunch 2x, Dinner 2x",
        "Tiket Lawatan Jembatan Barelang",
        "Air Mineral 1 btl/day"
      ],
      excludes: [
        "Pengeluaran Pribadi & Belanja",
        "Tipping Supir / Guide (Sukarela)"
      ]
    },
    batam_bintan: {
      price: 750,
      minPax: 5,
      title: "Pakej 3D2N Batam dan Bintan",
      shortSub: "Min. 5 Pax • Batam & Akses Bintan",
      includes: [
        "Tiket Ferry Johor to Batam 2 Way",
        "Tiket Ferry/Boat Batam to Bintan 2 Way",
        "Hotel 3 Bintang 2 Malam",
        "Transport Full AC 3 Hari di Batam & Bintan",
        "Tiket Lawatan Gurun Pasir dan Telaga Biru",
        "Tiket Masuk Kawasan Lagoi",
        "Breakfast 2x, Lunch 2x, Dinner 2x",
        "Tiket Lawatan Jembatan Barelang",
        "Air Mineral 1 btl/day"
      ],
      excludes: [
        "Pengeluaran Pribadi & Belanja",
        "Tipping Supir / Guide (Sukarela)"
      ]
    }
  };

  // Logika Perhitungan Dinamis
  const currentPricePerPax = packageOptions[selectedOption].price;
  const currentMinPax = packageOptions[selectedOption].minPax;
  const totalPrice = pax * currentPricePerPax;
  const isPaxValid = pax >= currentMinPax;

  // Handler Otomatis Menyesuaikan Jumlah Pax
  const handleOptionChange = (optionKey: OptionKey) => {
    setSelectedOption(optionKey);
    const targetMinPax = packageOptions[optionKey].minPax;
    if (pax < targetMinPax) {
      setPax(targetMinPax);
    }
  };

  // Mengambil Data Tour ID 2 (Paket 3D2N)
  const tourData = tourPackages.find((p) => p.path === "/3d2n") || tourPackages.find((p) => p.id === 2);

  if (!tourData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-500">Paket Tour Tidak Ditemukan</h2>
      </div>
    );
  }

  // Cek apakah aktivitas adalah aktivitas umum tanpa koordinat wisata
  const isGenericActivity = (name: string) => {
    const lower = name.toLowerCase().trim();
    return [
      "lunch",
      "dinner",
      "hotel",
      "check in",
      "sarapan di hotel",
      "free and easy",
      "pelabuhan untuk kembali ke malaysia"
    ].includes(lower);
  };

  // Peta Dinamis
  let defaultPlaceName = "Welcome to Batam";
  if (tourData?.itinerary?.[0]?.activities?.[0]) {
    const firstAct = tourData.itinerary[0].activities[0];
    const name = typeof firstAct === 'string' ? firstAct : firstAct.name;
    if (!isGenericActivity(name)) {
      defaultPlaceName = name;
    }
  }
  const activePlace = selectedPlace || defaultPlaceName;

  const getImageUrl = (source: string, width: number, height: number, isKeyword = false) => {
    if (!source) return `https://placehold.co/${width}x${height}/orange/white?text=No+Image`;
    if (source.startsWith("http") || source.startsWith("/")) return source;
    if (isKeyword) return `https://loremflickr.com/${width}/${height}/${encodeURIComponent(source)}/all`;
    return `https://images.unsplash.com/photo-${source}?q=80&w=${width}&auto=format&fit=crop`;
  };

  const waNumber = "6282283225920";
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo Admin Happy Tour, saya tertarik dengan paket tour *${tourData.name}*.\n\n` +
    `• Pilihan: *${packageOptions[selectedOption].title}*\n` +
    `• Jumlah Peserta: ${pax} Pax (Minimal: ${currentMinPax} pax)\n` +
    `• Harga per Pax: RM ${currentPricePerPax}\n\n` +
    `*Total Estimasi Biaya: RM ${totalPrice}*\n\nApakah jadwal keberangkatan untuk paket ini masih tersedia?`
  )}`;

  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-20 font-sans">
      
      {/* Header Banner */}
      <section className="relative w-full h-[55vh] min-h-[380px] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url('${getImageUrl(tourData.image || "1548013146-72479768bada", 1920, 1080)}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-10" />
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-200 mb-3">
            <Link href="/" className="hover:text-orange-400 transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Beranda
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/paket-tour" className="hover:text-orange-400 transition-colors">
              Paket Tour
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-orange-400 font-semibold truncate max-w-[200px] md:max-w-none">
              {tourData.name}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {tourData.duration || "3 Hari 2 Malam"}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold">
              {tourData.location || "Batam & Bintan"}
            </span>
            <span className="bg-emerald-500/90 text-white text-xs px-3 py-1 rounded-full font-bold">
              Tarif Wisatawan (MYR)
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
            {tourData.name}
          </h1>
          <p className="text-gray-200 text-sm md:text-base flex items-center gap-2">
            <MapPin size={18} className="text-orange-400 shrink-0" /> Eksplorasi destinasi terbaik di {tourData.location || "Batam & Bintan"}.
          </p>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 md:-mt-12 relative z-30 flex flex-col lg:flex-row gap-8">
        
        {/* KOLOM KIRI: Detail & Itinerary */}
        <div className="flex-1 space-y-8">
          
          {/* BOX TENTANG PAKET */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tentang Paket</h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base whitespace-pre-line">
              {tourData.description}
            </p>
            
            {tourData.highlights && tourData.highlights.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Highlight Destinasi</h3>
                <div className="flex flex-wrap gap-2.5">
                  {tourData.highlights.map((dest: string, index: number) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-800 border border-orange-100 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium shadow-2xs"
                    >
                      <Star size={14} className="text-orange-500 fill-orange-500" />
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BOX DETAIL 2 PILIHAN PAKET */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Info className="text-orange-500" /> Rincian Fasilitas Paket
            </h2>
            <p className="text-gray-500 text-sm mb-6">Pilih variasi paket yang paling sesuai dengan kebutuhan perjalanan Anda:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(Object.entries(packageOptions) as [OptionKey, typeof packageOptions[OptionKey]][]).map(([key, pkg]) => (
                <div 
                  key={key} 
                  onClick={() => handleOptionChange(key)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col h-full cursor-pointer ${
                    selectedOption === key 
                      ? 'border-orange-500 bg-orange-50/40 shadow-md ring-2 ring-orange-500/20' 
                      : 'border-gray-200 bg-gray-50/70 hover:border-orange-300 hover:bg-orange-50/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-800 text-xl leading-tight">{pkg.title}</h3>
                    <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      selectedOption === key ? 'border-orange-600 bg-orange-600' : 'border-gray-300'
                    }`}>
                      {selectedOption === key && <Check size={12} className="text-white stroke-3" />}
                    </div>
                  </div>

                  <div className="text-orange-600 font-extrabold mb-1 text-2xl">
                    RM {pkg.price} <span className="text-sm text-gray-500 font-medium">/ pax</span>
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5 pb-4 border-b border-gray-200/80">
                    Minimal {pkg.minPax} Peserta
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-2">Fasilitas Termasuk:</span>
                      <ul className="space-y-2.5">
                        {pkg.includes.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-snug">
                            <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {pkg.excludes && pkg.excludes.length > 0 && (
                      <div className="pt-3 border-t border-gray-200/60">
                        <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block mb-2">Tidak Termasuk:</span>
                        <ul className="space-y-2">
                          {pkg.excludes.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-snug">
                              <X size={14} className="text-rose-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOX ITINERARY DENGAN MAPS INTEGRASI */}
          {tourData.itinerary && tourData.itinerary.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Clock className="text-orange-500" /> Rencana Perjalanan (Itinerary)
              </h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                
                {/* Bagian Kiri: Timeline Jadwal */}
                <div className="w-full md:w-1/2 relative border-l-2 border-orange-200 ml-3 md:ml-4 space-y-12">
                  {tourData.itinerary.map((dayData: ItineraryDay, dayIndex: number) => (
                    <div key={dayIndex} className="relative pl-6 md:pl-8">
                      <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-orange-500 border-4 border-white shadow-sm" />
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{dayData.day}</h3>
                      <p className="text-sm text-gray-500 mb-6">{dayData.title || "Aktivitas Harian"}</p>
                      
                      <div className="flex flex-col gap-2">
                        {dayData.activities?.map((item: ActivityItem | string, index: number) => {
                          const isString = typeof item === 'string';
                          const objItem = item as ActivityItem; 

                          const placeName = isString ? item : objItem.name;
                          const rawSource = !isString && objItem.image ? objItem.image : (!isString ? objItem.keyword : null);
                          const imgSrc = rawSource ? getImageUrl(rawSource, 400, 300) : getImageUrl(placeName, 400, 300, true);

                          const isGeneric = isGenericActivity(placeName);
                          const isActive = activePlace === placeName;

                          return (
                            <div 
                              key={index} 
                              onClick={() => {
                                if (!isGeneric) {
                                  setSelectedPlace(placeName);
                                }
                              }}
                              className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 ${
                                isGeneric ? "opacity-80" : "cursor-pointer"
                              } ${
                                isActive 
                                  ? 'bg-orange-50 border border-orange-200 shadow-2xs' 
                                  : isGeneric 
                                  ? 'hover:bg-transparent' 
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              {/* Nomor Step */}
                              <span className={`flex items-center justify-center min-w-[28px] h-[28px] rounded-full text-xs font-bold border shrink-0 transition-colors ${
                                isActive 
                                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm' 
                                  : 'bg-white text-orange-600 border-orange-200'
                              }`}>
                                {index + 1}
                              </span>

                              {/* Thumbnail Foto Langsung di Mobile & Desktop */}
                              {rawSource && (
                                <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-gray-100 bg-gray-100">
                                  <Image 
                                    src={imgSrc}
                                    alt={placeName}
                                    fill
                                    sizes="44px"
                                    className="object-cover"
                                    unoptimized 
                                  />
                                </div>
                              )}

                              {/* Nama Tempat */}
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium transition-colors truncate ${
                                  isActive ? 'text-orange-600 font-bold' : 'text-gray-800'
                                }`}>
                                  {placeName}
                                </p>
                                {!isGeneric && (
                                  <span className="text-[11px] text-gray-400 block">
                                    Klik untuk cek di peta
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bagian Kanan: Peta Google Interaktif (Sticky) */}
                <div className="w-full md:w-1/2">
                  <div className="sticky top-28 h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden border-4 border-orange-100 shadow-md relative bg-gray-50 transition-all">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="absolute top-0 left-0"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(activePlace + " Batam Bintan")}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      allowFullScreen
                    ></iframe>
                    
                    {/* Label Penanda Tempat yang sedang aktif di pojok Maps */}
                    <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 pointer-events-none max-w-[85%]">
                      <p className="text-xs font-bold text-gray-800 flex items-center gap-1.5 truncate">
                        <MapPin size={14} className="text-orange-500 shrink-0" />
                        <span className="truncate">{activePlace}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-400 mt-3 italic">
                    *Klik destinasi pada jadwal di samping untuk melihat lokasinya di peta.
                  </p>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* KOLOM KANAN: Kalkulator Harga (2 Pilihan) */}
        <div className="w-full lg:w-[380px]">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 lg:sticky lg:top-24">
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">Pesan Paket Tour</h3>
            <p className="text-gray-500 text-sm mb-6">Pilih rute perjalanan dan hitung biaya Anda.</p>

            {/* SELEKSI 2 TIPE PAKET (Radio Bersih) */}
            <div className="mb-6 space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pilihan Paket:</h4>
              
              {(Object.entries(packageOptions) as [OptionKey, typeof packageOptions[OptionKey]][]).map(([key, pkg]) => (
                <div 
                  key={key}
                  onClick={() => handleOptionChange(key)}
                  className={`flex items-center gap-3 p-3.5 border rounded-2xl cursor-pointer transition-all duration-200 ${
                    selectedOption === key ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-500/20' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center ${selectedOption === key ? 'border-orange-600' : 'border-gray-300'}`}>
                    {selectedOption === key && <div className="w-2 h-2 rounded-full bg-orange-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <p className="font-bold text-gray-800 text-sm truncate">{pkg.title}</p>
                      <span className="text-orange-600 font-extrabold text-sm shrink-0">RM {pkg.price}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{pkg.shortSub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT JUMLAH PESERTA DENGAN VALIDASI MINIMAL */}
            <div className="bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-orange-500 shrink-0" />
                  <span className="font-semibold text-gray-700 text-sm">Jumlah Peserta</span>
                </div>
                <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                  Min. {currentMinPax} Pax
                </span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-400">Sesuaikan peserta:</span>
                <div className="flex items-center gap-3 bg-white px-2.5 py-1.5 rounded-xl border border-gray-200 shadow-2xs">
                  <button 
                    type="button"
                    onClick={() => setPax(Math.max(currentMinPax, pax - 1))}
                    disabled={pax <= currentMinPax}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="font-bold text-base w-5 text-center text-gray-800">{pax}</span>
                  <button 
                    type="button"
                    onClick={() => setPax(pax + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* DISPLAY TOTAL HARGA AKHIR */}
            <div className="flex justify-between items-end mb-6 pb-6 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Total Estimasi</span>
              <div className="text-right">
                <div className="text-3xl font-black text-orange-600">RM {totalPrice}</div>
                <div className="text-xs text-gray-400 mt-1">RM {currentPricePerPax} / pax</div>
              </div>
            </div>

            {/* TOMBOL WHATSAPP */}
            <a 
              href={isPaxValid ? waLink : '#'}
              target={isPaxValid ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isPaxValid 
                  ? 'bg-[#25D366] hover:bg-[#1DA851] hover:shadow-[#25D366]/30 cursor-pointer' 
                  : 'bg-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Pesan via WhatsApp
            </a>
            <p className="text-center text-xs text-gray-400 mt-4">
              Respon cepat langsung dari tim reservasi.
            </p>
          </div>
        </div>

      </section>

      {/* Floating Sticky Bar Khusus Mobile */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 z-50 flex items-center justify-between lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div>
          <span className="text-[11px] text-gray-500 block truncate max-w-[170px]">
            {packageOptions[selectedOption].title} ({pax} Pax)
          </span>
          <div className="text-xl font-black text-orange-600">RM {totalPrice}</div>
        </div>
        <a
          href={isPaxValid ? waLink : '#'}
          target={isPaxValid ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          <span>Pesan WA</span>
        </a>
      </div>

    </div>
  );
}
