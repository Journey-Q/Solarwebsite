"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

export default function OurServices() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [visibleCards, setVisibleCards] = useState(new Set())
    const scrollRef = useRef<HTMLDivElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

    const services = [
        {
            id: 1,
            name: "Solar Installation",
            description: "Professional solar panel installation services for residential and commercial properties. Complete grid-tie and off-grid solar system setup with premium components and expert installation.",
            image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
            features: ["Site Assessment", "Custom Design", "Professional Installation", "Grid Connection"],
            category: "Installation"
        },
        {
            id: 2,
            name: "Solar System Fitting",
            description: "Expert fitting and mounting services for all types of solar systems. Roof-mounted, ground-mounted, and carport installations with structural engineering and weatherproof solutions.",
            image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
            features: ["Roof Analysis", "Mounting Systems", "Structural Support", "Safety Compliance"],
            category: "Fitting"
        },
        {
            id: 3,
            name: "Hybrid Solar Solutions",
            description: "Advanced hybrid solar systems combining grid-tie and battery backup. Smart energy management with automatic switching between solar, battery, and grid power for maximum efficiency.",
            image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
            features: ["Battery Integration", "Smart Inverters", "Energy Management", "Backup Power"],
            category: "Hybrid"
        }
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === sectionRef.current) {
                            setIsVisible(true)
                        } else {
                            // Handle individual card visibility
                            const cardIndex = entry.target.getAttribute('data-index')
                            if (cardIndex) {
                                setVisibleCards(prev => new Set(prev).add(parseInt(cardIndex)))
                            }
                        }
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
                const cardWidth = 380
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
        const maxIndex = services.length - 1
        const newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
        scrollToIndex(newIndex)
    }

    const prevSlide = () => {
        const maxIndex = services.length - 1
        const newIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex
        scrollToIndex(newIndex)
    }

    return (
        <section
            ref={sectionRef}
            className="py-16 bg-white overflow-hidden relative"
            id="services"
        >
            {/* Navigation Buttons - Always visible but positioned differently on mobile */}
            <Button
                onClick={prevSlide}
                className={`absolute ${isMobile ? 'left-2 top-[45%]' : 'left-4 top-1/2'} -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-500 hover:scale-110 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                    }`}
                variant="outline"
                size="icon"
                style={{ transitionDelay: '0.8s' }}
            >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Button>

            <Button
                onClick={nextSlide}
                className={`absolute ${isMobile ? 'right-2 top-[45%]' : 'right-4 top-1/2'} -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-500 hover:scale-110 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
                variant="outline"
                size="icon"
                style={{ transitionDelay: '0.8s' }}
            >
                <ChevronRight className="w-5 h-5 text-gray-700" />
            </Button>

            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    }`}>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Services
                    </h2>
                    <p className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`} style={{ transitionDelay: '0.5s' }}>
                        We provide comprehensive solar energy services to meet all your renewable energy needs.
                        From professional installation and expert fitting to advanced hybrid solutions,
                        we deliver reliable and efficient solar services for homes and businesses.
                    </p>
                </div>

                {/* Services Slider */}
                <div className="relative">
                    <div
                        ref={scrollRef}
                        className={`
                            ${isMobile 
                                ? 'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide' 
                                : 'flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-4 px-8 justify-center'
                            }
                            transition-all duration-1000 
                            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
                        `}
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            transitionDelay: '0.6s'
                        }}
                    >
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                data-index={index}
                                className={`
                                    ${isMobile 
                                        ? 'flex-shrink-0 w-full snap-center px-4' 
                                        : 'flex-shrink-0'
                                    }
                                    transition-all duration-700 transform 
                                    ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}
                                `}
                                style={{
                                    width: isMobile ? "100%" : "360px",
                                    transitionDelay: `${0.8 + index * 0.2}s`
                                }}
                            >
                                <div className={isMobile ? 'max-w-sm mx-auto' : ''}>
                                    <Card className="bg-white rounded-2xl overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 h-full group relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:to-green-500/5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100">
                                        <CardContent className="p-0 relative z-10">
                                            <div className="relative h-full flex flex-col">
                                                {/* Service Image */}
                                                <div className="relative overflow-hidden rounded-t-2xl h-56 group">
                                                    <Image
                                                        src={service.image || "/placeholder.svg"}
                                                        alt={service.name}
                                                        fill
                                                        className="object-cover transition-all duration-700 group-hover:scale-115 group-hover:rotate-1"
                                                    />

                                                    {/* Category Badge */}
                                                    <div className="absolute top-4 left-4 transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                                                        <Badge className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                                                            {service.category}
                                                        </Badge>
                                                    </div>

                                                    {/* Animated overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                                                    {/* Shine effect */}
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                                        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12 group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                                    </div>
                                                </div>

                                                {/* Service Info */}
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <h3 className="font-bold text-gray-900 mb-3 text-xl transition-all duration-300 group-hover:scale-105 transform-gpu">
                                                        {service.name}
                                                    </h3>

                                                    {/* Service Description */}
                                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                                                        {service.description}
                                                    </p>

                                                    {/* Service Features */}
                                                    <div className="mb-4">
                                                        <h4 className="font-semibold text-gray-800 mb-2 text-sm transition-colors duration-300 group-hover:text-gray-900">Key Features:</h4>
                                                        <div className="grid grid-cols-2 gap-1">
                                                            {service.features.map((feature, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="flex items-center text-xs text-gray-600 transition-all duration-300 group-hover:text-gray-700 transform group-hover:translate-x-1"
                                                                    style={{ transitionDelay: `${idx * 0.1}s` }}
                                                                >
                                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 transition-all duration-300 group-hover:bg-green-400 group-hover:scale-125 group-hover:shadow-lg"></div>
                                                                    {feature}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Get Quote Button */}
                                                    <Button
                                                        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-green-500 hover:to-green-600 text-white rounded-lg py-3 text-sm font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group/btn relative overflow-hidden"
                                                        size="sm"
                                                    >
                                                        <span className="relative z-10 flex items-center justify-center">
                                                            Get Estimate
                                                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                                        </span>
                                                        {/* Button shimmer effect */}
                                                        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                                                            <div className="absolute top-0 -left-full h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 group-hover/btn:translate-x-[300%] transition-transform duration-700"></div>
                                                        </div>
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
                    <div className="flex justify-center mt-8 gap-2 transition-all duration-1000">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToIndex(index)}
                                className={`h-3 rounded-full transition-all duration-500 transform hover:scale-125 ${index === currentIndex
                                        ? "bg-gradient-to-r from-green-500 to-green-600 w-8 shadow-lg "
                                        : "bg-gray-300 hover:bg-gray-400 w-3 hover:shadow-md"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Button
                        className="bg-gray-800 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                        size="lg"
                    >
                        View All Services
                    </Button>
                </div>
            </div>

            {/* Custom CSS for scrollbar hiding and animations */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5); }
                    50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8); }
                }

                .group:hover .animate-float {
                    animation: float 3s ease-in-out infinite;
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