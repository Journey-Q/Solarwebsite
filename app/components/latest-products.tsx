"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"

export default function LatestProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(2)

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const getVisibleProducts = () => {
    const visible = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + products.length) % products.length
      visible.push({
        ...products[index],
        position: i,
        isCenter: i === 0,
      })
    }
    return visible
  }

  const visibleProducts = getVisibleProducts()

  return (
    <section className="py-16 bg-gray-50 overflow-hidden relative">
      {/* Navigation Buttons - Outside Container at Start and End */}
      <Button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-110"
        variant="outline"
        size="icon"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </Button>

      <Button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-110"
        variant="outline"
        size="icon"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </Button>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in">Our Latest Products</h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Products Carousel */}
          <div className="flex items-center justify-center gap-4 px-16">
            {visibleProducts.map((product) => (
              <div
                key={`${product.id}-${product.position}`}
                className={`flex-shrink-0 transition-all duration-700 ease-out ${
                  product.isCenter ? "z-10 scale-105" : "z-0 scale-100"
                }`}
                style={{
                  width: product.isCenter ? "280px" : "240px",
                  transform: `translateX(${product.position * 15}px) ${
                    product.isCenter ? "scale(1.05)" : "scale(1)"
                  }`,
                }}
              >
                <Card className="bg-white rounded-2xl overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="relative">
                      {/* Product Image */}
                      <div className={`relative overflow-hidden rounded-t-2xl ${product.isCenter ? "h-56" : "h-48"}`}>
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
                      <div className={`p-4 ${product.isCenter ? "pb-6 " : ""}`}>
                        <h3
                          className={`font-semibold text-gray-900 mb-3 transition-colors duration-300 hover:text-blue-600 ${
                            product.isCenter ? "text-base" : "text-sm"
                          }`}
                        >
                          {product.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`font-bold text-gray-900 ${product.isCenter ? "text-xl" : "text-lg"}`}>
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
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-green-500 w-8 shadow-lg" 
                    : "bg-gray-300 hover:bg-gray-400 w-3 hover:scale-125"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Button
            className="bg-gray-800  text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            size="lg"
          >
            View All Products
          </Button>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}