"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isBlurPage = pathname === "/";
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLink = [
    { name: "Beranda", href: "/" },
    { name: "Rental Mobil", href: "/rental-mobil" },
    { name: "Paket Tour", href: "/paket-tour" },
    { name: "Hubungi", href: "/kontak" },
  ];

  const useDarkText = isScrolled || !isBlurPage || isOpen;

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-white shadow-md" 
          : isBlurPage 
            ? "backdrop-blur-md shadow-sm bg-white/5" 
            : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link 
          href="/" 
          className={`text-lg font-bold transition-colors duration-300 ${
            useDarkText ? "text-gray-800" : "text-white"
          }`}
        >
          HappyTourRentCar
        </Link>

        <div className="hidden md:flex gap-2 font-inter">
          {navLink.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg transition-all duration-500 ease-out text-sm font-medium hover:scale-105 active:scale-95 ${
                  isActive
                    ? useDarkText
                      ? "bg-orange-50 text-orange-600 shadow-sm"
                      : "bg-white/20 text-white shadow-sm backdrop-blur-sm"
                    : useDarkText
                      ? "text-gray-500 hover:bg-gray-100 hover:text-gray-900" 
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-1 rounded-md transition-colors duration-300 ${
            useDarkText ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
          }`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 transition-all duration-300 origin-top overflow-hidden ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 h-0"
        }`}
      >
        <div className="flex flex-col p-4 gap-2">
          {navLink.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium ${
                  isActive
                    ? "bg-orange-50 text-orange-600" // Menu aktif di HP
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}