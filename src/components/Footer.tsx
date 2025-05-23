"use client";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-6 py-4 border-t border-gray-300 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <Image
            src="/images/texttube-logo.png"
            alt="texttube-logo"
            width={40}
            height={40}
          />
          <h1 className="text-lg font-semibold text-white">TextTube</h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center text-white gap-4 text-sm font-medium">
          <li>
            <Link
              href="/install"
              className="px-2 py-1 rounded hover:bg-gray-300 transition-colors"
            >
              Install
            </Link>
          </li>
          <li>
            <Link
              href="/features"
              className="px-2 py-1 rounded hover:bg-gray-300 transition-colors"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="/faqs"
              className="px-2 py-1 rounded hover:bg-gray-300 transition-colors"
            >
              FAQs
            </Link>
          </li>
          <li>
            <Link
              href="/support"
              className="px-2 py-1 rounded hover:bg-gray-300 transition-colors"
            >
              Support
            </Link>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4 text-white">
          <a
            href="https://www.facebook.com/share/15V1ZdNne5/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/mudasar-ahmad-836873330/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://www.instagram.com/its_ahmii237?igsh=MTNnNGxsbmNrZDRpaw=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
