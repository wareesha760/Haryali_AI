import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
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

      <footer className=" w-full bg-white opacity-70 text-black py-4 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="KisaanBot Logo" className="w-14 h-14" />

            <h1 className="text-2xl font-semibold">KisaanBot</h1>
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
          <div className="text-sm flex gap-4 text-black/70">
            <a href="#" className="hover:text-green-700 transition">Privacy</a>
            <a href="#" className="hover:text-green-700 transition">Terms</a>
            <a href="#" className="hover:text-green-700 transition">Support</a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-2 text-center text-xs text-black/50">
          © 2025 KisaanBot. All rights reserved.
        </div>
      </footer>
    </>
  );
}
