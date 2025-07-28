"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"

export default function OurProducts() {
  const [currentIndex, setCurrentIndex] = useState(2)

  const products = [
  {
    id: 1,
    name: "Solar System 60W",
    description: "Compact solar solution perfect for small homes and basic lighting needs. Includes solar panel, battery, and LED lights.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=300&h=200&fit=crop&crop=entropy&auto=format&q=80",
    price: "Rs.30,000",
    originalPrice: "Rs.35,000",
    discount: "14%",
    isNew: false,
  },
  {
    id: 2,
    name: "Solar System 80W",
    description: "Enhanced capacity system ideal for medium households. Powers multiple appliances with reliable backup power.",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=300&h=200&fit=crop&crop=entropy&auto=format&q=80",
    price: "Rs.38,000",
    originalPrice: "Rs.42,000",
    discount: "10%",
    isNew: true,
  },
  {
    id: 3,
    name: "Solar System 100W",
    description: "Popular mid-range system suitable for average homes. Includes inverter, charge controller, and premium batteries.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&h=200&fit=crop&crop=entropy&auto=format&q=80",
    price: "Rs.45,000",
    originalPrice: "Rs.50,000",
    discount: "10%",
    isNew: false,
  },
  {
    id: 4,
    name: "Solar System 120W",
    description: "Advanced solar setup for larger households. Features smart monitoring and efficient energy management system.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop&crop=entropy&auto=format&q=80",
    price: "Rs.55,000",
    originalPrice: "Rs.62,000",
    discount: "11%",
    isNew: true,
  },
  {
    id: 5,
    name: "Solar System 150W",
    description: "High-capacity system designed for energy-intensive homes. Supports heavy appliances and extended backup time.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop&crop=entropy&auto=format&q=80",
    price: "Rs.68,000",
    originalPrice: "Rs.75,000",
    discount: "9%",
    isNew: false,
  },
  {
    id: 6,
    name: "Solar System 200W",
    description: "Premium solar solution for maximum energy independence. Complete off-grid capability with professional installation.",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=300&h=200&fit=crop&crop=entropy&auto=format&q=80",
    price: "Rs.85,000",
    originalPrice: "Rs.95,000",
    discount: "11%",
    isNew: true,
  },
];

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
    <section className="py-6 bg-gray-50 overflow-hidden relative" id="products">
      {/* Navigation Buttons - Outside Container at Start and End */}
      <Button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300"
        variant="outline"
        size="icon"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </Button>

      <Button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300"
        variant="outline"
        size="icon"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </Button>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Products Carousel */}
          <div className="flex items-center justify-center gap-4 px-16">
            {visibleProducts.map((product) => (
              <div key={`${product.id}-${product.position}`} className="flex-shrink-0 w-60">
                <Card className="bg-white rounded-2xl overflow-hidden border-0 shadow-sm hover:shadow-md h-full">
                  <CardContent className="p-0">
                    <div className="relative h-full flex flex-col">
                      {/* Product Image */}
                      <div className="relative overflow-hidden rounded-t-2xl h-48">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />

                        {/* Top badges and icons */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isNew && (
                            <Badge className="bg-green-500 hover:bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                              NEW
                            </Badge>
                          )}
                          <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                            -{product.discount}
                          </Badge>
                        </div>

                        {/* Shopping Cart icon */}
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md">
                         <ShoppingCart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">{product.name}</h3>
                        
                        {/* Product Description */}
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">{product.description}</p>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-gray-900">{product.price}</span>
                          <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          className="w-full bg-gray-900 hover:bg-green-500 text-white rounded-lg py-2 text-sm font-medium"
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
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-green-500 w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Button
            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl"
            size="lg"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}