"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function WhyChooseUs() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset and animate items one by one with delay
            setVisibleItems([])
            setTimeout(() => setVisibleItems([0]), 200)
            setTimeout(() => setVisibleItems([0, 1]), 600)
            setTimeout(() => setVisibleItems([0, 1, 2]), 1000)
          } else {
            // Reset animation when out of view
            setVisibleItems([])
          }
        })
      },
      {
        threshold: 0.3,
      
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      title: "Innovative Technology",
      description: "Latest solar panel technology for maximum efficiency",
    },
    {
      title: "Expert Installation",
      description: "Certified professionals with years of experience",
    },
    {
      title: "Lifetime Support",
      description: "24/7 customer support and maintenance services",
    },
  ]

  return (
    <section className="py-16 bg-gray-50" id="about" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - 3D Building Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/build1.jpg?height=300&width=400"
                alt="Modern building with solar panels"
                width={400}
                height={300}
                className="w-full h-auto drop-shadow-lg"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-center lg:text-left">
              Why Choose Us?
            </h2>

            {/* Feature Cards */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group flex items-center p-4 bg-gray-200 rounded-xl shadow-sm hover:bg-gray-300 transition-all duration-500 cursor-pointer transform ${
                    visibleItems.includes(index) ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: visibleItems.includes(index) ? "0ms" : `${index * 200}ms`,
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-lg font-medium text-gray-700">{feature.title}</span>
                    <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
