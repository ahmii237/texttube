"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
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
      <ul className="hidden md:flex gap-6 font-medium text-white">
        <li className="px-3 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer transition-colors">
          <Link href="/install">Install</Link>
        </li>

        <li className="px-3 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer transition-colors">
          <a onClick={() => scrollToSection("features")}>Features</a>
        </li>
        <li className="px-3 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer transition-colors">
          <a onClick={() => scrollToSection("faqs")}>FAQs</a>
        </li>
        <li className="px-3 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer transition-colors">
          <Link href="/about">About</Link>
        </li>
        <li className="px-3 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer transition-colors">
          <Link href="/contactus">Contact Us</Link>
        </li>
      </ul>

      {/* Hamburger Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-purple-600 border-t border-purple-700 shadow-lg py-6 flex flex-col items-center gap-6 md:hidden z-50">
          <Link
            href="/install"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full text-center"
          >
            Install
          </Link>
          <button
            onClick={() => {
              scrollToSection("features");
              setMenuOpen(false);
            }}
            className="text-lg font-medium text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full text-center"
          >
            Features
          </button>
          <button
            onClick={() => {
              scrollToSection("faqs");
              setMenuOpen(false);
            }}
            className="text-lg font-medium text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full text-center"
          >
            FAQs
          </button>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full text-center"
          >
            About
          </Link>
          <Link
            href="/contactus"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full text-center"
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
