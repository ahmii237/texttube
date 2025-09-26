"use client";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Single row compact layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Brand - Compact */}
          <div className="flex items-center space-x-3">
            <Image
              src="/images/texttube-logo.png"
              alt="texttube-logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-white">TextTube</h1>
              <p className="text-purple-200 text-sm">
                AI-Powered Video Conversations
              </p>
            </div>
          </div>

          {/* Navigation Links - Horizontal */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/install"
              className="text-purple-200 hover:text-white transition-colors"
            >
              Install
            </Link>
            <Link
              href="/about"
              className="text-purple-200 hover:text-white transition-colors"
            >
              About
            </Link>
            <button className="text-purple-200 hover:text-white transition-colors">
              FAQs
            </button>
            <Link
              href="/contactus"
              className="text-purple-200 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Social Links - Compact */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/share/15V1ZdNne5/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/mudasar-ahmad-836873330/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://www.instagram.com/its_ahmii237?igsh=MTNnNGxsbmNrZDRpaw=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Bottom Copyright - Minimal */}
        <div className="border-t border-purple-700 mt-4 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-200">
          <p>© 2024 TextTube. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
