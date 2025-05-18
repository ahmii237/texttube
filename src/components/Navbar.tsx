"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState} from "react";
import { Menu, X } from "lucide-react";



const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);


 



  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full px-6 py-5 h-20 flex items-center justify-between relative">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/images/texttube-logo.png"
          alt="texttube-logo"
          width={80}
          height={80}
        />
        <h1 className="text-xl font-bold hover:cursor-pointer">
          <Link href="/">TextTube</Link>
        </h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 font-medium text-gray-700">
        <li className="px-1 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer">
          <Link href="/install">Install</Link>
        </li>

        <li className="px-1 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer">
          <a onClick={() => scrollToSection("features")}>Features</a>
        </li>
        <li className="px-1 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer">
          <a onClick={() => scrollToSection("faqs")}>FAQs</a>
        </li>
        <li className="px-1 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer">
          <Link href="/about">About</Link>
        </li>
        <li className="px-1 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer">
          <Link href="/contactus">Contact Us</Link>
        </li>
      </ul>

      {/* Language & Auth */}

      {/* Hamburger Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-t py-4 flex flex-col items-center gap-4 md:hidden z-50">
          <Link href="/install" onClick={() => setMenuOpen(false)}>
            Install
          </Link>
          <button
            onClick={() => {
              scrollToSection("features");
              setMenuOpen(false);
            }}
          >
            Features
          </button>
          <button
            onClick={() => {
              scrollToSection("faqs");
              setMenuOpen(false);
            }}
          >
            FAQs
          </button>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/contactus" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
