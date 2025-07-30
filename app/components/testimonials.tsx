"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})
  const [isMobile, setIsMobile] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      name: "John Smith",
      role: "Homeowner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      text: "SolarTech transformed our home with an amazing solar system. Our electricity bills dropped by 85%! The installation process was seamless, and the team was incredibly professional throughout. They explained every step of the process and answered all our questions patiently. The quality of the panels and equipment exceeded our expectations, and we've been generating clean energy for over a year now with zero issues.",
    },
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      text: "Professional installation and excellent customer service. Highly recommend for commercial projects. We installed a 100kW system for our manufacturing facility, and the results have been outstanding. The team handled all the permits, inspections, and utility interconnections flawlessly. Our energy costs have been reduced by 70%, and the system is projected to pay for itself within 4 years. The monitoring system they provided gives us real-time insights into our energy production and consumption.",
    },
    {
      name: "Mike Davis",
      role: "Homeowner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      text: "The team was knowledgeable and efficient. Our solar system has been working perfectly for the past two years.",
    },
    {
      name: "Lisa Chen",
      role: "Property Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      text: "Outstanding service from start to finish. The installation was completed ahead of schedule. Managing multiple properties, I needed a reliable partner who could handle bulk installations efficiently. SolarTech exceeded all expectations by coordinating installations across 15 residential units simultaneously. Their project management was exceptional, keeping me informed at every stage. The tenants were impressed with the professionalism of the installation crews, and the reduced utility costs have been a great selling point for new tenants.",
    },
    {
      name: "David Wilson",
      role: "Homeowner",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
      rating: 5,
      text: "Incredible savings on our energy bills. The system pays for itself within just a few years. What impressed me most was their comprehensive approach to energy efficiency. They didn't just install panels; they conducted a full energy audit of our home and recommended additional improvements like LED lighting and smart thermostats. The financing options they offered made the transition to solar affordable, and their 25-year warranty gives us complete peace of mind.",
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

  const toggleExpanded = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const truncateText = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + "..."
  }

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = isMobile ? 280 : 320 // Card width
      const gap = isMobile ? 16 : 24
      const scrollPosition = index * (cardWidth + gap)
      
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
      setCurrentIndex(index)
    }
  }

  const scrollLeft = () => {
    const maxIndex = isMobile ? testimonials.length - 1 : testimonials.length - 3
    const newIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex
    scrollToIndex(newIndex)
  }

  const scrollRight = () => {
    const maxIndex = isMobile ? testimonials.length - 1 : testimonials.length - 3
    const newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
    scrollToIndex(newIndex)
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-8xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl mb-4">
            <Quote className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Customer Reviews
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">See what our customers say about their solar experience</p>
        </div>

        {/* Carousel Container with External Arrows - Hidden on Mobile */}
        <div className="relative flex items-center">
          {/* Left Navigation Arrow - Hidden on Mobile */}
          {!isMobile && (
            <Button
              variant="outline"
              size="icon"
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 mr-4"
              onClick={scrollLeft}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}

          {/* Testimonials Scroll Container */}
          <div
            ref={scrollRef}
            className={`flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 flex-1 ${
              isMobile ? 'px-4' : ''
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => {
              const isExpanded = expandedCards[index]
              const shouldShowButton = testimonial.text.length > 120
              
              return (
                <Card
                  key={index}
                  className="group flex-shrink-0 w-72 md:w-80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md"
                >
                  <CardContent className="p-6">
                    {/* Profile Section */}
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full p-[2px]">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="w-full h-full rounded-full object-cover bg-white p-[1px]"
                          />
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">{testimonial.role}</p>
                      </div>
                      {/* Rating */}
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-4 h-4 text-green-600 transform rotate-180" />
                      <p className="text-gray-700 text-sm leading-relaxed pl-3 pr-3 italic">
                        "{isExpanded ? testimonial.text : truncateText(testimonial.text)}"
                      </p>
                      <Quote className="absolute -bottom-1 -right-1 w-4 h-4 text-green-600" />
                    </div>

                    {/* Read More/Less Button */}
                    {shouldShowButton && (
                      <div className="mt-3 flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(index)}
                          className="text-gray-900 hover:text-green-700 hover:bg-green-50 text-xs font-medium"
                        >
                          {isExpanded ? (
                            <>
                              Read Less
                              <ChevronUp className="w-3 h-3 ml-1" />
                            </>
                          ) : (
                            <>
                              Read More
                              <ChevronDown className="w-3 h-3 ml-1" />
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-3xl opacity-50" />
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Right Navigation Arrow - Hidden on Mobile */}
          {!isMobile && (
            <Button
              variant="outline"
              size="icon"
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ml-4"
              onClick={scrollRight}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => {
            const maxIndex = isMobile ? testimonials.length - 1 : Math.max(1, testimonials.length - 2)
            
            return (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-green-500 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}