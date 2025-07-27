"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"

export default function Packages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const packages = [
    {
      name: "Basic",
      price: "$2,999",
      originalPrice: "$3,499",
      discount: "15% OFF",
      description:
        "Perfect for small homes and apartments with essential solar needs. This package provides reliable solar energy solution with basic monitoring capabilities and professional installation service.",
      image: "/package1.png",
      features: ["5kW System", "Basic Installation", "5 Year Warranty", "Monitoring App"],
    },
    {
      name: "Standard",
      price: "$4,999",
      originalPrice: "$5,999",
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
      name: "Premium",
      price: "$7,999",
      originalPrice: "$9,499",
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

  const nextPackage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % packages.length)
  }

  const prevPackage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + packages.length) % packages.length)
  }

  return (
    <section className="h-screen bg-white overflow-hidden">
      <div className="container mx-auto px-4 h-full flex flex-col">
        {/* Header - Reduced spacing */}
        <div className="text-center py-4">
          <h2 className="text-2xl md:text-5xl font-bold mb-0 text-gray-900">Our Packages</h2>
        </div>

        {/* Main Layout with External Arrows */}
        <div className="flex items-center gap-4 flex-1 max-w-7xl mx-auto w-full">
          {/* Left Arrow - Outside Container */}
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/95 hover:bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm hover:scale-110 group flex-shrink-0"
            onClick={prevPackage}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
          </Button>

          {/* Main Content Container */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              {/* Main Content - Image Left, Description Right */}
              <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-2xl shadow-xl overflow-hidden h-full">
                {/* Left Side - Image (Full Height) */}
                <div className="relative h-40 lg:h-full">
                  <Image
                    src={packages[currentImageIndex].image || "/placeholder.svg"}
                    alt={`${packages[currentImageIndex].name} package`}
                    fill
                    className="object-cover transition-all duration-700 ease-in-out"
                  />
                  {/* Discount Badge on Image */}
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-2 rounded-lg text-sm">
                    {packages[currentImageIndex].discount}
                  </div>
                </div>

                {/* Right Side - Package Description */}
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {packages[currentImageIndex].name} Package
                      </h3>
                      <div className="flex items-center gap-3">
                        <p className="text-2xl font-bold text-green-500">{packages[currentImageIndex].price}</p>
                        <p className="text-lg text-gray-500 line-through">
                          {packages[currentImageIndex].originalPrice}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                      Get Estimate
                    </Button>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {packages[currentImageIndex].description}
                  </p>

                  {/* Features List - More compact */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <div className="grid gap-2">
                      {packages[currentImageIndex].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center bg-gray-50 p-2 rounded-lg">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots Indicator - Reduced margin */}
            <div className="flex justify-center mt-4 space-x-2">
              {packages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
            className="w-12 h-12 rounded-full bg-white/95 hover:bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm hover:scale-110 group flex-shrink-0"
            onClick={nextPackage}
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
          </Button>

          {/* Right Side - Preview Cards */}
          <div className="w-64 flex-shrink-0">
            <div className="space-y-2 h-full flex flex-col">
              {packages.map((pkg, index) => (
                <Card
                  key={index}
                  className={`transition-all duration-300 cursor-pointer hover:shadow-md flex-1 ${
                    index === currentImageIndex ? "ring-1 ring-green-500 shadow-lg bg-white" : "hover:scale-101"
                  }`}
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
                          className="object-cover transition-transform duration-300"
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
                              <p className="text-sm font-bold text-white drop-shadow-lg">{pkg.price}</p>
                              <p className="text-xs text-gray-200 line-through drop-shadow-lg">{pkg.originalPrice}</p>
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
                      size="sm"
                      className="w-full bg-green-500 hover:bg-green-600 text-white text-xs py-1.5"
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
    </section>
  )
}