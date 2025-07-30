"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, TrendingUp, Shield } from "lucide-react"

export default function OurDirectors() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Directors data
  const directors = [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "Managing Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Technical Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b812?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
    },
    {
      id: 3,
      name: "Amit Patel",
      position: "Operations Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
    }
  ]

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Visionary Leadership",
      description: "Guiding the company towards sustainable energy solutions"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Industry Expertise",
      description: "Decades of combined experience in renewable energy"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Excellence",
      description: "Building and leading high-performing teams"
    }
  ]

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === sectionRef.current) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gray-50 overflow-hidden relative"
      id="our-directors"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}>
            
            {/* Main Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Directors
            </h2>
            
            {/* Description */}
            <p className={`text-lg text-gray-600 mb-8 leading-relaxed transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0.3s' }}>
              Meet our experienced leadership team who drive innovation and excellence in solar energy solutions. 
              Our directors bring decades of combined experience in renewable energy, technology, and business 
              development to guide our company's vision and growth.
            </p>

            {/* Benefits Grid */}
            <div className={`grid md:grid-cols-1 gap-4 mb-8 transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`} style={{ transitionDelay: '0.5s' }}>
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${0.7 + index * 0.2}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '1.3s' }}>
              <Button 
                className="bg-gray-900 hover:bg-green-600 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
                size="lg"
              >
                <span className="relative z-10 flex items-center">
                  Read More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
               
              </Button>
            </div>
          </div>

          {/* Right Content - Directors Profiles */}
          <div className={`relative transition-all duration-1000 transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`} style={{ transitionDelay: '0.4s' }}>
            
            {/* Three Directors in Linear Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {directors.map((director, index) => (
                <div 
                  key={director.id}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${0.6 + index * 0.2}s` }}
                >
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
                        <Image
                          src={director.image}
                          alt={director.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
            
                     
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{director.name}</h3>
                    <p className="text-gray-900 text-sm font-semibold mb-4">{director.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>

      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  )
}