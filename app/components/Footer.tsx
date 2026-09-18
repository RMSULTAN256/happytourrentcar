import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12 mt-auto border-t-4 border-orange-500 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* TOP SECTION: GRID 3 KOLOM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Kolom 1: Branding & Deskripsi (Lebih Lebar) */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
              Happy<span className="text-orange-500">Tour</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Mitra perjalanan terpercaya Anda di Kepulauan Riau. Kami menyediakan paket wisata tak terlupakan dan layanan rental mobil prima untuk segala kebutuhan mobilitas Anda di Batam, Bintan, dan sekitarnya.
            </p>
            
            {/* Ikon Media Sosial (Menggunakan SVG Bebas Error) */}
            <div className="flex gap-3">
              <a href="https://facebook.com/keloearga.zrz" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://tiktok.com/@keloearga.zrz" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
          </div>

          {/* Kolom 2: Layanan & Tautan Cepat */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Layanan Kami</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/paket-tour" className="flex items-center gap-2 hover:text-orange-400 transition-colors group">
                  <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" /> Paket Tour Bintan
                </a>
              </li>
              <li>
                <a href="/rental-mobil" className="flex items-center gap-2 hover:text-orange-400 transition-colors group"><ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" /> Rental Mobil Harian
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 leading-snug">Batu Aji, Kota Batam, Kepulauan Riau 29461</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span className="text-gray-400">+62 822-8322-5920</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2026 HappyTourRentCar. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-orange-400 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}