"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"

export default function LatestProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const products = [
    {
      id: 1,
      name: "Solar System 60W",
      image: "https://www.glssolution.com/product-image/29/default",
      price: "Rs.30,000",
      originalPrice: "Rs.35,000",
      discount: "14%",
      isNew: false,
    },
    {
      id: 2,
      name: "Solar System 80W",
      image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=400&h=300&fit=crop&crop=center",
      price: "Rs.38,000",
      originalPrice: "Rs.42,000",
      discount: "10%",
      isNew: true,
    },
    {
      id: 3,
      name: "Solar System 100W",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop&crop=center",
      price: "Rs.45,000",
      originalPrice: "Rs.50,000",
      discount: "10%",
      isNew: false,
    },
    {
      id: 4,
      name: "Solar System 120W",
      image: "https://www.glssolution.com/product-image/27/default",
      price: "Rs.55,000",
      originalPrice: "Rs.62,000",
      discount: "11%",
      isNew: true,
    },
    {
      id: 5,
      name: "Solar System 150W",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop&crop=center",
      price: "Rs.68,000",
      originalPrice: "Rs.75,000",
      discount: "9%",
      isNew: false,
    },
    {
      id: 6,
      name: "Solar System 200W",
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400&h=300&fit=crop&crop=center",
      price: "Rs.85,000",
      originalPrice: "Rs.95,000",
      discount: "11%",
      isNew: true,
    },
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Intersection Observer for translate animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Handle scroll events for mobile to update current index
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return

    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft
        const cardWidth = scrollRef.current.clientWidth // Full width on mobile
        const newIndex = Math.round(scrollLeft / cardWidth)
        setCurrentIndex(newIndex)
      }
    }

    const scrollElement = scrollRef.current
    scrollElement.addEventListener('scroll', handleScroll)
    return () => scrollElement.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      if (isMobile) {
        // On mobile, scroll to full width of container
        const cardWidth = scrollRef.current.clientWidth
        const scrollPosition = index * cardWidth
        
        scrollRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        })
      } else {
        // Desktop behavior remains the same
        const cardWidth = 300
        const gap = 24
        const scrollPosition = index * (cardWidth + gap)
        
        scrollRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        })
      }
      setCurrentIndex(index)
    }
  }

  const nextSlide = () => {
    const maxIndex = isMobile ? products.length - 1 : products.length - 3
    const newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
    scrollToIndex(newIndex)
  }

  const prevSlide = () => {
    const maxIndex = isMobile ? products.length - 1 : products.length - 3
    const newIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex
    scrollToIndex(newIndex)
  }

  return (
    <section 
      ref={sectionRef}
      className={`py-16 bg-gray-50 overflow-hidden relative transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-16 opacity-0'
      }`}
    >
      {/* Navigation Buttons - Always visible but positioned differently on mobile */}
      <Button
        onClick={prevSlide}
        className={`absolute ${isMobile ? 'left-2 top-[45%]' : 'left-4 top-1/2'} -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-700 hover:scale-110 transform ${
          isVisible 
            ? 'translate-x-0 opacity-100' 
            : '-translate-x-8 opacity-0'
        }`}
        variant="outline"
        size="icon"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </Button>

      <Button
        onClick={nextSlide}
        className={`absolute ${isMobile ? 'right-2 top-[45%]' : 'right-4 top-1/2'} -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-700 hover:scale-110 transform ${
          isVisible 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-8 opacity-0'
        }`}
        variant="outline"
        size="icon"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </Button>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-800 delay-200 ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Latest Products</h2>
        </div>

        {/* Carousel Container */}
        <div className={`relative transform transition-all duration-1000 delay-400 ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-12 opacity-0'
        }`}>
          {/* Products Slider */}
          <div 
            ref={scrollRef}
            className={`
              ${isMobile 
                ? 'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide' 
                : 'flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 px-16 justify-center'
              }
            `}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`
                  ${isMobile 
                    ? 'flex-shrink-0 w-full snap-center px-4' 
                    : 'flex-shrink-0'
                  }
                  transition-all duration-300 transform 
                  ${!isMobile && index === Math.floor(products.length / 2) ? "scale-105" : "scale-100"}
                  ${isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-16 opacity-0'
                  }
                `}
                style={{
                  width: isMobile ? "100%" : "280px",
                  transitionDelay: `${600 + (index * 100)}ms`
                }}
              >
                <div className={isMobile ? 'max-w-sm mx-auto' : ''}>
                  <Card className="bg-white rounded-2xl overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-0">
                      <div className="relative">
                        {/* Product Image */}
                        <div className="relative overflow-hidden rounded-t-2xl h-48 md:h-56">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                          />

                          {/* Top badges and icons */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && (
                              <Badge className="bg-green-500 hover:bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md animate-bounce">
                                NEW
                              </Badge>
                            )}
                            <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md animate-pulse">
                              -{product.discount}
                            </Badge>
                          </div>

                          {/* Shopping Cart icon */}
                          <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 hover:bg-blue-50">
                            <ShoppingCart className="w-4 h-4 text-gray-600 hover:text-blue-600 transition-colors duration-300" />
                          </button>

                          {/* Overlay for hover effect */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300"></div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 pb-6">
                          <h3 className="font-semibold text-gray-900 mb-3 transition-colors duration-300 text-sm md:text-base">
                            {product.name}
                          </h3>

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="font-bold text-gray-900 text-lg md:text-xl">
                              {product.price}
                            </span>
                            <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                          </div>

                          {/* Add to Cart Button */}
                          <Button
                            className="w-full bg-gray-800 hover:bg-green-500 text-white rounded-lg py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            size="sm"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className={`flex justify-center mt-8 gap-2 transform transition-all duration-800 delay-700 ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}>
            {products.map((_, index) => {
              return (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-green-500 w-8 shadow-lg" 
                      : "bg-gray-300 hover:bg-gray-400 w-3 hover:scale-125"
                  }`}
                />
              )
            })}
          </div>
        </div>

        {/* View All Products Button */}
        <div className={`text-center mt-12 transform transition-all duration-800 delay-900 ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}>
          <Button
            className="bg-gray-800 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            size="lg"
          >
            View All Products
          </Button>
        </div>
      </div>

      {/* Custom CSS for scrollbar hiding and snap behavior */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Ensure smooth scrolling and snap behavior on mobile */
        @media (max-width: 767px) {
          .snap-x {
            scroll-snap-type: x mandatory;
          }
          
          .snap-center {
            scroll-snap-align: center;
          }
        }
      `}</style>
    </section>
  )
}