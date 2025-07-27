"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react"
import React, { useState, useEffect } from "react"

const Hero: React.FC = () => {
  const [currentBgImage, setCurrentBgImage] = useState(0)
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0)

  // Background carousel images
  const backgroundImages = [
    "solar2.jpg"
  ]

  // Gallery images
   const galleryImages = [
    "/fitiing1.jpg",
    "/fitiing2.jpg",
    "/fitiing3.jpg",
    "/fitiing4.jpg",
    "/fitiing5.jpg"
  ]

  // Stats data
  const stats = [
    { label: "Projects Completed", value: "250+", icon: "" },
    { label: "Happy Clients", value: "200+", icon: "" },
    { label: "Years Experience", value: "15+", icon: "" },
  ]

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  const nextGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div>
      
      {/* Hero Section */}
      <section className="h-screen text-white relative overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBgImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Solar panels background ${index + 1}`}
                className="w-full h-full object-cover object-center brightness-60"
                style={{ objectPosition: 'center center' }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Background Carousel Indicators */}
        <div className="absolute top-32 right-6 z-30">
          <div className="flex space-x-2">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBgImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentBgImage 
                    ? 'bg-green-400 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20 h-full">
          <div className="flex flex-col items-center justify-start pt-32 h-full text-center space-y-8">
            {/* Main Content */}
            <div className="max-w-4xl space-y-6">
              
              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <span className="text-white">Power Future With</span>
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"> Solar</span>
              </h1>
              
              {/* Description */}
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                Discover the amazing ways solar energy can transform your home or business.
              </p>
              
              {/* CTA Button */}
              <div className="pt-8 ">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold border-0 px-10 py-6 text-xl rounded-full group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ArrowRight className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform " />
                  Get Estimate
                </Button>
              </div>
            </div>

            {/* Bottom Stats Cards Section */}
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20 shadow-xl">
                    <div className="text-center">
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm lg:text-base text-gray-300">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Works Section */}
      <section className="min-h-screen py-16 bg-gray-100">
        <div className="container mx-auto px-4 h-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Works
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Explore our successful renewable energy projects and installations
            </p>
          </div>
          
          <div className="relative h-[60vh] lg:h-[70vh] max-w-6xl mx-auto">
            {/* Main Gallery Image */}
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={galleryImages[currentGalleryImage]}
                alt={`Solar project ${currentGalleryImage + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-500"
                style={{ objectPosition: 'center center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Gallery Navigation */}
              <button
                onClick={prevGalleryImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 group"
              >
                <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextGalleryImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 group"
              >
                <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            
            {/* Gallery Thumbnail Strip */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex space-x-3 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryImage(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentGalleryImage 
                      ? 'ring-2 ring-green-400 scale-110' 
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
            
            {/* Gallery Counter */}
            <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-lg font-medium">
              {currentGalleryImage + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero