"use client";
import { useState, useEffect } from "react";
import { Home, AlertCircle } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [dots, setDots] = useState("");

  // Fade-in animation on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animated dots effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="text-center max-w-md mx-auto">
        {/* Animated Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <AlertCircle
              size={120}
              className="text-indigo-500 animate-pulse"
              strokeWidth={1.5}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-white">
              !
            </div>
          </div>
        </div>

        {/* Error Code with animation */}
        <div className="flex justify-center mb-6">
          <div className="text-8xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 animate-bounce inline-block">
              4
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 inline-block mx-1">
              0
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 animate-bounce inline-block">
              4
            </span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found{dots}
        </h1>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Back to Home Button with hover effect */}
        <button
          className={`
            flex items-center justify-center px-6 py-3 rounded-lg 
            font-medium text-white transition-all duration-300
            ${
              isButtonHovered
                ? "bg-indigo-700 shadow-lg shadow-indigo-300/50 translate-y-px"
                : "bg-indigo-600 shadow-md"
            }
          `}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={() => console.log("Navigating to home page")}
        >
          <Home className="mr-2" size={18} />
          <Link href={"/"}>Back to Home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
