import React, { useState, useEffect } from "react";
import { LogIn, ArrowUpCircle, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoImg from "../assets/logo1.png";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkClasses = (path) =>
    `px-6 py-3 font-bold rounded-full transition ${
      location.pathname === path
        ? "bg-white text-green-600 shadow"
        : "text-gray-700 hover:bg-green-100 hover:text-green-600"
    }`;

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "w-[90%] rounded-full backdrop-blur-md bg-white/70 shadow-lg"
          : "w-full rounded-none  shadow-md"
      }`}
    >
      <div
        className={`flex items-center justify-between px-12 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-6"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
  src={logoImg}
  alt="KisaanBot Logo"
  className={`transition-all duration-500 ${
    isScrolled ? "h-14" : "h-20"
  }`}
/>
          <span
            className={`font-bold transition-all duration-500 ${
              isScrolled ? "text-2xl" : "text-3xl"
            }`}
          >
            KisaanBot
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-10 text-xl justify-center flex-1">
          <Link to="/" className={getLinkClasses("/")}>
            ہوم
          </Link>
          <Link to="/shop" className={getLinkClasses("/shop")}>
            دکان
          </Link>
          {user && (
            <Link to="/profile" className={getLinkClasses("/profile")}>
              پروفائل
            </Link>
          )}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/pricing">
            <button className="flex items-center gap-2 bg-green-200 text-green-900 font-bold px-6 py-3 text-lg rounded-full hover:bg-green-400 transition shadow-md">
              <ArrowUpCircle size={28} />
              اپ گریڈ کریں
            </button>
          </Link>

          {!user && (
            <Link to="/login">
              <button className="flex items-center gap-2 bg-green-200 text-green-900 font-bold px-6 py-3 text-lg rounded-full hover:bg-green-400 transition shadow-md">
                <LogIn size={28} />
                لاگ ان کریں
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t px-6 py-4 space-y-4 text-lg">
          <Link to="/" className="block" onClick={toggleMenu}>
            ہوم
          </Link>
          <Link to="/shop" className="block" onClick={toggleMenu}>
            دکان
          </Link>
          {user && (
            <Link to="/profile" className="block" onClick={toggleMenu}>
              پروفائل
            </Link>
          )}
          <Link to="/pricing" className="block" onClick={toggleMenu}>
            <button className="w-full bg-green-200 text-green-900 font-bold px-5 py-2 rounded-full hover:bg-green-400 transition shadow-md">
              اپ گریڈ کریں
            </button>
          </Link>
          {!user && (
            <Link to="/login" className="block" onClick={toggleMenu}>
              <button className="w-full bg-green-200 text-green-900 font-bold px-5 py-2 rounded-full hover:bg-green-400 transition shadow-md">
                لاگ ان کریں
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;



