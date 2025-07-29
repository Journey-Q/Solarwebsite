"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart, User } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/10 backdrop-blur-lg shadow-lg "
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="https://www.glssolution.com/images/logo-with-text.png"
                alt="Green Lanka Sustainable Solutions"
                width={220}
                height={44}
                className="h-12 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <Link 
                href="#home" 
                className={`font-medium text-sm px-6 py-1.5 rounded-full transition-colors ${
                  isScrolled 
                    ? "text-primary-card bg-white/25" 
                    : "text-white bg-white/15"
                }`}
              >
                Home
              </Link>
              <Link 
                href="#about" 
                className={`font-medium text-sm px-6 py-1.5 rounded-full transition-colors ${
                  isScrolled 
                    ? "text-green-500 bg-white/15" 
                    : "text-white bg-white/15"
                }`}
              >
                About
              </Link>
              <Link 
                href="#packages" 
                className={`font-medium text-sm px-6 py-1.5 rounded-full transition-colors ${
                  isScrolled 
                    ? "text-green-500 bg-white/15" 
                    : "text-white bg-white/15"
                }`}
              >
                Packages
              </Link>
              <Link 
                href="#products" 
                className={`font-medium text-sm px-6 py-1.5 rounded-full transition-colors ${
                  isScrolled 
                    ? "text-green-500 bg-white/15" 
                    : "text-white bg-white/15"
                }`}
              >
                Products
              </Link>
              <Link 
                href="#works" 
                className={`font-medium text-sm px-6 py-1.5 rounded-full transition-colors ${
                  isScrolled 
                    ? "text-green-500 bg-white/15" 
                    : "text-white bg-white/15"
                }`}
              >
                Our Works
              </Link>
              <Link 
                href="#promotion" 
                className={`font-medium text-sm px-6 py-1.5 rounded-full transition-colors ${
                  isScrolled 
                    ? "text-green-500 bg-white/15" 
                    : "text-white bg-white/15"
                }`}
              >
                Promotion
              </Link>
              <Link 
                href="#contact" 
                className={`font-medium text-sm px-6 py-1.5 rounded-full transition-colors ${
                  isScrolled 
                    ? "text-green-500 bg-white/15" 
                    : "text-white bg-white/15"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Login Button - Desktop */}
              <div className="hidden lg:block">
                <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg border-2 border-green-500 hover:border-green-600">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>

              {/* Shopping Cart */}
              <div className="hidden lg:block relative">
                <button className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
                  isScrolled 
                    ? "bg-white/15 text-green-600 hover:bg-white/25" 
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}>
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden  text-gray-900 hover:text-green-400 transition-colors rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Image
              src="https://www.glssolution.com/images/logo-with-text.png"
              alt="Green Lanka Sustainable Solutions"
              width={150}
              height={30}
              className="h-8 w-auto"
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-6 py-2">
            <div className="space-y-2">
              <Link
                href="#home"
                className="block text-gray-700 hover:text-green-500 transition-colors font-medium text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="block text-gray-700 hover:text-green-500 transition-colors font-medium text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#packages"
                className="block text-gray-700 hover:text-green-500 transition-colors font-medium text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Packages
              </Link>
              <Link
                href="#products"
                className="block text-gray-700 hover:text-green-500 transition-colors font-medium text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="#works"
                className="block text-gray-700 hover:text-green-500 transition-colors font-medium text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our works
              </Link>
              <Link
                href="#promotion"
                className="block text-gray-700 hover:text-green-500 transition-colors font-medium text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Promotion
              </Link>
              <Link
                href="#contact"
                className="block text-gray-700 hover:text-green-500 transition-colors font-medium text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-200 space-y-4">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-medium transition-all duration-200">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
            <div className="flex items-center justify-center">
              <button className="flex items-center text-gray-700 hover:text-green-500 transition-colors">
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span>Cart (2)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}