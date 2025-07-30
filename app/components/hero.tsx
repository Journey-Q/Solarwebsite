"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import StickyProductBanner from "./Stickybanner"

// Counter animation hook
const useCountUp = (end: number, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * (end - start) + start))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration, start])

  return { count, ref }
}

const Hero: React.FC = () => {
  const [currentBgImage, setCurrentBgImage] = useState(0)
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0)

  // Enhanced background carousel images
  const backgroundImages = [
    "/solar1.jpg",
    "/solar2.jpg",
    "/solar3.jpg",
  ]

 const galleryImages = [
    "https://www.glssolution.com/gallery/18/get-image",
    "https://www.glssolution.com/gallery/21/get-image",
    "https://www.glssolution.com/gallery/29/get-image",
    "https://www.glssolution.com/gallery/10/get-image",
    "https://www.glssolution.com/gallery/19/get-image"
  ]

  // Stats data with numeric values for animation
  const stats = [
    { label: "Projects Completed", value: 250, suffix: "+", icon: "" },
    { label: "Happy Clients", value: 200, suffix: "+", icon: "" },
    { label: "Years Experience", value: 15, suffix: "+", icon: "" },
  ]

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % backgroundImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [galleryImages.length])

  const nextGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div id="home">
      {/* Hero Section */}
      <section className="h-screen text-white relative overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-2000 ease-in-out transform ${
                index === currentBgImage ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Solar panels background ${index + 1}`}
                className="w-full h-full object-cover object-center brightness-80"
                style={{ objectPosition: "center center" }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
        </div>

       

        <div className="container mx-auto px-4 relative z-20 h-full">
          <div className="flex flex-col items-center justify-start pt-40 h-full text-center space-y-8">
            {/* Main Content */}
            <div className="max-w-4xl space-y-6 animate-fade-in-up">
              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight animate-slide-in-left">
                <span className="text-white drop-shadow-lg">Power Future With</span>
                <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent animate-gradient-x">
                  {" "}
                  Solar
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto animate-slide-in-right animation-delay-300 drop-shadow-md">
                Discover the amazing ways solar energy can transform your home or business.
              </p>

              {/* CTA Button */}
              <div className="pt-2 flex-col space-y-12 animate-slide-in-up animation-delay-600">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold border-0 px-10 py-6 text-xl rounded-full group shadow-2xl hover:shadow-green-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                >
                  <ArrowRight className="mr-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  Get Estimate
                </Button>

                {/* Animated Stats Cards */}
                <div className="mb-16 animate-slide-in-up animation-delay-900">
                  <div className="grid grid-cols-3 lg:grid-cols-3 gap-4">
                    {stats.map((stat, index) => {
                      const countUpHook = useCountUp(stat.value, 2500)
                      const { count, ref } = countUpHook
                      return (
                        <div
                          key={index}
                          ref={ref}
                          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group"
                          style={{ animationDelay: `${index * 200}ms` }}
                        >
                          <div className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-1 group-hover:text-green-300 transition-colors duration-300">
                              {count}
                              {stat.suffix}
                            </div>
                            <div className="text-xs lg:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </section>

      {/* Our Works Section */}
      <section className="min-h-screen py-16 bg-gradient-to-br from-gray-50 to-gray-100" id="works">
        <div className="container mx-auto px-4 h-full">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Our Works
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-tight animate-slide-in-up animation-delay-300">
              Explore our successful renewable energy projects and installations
            </p>
          </div>

          <div className="relative h-[60vh] lg:h-[70vh] max-w-6xl mx-auto animate-fade-in animation-delay-600">
            {/* Main Gallery Image */}
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl group">
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Solar project ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 transform ${
                    index === currentGalleryImage ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                  style={{ objectPosition: "center center" }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-500" />

              {/* Gallery Navigation */}
              <button
                onClick={prevGalleryImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 group opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0"
              >
                <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextGalleryImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 group opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
              >
                <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Gallery Counter */}
            <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-lg font-medium animate-fade-in">
              {currentGalleryImage + 1} / {galleryImages.length}
            </div>

            {/* Gallery Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentGalleryImage ? "bg-green-400 scale-125" : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
