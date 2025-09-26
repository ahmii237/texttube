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
    <nav className="w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative">
            <Image
              src="/images/texttube-logo.png"
              alt="texttube-logo"
              width={50}
              height={50}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            TextTube
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 font-medium">
          <li>
            <Link
              href="/install"
              className="text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-50"
            >
              Install
            </Link>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-50"
            >
              Features
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("faqs")}
              className="text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-50"
            >
              FAQs
            </button>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-50"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contactus"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-3 rounded-xl hover:bg-purple-50 transition-colors text-gray-700 hover:text-purple-600"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-purple-100 shadow-xl backdrop-blur-md">
          <div className="px-6 py-6 space-y-4">
            <Link
              href="/install"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-purple-600 px-4 py-3 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium"
            >
              Install
            </Link>
            <button
              onClick={() => {
                scrollToSection("features");
                setMenuOpen(false);
              }}
              className="block w-full text-left text-gray-700 hover:text-purple-600 px-4 py-3 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium"
            >
              Features
            </button>
            <button
              onClick={() => {
                scrollToSection("faqs");
                setMenuOpen(false);
              }}
              className="block w-full text-left text-gray-700 hover:text-purple-600 px-4 py-3 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium"
            >
              FAQs
            </button>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-purple-600 px-4 py-3 rounded-lg hover:bg-purple-50 transition-all duration-300 font-medium"
            >
              About
            </Link>
            <Link
              href="/contactus"
              onClick={() => setMenuOpen(false)}
              className="block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-all duration-300 shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
