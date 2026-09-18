"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Car, Banknote, UserCheck, Users, Fuel, Calendar, Settings, ChevronRight, MapPin, Clock } from "lucide-react";
import tourPackages from "../data/paket.json";
import carsData from "../data/car.json";

export default function Home() {
  const image = [
    "/header2.png",
    "/header3.jpg",
    "/header4.png",
    "/header5.png",
    "/header6.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "City Car", "MPV", "Minibus & Bus"];

  const filteredCars = selectedCategory === "Semua"
    ? carsData
    : selectedCategory === "Minibus & Bus"
    ? carsData.filter((c) => c.type.includes("Bus") || c.type.includes("Minibus"))
    : carsData.filter((c) => c.type === selectedCategory);

  useEffect(() => {
    const interval= setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === image.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [image.length]);

  return (
    <>
      <section className="relative w-full h-[60vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="flex h-full w-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {image.map((src, index) => (
              <div
                key={index}
                className="h-full w-full shrink-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${src}')` }}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80 z-10"></div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 w-full">
          <h1 className="font-montserrat text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-xl tracking-tight leading-tight md:leading-snug">
            <span className="text-orange-500 drop-shadow-md">Happy Tour</span> 
            <br className="block md:hidden" /> 
            & Rental Mobil
          </h1>
          
          <p className="text-gray-100 text-center mt-4 md:mt-5 text-base md:text-lg max-w-2xl mx-auto drop-shadow-md font-light leading-relaxed">
            Jelajahi Destinasi Tanpa Beban. Dari sewa mobil fleksibel sampai paket travel lengkap, kami siapkan semuanya.
          </p>
        </div>
      </section>

      <section className="w-full py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Tentang Kami
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            Happy Tour & Rental Mobil adalah penyedia layanan transportasi dan perjalanan terpercaya yang berdedikasi untuk memberikan pengalaman berkendara yang aman, nyaman, dan tak 
            terlupakan. Kami hadir untuk menjawab segala kebutuhan mobilitas Anda, baik untuk liburan keluarga, perjalanan bisnis, maupun petualangan seru bersama teman.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Kami menawarkan berbagai pilihan armada yang selalu terawat dan siap disewa secara harian maupun mingguan. Selain itu, kami juga menyediakan paket travel komprehensif yang 
            dirancang khusus dengan harga kompetitif. Dengan pelayanan profesional dan fleksibel, kami berkomitmen menjadi mitra perjalanan terbaik Anda. Nikmati perjalanan tanpa repot, 
            karena kepuasan Anda adalah prioritas utama kami.
          </p>
        </div>
      </section>

      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
            Keunggulan Kami
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="mb-4 p-4 bg-orange-50 rounded-full text-orange-600">
                <Car size={32} strokeWidth={1.5} />
              </div> 
              <h3 className="text-xl font-bold text-gray-800 mb-2">Armada Terawat</h3>
              <p className="text-gray-600">
                Semua mobil kami selalu diservis rutin dan dalam kondisi prima untuk kenyamanan Anda.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="mb-4 p-4 bg-orange-50 rounded-full text-orange-600">
                <Banknote size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Harga Kompetitif</h3>
              <p className="text-gray-600">
                Kami menawarkan paket sewa dan travel dengan harga yang jujur tanpa biaya tersembunyi.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="mb-4 p-4 bg-orange-50 rounded-full text-orange-600">
                <UserCheck size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sopir Berpengalaman</h3>
              <p className="text-gray-600">
                Perjalanan Anda akan didampingi oleh sopir yang terlatih, ramah, dan sangat memahami rute jalan untuk kenyamanan maksimal.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
            Pilihan Armada Kami
          </h2>
          <p className="text-gray-500 text-center mb-8 max-w-2xl">
            Berbagai pilihan mobil yang selalu terawat dan siap menemani perjalananmu.
          </p>

          {/* Filter Kategori */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

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
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
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
                      href={`https://wa.me/6282283225920?text=${encodeURIComponent(`Halo Admin Happy Tour, saya tertarik untuk sewa mobil ${car.name}. Apakah unit masih tersedia?`)}`}
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

      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
            Jenis Paket Tour
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl">
            Pilih destinasi impianmu. Kami siapkan itinerary terbaik, transportasi nyaman, dan pengalaman yang tak terlupakan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {tourPackages.map((tour) => (
              <div 
                key={tour.id} 
                className="group relative h-[400px] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${tour.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col z-10">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="flex items-center text-orange-400 text-sm font-semibold">
                      <Clock size={14} className="mr-1" /> {tour.duration}
                    </span>
                    <span className="flex items-center text-gray-300 text-sm">
                      <MapPin size={14} className="mr-1" /> {tour.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {tour.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}