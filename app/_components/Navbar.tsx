"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/app/SessionProvider";
import UserButton from "./UserButton";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSession();

  // Navigation links - only shown for non-authenticated users
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  // Determine the logo destination based on user role
  const getLogoDestination = () => {
    if (!user) return "/";
    if (user.role === "ADMIN") return "/admin";
    if (user.role === "CUSTOMER") return "/customer";
    return "/"; // Default for USER or any other role
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-indigo-800 shadow-md py-2" : "bg-indigo-700 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo - navigates to role-specific route */}
          <div className="flex-shrink-0">
            <Link href={getLogoDestination()} className="flex items-center">
              {/* Replace with your actual logo */}
              <div className="relative w-12 h-12 mr-2">
                {/* Placeholder for logo - replace with your Image component */}
                <div className="absolute inset-0 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  Logo
                </div>
              </div>
              <span className="text-xl font-bold text-white">YourBrand</span>
            </Link>
          </div>

          {/* Desktop Navigation - only shown if user is not logged in */}
          {!user && (
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative font-medium text-base transition-colors ${
                    pathname === link.path
                      ? "text-white font-bold"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  {link.name}
                  {pathname === link.path && (
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Dashboard Button and User Button - shown only when logged in */}
          {user && (
            <div className="flex items-center space-x-4">
              <Link
                href={user.role === "ADMIN" ? "/admin" : "/customer"}
                className="bg-white text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-md font-medium transition-colors"
              >
                My Dashboard
              </Link>
              <UserButton />
            </div>
          )}

          {/* Mobile Menu Button - only shown if user is not logged in */}
          {!user && (
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  // X icon for close
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu - only shown if user is not logged in */}
        {!user && isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 bg-indigo-900 rounded-lg mt-2 shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === link.path
                      ? "bg-indigo-700 text-white"
                      : "text-gray-200 hover:bg-indigo-800 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
