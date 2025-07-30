"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"

interface Package {
  id: string
  name: string
  priceRs: number
  originalPriceRs: number
  priceSGD: number
  originalPriceSGD: number
  discount: string
  description: string
  image: string
  features: string[]
}

export default function Packages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [safeguardDutyToggle, setSafeguardDutyToggle] = useState<Record<string, boolean>>({}) // Safeguard Duty toggle state for each package
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const packages: Package[] = [
    {
      id: "basic",
      name: "Basic",
      priceRs: 450000,
      originalPriceRs: 525000,
      priceSGD: 4500,
      originalPriceSGD: 5250,
      discount: "15% OFF",
      description:
        "Perfect for small homes and apartments with essential solar needs. This package provides reliable solar energy solution with basic monitoring capabilities and professional installation service.",
      image: "/package1.png",
      features: ["5kW System", "Basic Installation", "5 Year Warranty", "Monitoring App"],
    },
    {
      id: "standard",
      name: "Standard",
      priceRs: 750000,
      originalPriceRs: 900000,
      priceSGD: 7200,
      originalPriceSGD: 8650,
      discount: "17% OFF",
      description:
        "Ideal for medium-sized homes with moderate energy consumption. Includes advanced monitoring system and battery backup for enhanced energy independence and reliability.",
      image: "/package2.jpg",
      features: [
        "10kW System",
        "Professional Installation",
        "10 Year Warranty",
        "Advanced Monitoring",
        "Battery Backup",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      priceRs: 1200000,
      originalPriceRs: 1425000,
      priceSGD: 11500,
      originalPriceSGD: 13800,
      discount: "16% OFF",
      description:
        "Complete solution for large homes and businesses with high energy demands. Features smart home integration, premium components, and comprehensive 24/7 support service.",
      image: "/package3.jpg",
      features: [
        "15kW System",
        "Premium Installation",
        "15 Year Warranty",
        "Smart Home Integration",
        "Battery Backup",
        "24/7 Support",
      ],
    },
  ]

  // Toggle Safeguard Duty for individual packages
  const toggleSafeguardDuty = (packageId: string) => {
    setSafeguardDutyToggle(prev => ({
      ...prev,
      [packageId]: !prev[packageId]
    }))
  }

  // Format prices based on currency (with Safeguard Duty if applicable)
  const formatPrice = (pkg: Package, isOriginal = false) => {
    const hasSafeguardDuty = safeguardDutyToggle[pkg.id]
    const basePrice = isOriginal ? pkg.originalPriceRs : pkg.priceRs
    
    // Add 25% safeguard duty if enabled (typical rate for solar imports)
    const finalPrice = hasSafeguardDuty ? Math.round(basePrice * 1.25) : basePrice
    
    return `₹${finalPrice.toLocaleString()}`
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Changed to lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Intersection Observer for animations
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
        const cardWidth = scrollRef.current.clientWidth
        const newIndex = Math.round(scrollLeft / cardWidth)
        setCurrentImageIndex(newIndex)
      }
    }

    const scrollElement = scrollRef.current
    scrollElement.addEventListener('scroll', handleScroll)
    return () => scrollElement.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  const scrollToIndex = (index: number) => {
    if (isMobile && scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth
      const scrollPosition = index * cardWidth
      
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
    setCurrentImageIndex(index)
  }

  const nextPackage = () => {
    const newIndex = (currentImageIndex + 1) % packages.length
    scrollToIndex(newIndex)
  }

  const prevPackage = () => {
    const newIndex = (currentImageIndex - 1 + packages.length) % packages.length
    scrollToIndex(newIndex)
  }

  return (
    <section 
      ref={sectionRef}
      id="packages" 
      className="min-h-screen bg-white overflow-hidden py-4 sm:py-6 lg:py-0"
    >
      <div className="container mx-auto px-4 h-full flex flex-col">
        {/* Header with animation */}
        <div className={`text-center py-2 sm:py-4 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-0 text-gray-900">
            Our Packages
          </h2>
        </div>

        {/* Mobile Layout (below lg) */}
        <div className={`lg:hidden flex-1 flex flex-col transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Mobile Navigation Buttons */}
          <div className="relative mb-4">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 backdrop-blur-sm hover:scale-110 group"
              onClick={prevPackage}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 backdrop-blur-sm hover:scale-110 group"
              onClick={nextPackage}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
            </Button>

            {/* Mobile Slider */}
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="flex-shrink-0 w-full snap-center px-4"
                >
                  <div className="max-w-sm mx-auto">
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden h-full transform transition-all duration-500 hover:scale-105">
                      {/* Mobile Image */}
                      <div className="relative h-48 sm:h-64">
                        <Image
                          src={pkg.image || "/placeholder.svg"}
                          alt={`${pkg.name} package`}
                          fill
                          className="object-cover transition-all duration-700 ease-in-out"
                        />
                        {/* Discount Badge on Image */}
                        <div className="absolute top-3 left-3 bg-red-500 text-white font-bold px-2 py-1 rounded-lg text-xs sm:text-sm animate-pulse">
                          {pkg.discount}
                        </div>
                      </div>

                      {/* Mobile Package Description */}
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                          <div className="w-full">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                              {pkg.name} Package
                            </h3>
                            <div className="flex items-center gap-2 sm:gap-3 mb-3">
                              <p className="text-xl sm:text-2xl font-bold text-green-500">
                                {formatPrice(pkg)}
                              </p>
                              <p className="text-base sm:text-lg text-gray-500 line-through">
                                {formatPrice(pkg, true)}
                              </p>
                            </div>
                            
                            {/* Safeguard Duty Toggle - Moved below price */}
                            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg mb-2">
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-800">Include Safeguard Duty</span>
                                <span className="text-xs text-gray-600">+25% on imported solar components</span>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={safeguardDutyToggle[pkg.id] || false}
                                  onChange={() => toggleSafeguardDuty(pkg.id)}
                                />
                                <div className={`w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-colors duration-300 ${
                                  safeguardDutyToggle[pkg.id] ? 'bg-green-500' : 'bg-gray-300'
                                }`}>
                                  <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full transform transition-transform duration-300 ${
                                    safeguardDutyToggle[pkg.id] ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0.5'
                                  } mt-0.5`}></div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                          {pkg.description}
                        </p>

                        {/* Features List */}
                        <div className="mb-4">
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">What's Included:</h4>
                          <div className="grid gap-2">
                            {pkg.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center bg-gray-50 p-2 rounded-lg transform transition-all duration-300 hover:bg-gray-100 hover:translate-x-1">
                                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Get Estimate Button - Moved to bottom */}
                        <Button className="bg-green-500 hover:bg-green-600 text-white w-full py-3 text-base font-semibold transition-all duration-300 hover:scale-105">
                          Get Estimate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Dots Indicator */}
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {packages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentImageIndex ? "bg-green-500 w-6 sm:w-8" : "bg-gray-300"
                  }`}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Mobile Preview Cards */}
          <div className="grid grid-cols-3 gap-2">
            {packages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className={`transition-all duration-300 cursor-pointer hover:shadow-md transform hover:scale-105 ${
                  index === currentImageIndex ? "ring-1 ring-green-500 shadow-lg bg-white scale-105" : ""
                }`}
                onClick={() => scrollToIndex(index)}
              >
                <CardContent className="p-2">
                  <div className="relative mb-2">
                    <div className="w-full h-16 sm:h-20 relative rounded overflow-hidden">
                      <Image
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded"></div>
                      <div className="absolute inset-0 flex flex-col justify-between p-1.5">
                        <h4 className="text-xs font-bold text-white leading-tight drop-shadow-lg">
                          {pkg.name}
                        </h4>
                        <div>
                          <p className="text-xs font-bold text-white drop-shadow-lg">
                            {formatPrice(pkg)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-bold px-1 py-0.5 rounded">
                      {pkg.discount}
                    </div>
                  </div>
                    {/* Get Estimate Button */}
                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      Get Estimate
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Desktop Layout (lg and above) */}
        <div className={`hidden lg:flex items-center gap-4 flex-1 max-w-7xl mx-auto w-full transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Left Arrow - Outside Container */}
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/95 hover:bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 backdrop-blur-sm hover:scale-110 group flex-shrink-0"
            onClick={prevPackage}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
          </Button>

          {/* Main Content Container */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              {/* Main Content - Image Left, Description Right */}
              <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-2xl border border-gray-200 overflow-hidden h-full transform transition-all duration-500 hover:border-gray-300">
                {/* Left Side - Image (Full Height) */}
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={packages[currentImageIndex].image || "/placeholder.svg"}
                    alt={`${packages[currentImageIndex].name} package`}
                    fill
                    className="object-cover transition-all duration-700 ease-in-out hover:scale-105"
                  />
                  {/* Discount Badge on Image */}
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-2 rounded-lg text-sm animate-pulse">
                    {packages[currentImageIndex].discount}
                  </div>
                </div>

                {/* Right Side - Package Description */}
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-full">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 transform transition-all duration-500">
                        {packages[currentImageIndex].name} Package
                      </h3>
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-2xl font-bold text-green-500 transform transition-all duration-500">
                          {formatPrice(packages[currentImageIndex])}
                        </p>
                        <p className="text-lg text-gray-500 line-through">
                          {formatPrice(packages[currentImageIndex], true)}
                        </p>
                      </div>
                      
                      {/* Safeguard Duty Toggle - Moved below price */}
                      <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 mb-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-800">Include Safeguard Duty</span>
                          <span className="text-xs text-gray-600">+25% on imported solar components</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={safeguardDutyToggle[packages[currentImageIndex].id] || false}
                            onChange={() => toggleSafeguardDuty(packages[currentImageIndex].id)}
                          />
                          <div className={`w-14 h-7 rounded-full transition-colors duration-300 ${
                            safeguardDutyToggle[packages[currentImageIndex].id] ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            <div className={`w-6 h-6 bg-white rounded-full transform transition-transform duration-300 ${
                              safeguardDutyToggle[packages[currentImageIndex].id] ? 'translate-x-7' : 'translate-x-0.5'
                            } mt-0.5`}></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-4 text-sm transform transition-all duration-500">
                    {packages[currentImageIndex].description}
                  </p>

                  {/* Features List - More compact */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <div className="grid gap-2">
                      {packages[currentImageIndex].features.map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center bg-gray-50 p-2 rounded-lg transform transition-all duration-300 hover:bg-gray-100 hover:translate-x-2"
                          style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Get Estimate Button - Moved to bottom */}
                  <Button className="bg-green-500 hover:bg-green-600 text-white w-full py-3 text-base font-semibold transition-all duration-300 hover:scale-105">
                    Get Estimate
                  </Button>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {packages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentImageIndex ? "bg-green-500 w-8" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Arrow - Outside Container, Before Preview */}
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/95 hover:bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 backdrop-blur-sm hover:scale-110 group flex-shrink-0"
            onClick={nextPackage}
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
          </Button>

          {/* Right Side - Preview Cards */}
          <div className="w-64 flex-shrink-0">
            <div className="space-y-2 h-full flex flex-col">
              {packages.map((pkg, index) => (
                <Card
                  key={pkg.id}
                  className={`transition-all duration-300 cursor-pointer hover:border-gray-300 flex-1 transform hover:scale-105 border ${
                    index === currentImageIndex ? "ring-1 ring-green-500 border-green-200 bg-white scale-105" : "border-gray-200"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <CardContent className="p-3 h-full flex flex-col">
                    {/* Package Image with Overlay */}
                    <div className="relative mb-2 flex-1">
                      <div className="w-full h-28 relative rounded overflow-hidden">
                        <Image
                          src={pkg.image || "/placeholder.svg"}
                          alt={pkg.name}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-110"
                        />
                        
                        {/* Dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded"></div>
                        
                        {/* Package Name and Price Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-between p-2">
                          <h4 className="text-xs font-bold text-white leading-tight drop-shadow-lg">
                            {pkg.name}
                          </h4>
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-sm font-bold text-white drop-shadow-lg">
                                {formatPrice(pkg)}
                              </p>
                              <p className="text-xs text-gray-200 line-through drop-shadow-lg">
                                {formatPrice(pkg, true)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Discount Badge */}
                      <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded text-[10px] z-10">
                        {pkg.discount}
                      </div>
                    </div>
                             
                    {/* Get Estimate Button */}
                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle estimate request
                      }}
                    >
                      Get Estimate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for scrollbar hiding and snap behavior */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Ensure smooth scrolling and snap behavior on mobile */
        @media (max-width: 1023px) {
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