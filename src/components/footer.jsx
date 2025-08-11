import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import logoImg from "../assets/logo1.png";


export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <footer className="w-full bg-white opacity-70 text-black py-6 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4 text-center md:text-left">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="KisaanBot Logo" className="w-14 h-14" />
              <h1 className="text-2xl font-semibold">Haryali AI</h1>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5 text-lg text-black">
              <a href="#" className="hover:text-green-700 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-green-700 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-green-700 transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-green-700 transition">
                <FaYoutube />
              </a>
            </div>

            {/* Links */}
            <div className="text-sm flex flex-wrap justify-center gap-4 text-black/70">
              <a href="#" className="hover:text-green-700 transition">Privacy</a>
              <a href="#" className="hover:text-green-700 transition">Terms</a>
              <a href="#" className="hover:text-green-700 transition">Support</a>
            </div>
          </div>

          {/* Contact Information - Subtle */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-wrap justify-center gap-6 text-xs text-black/60">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-green-600" />
                <span>info@HaryaliAI.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-green-600" />
                <span>+92 318 5312034</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" />
                <span>Islamabad, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-xs text-black/50">
          © 2025 Haryali AI. All rights reserved.
        </div>
      </footer>
    </>
  );
}
