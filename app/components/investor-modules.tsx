"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight, Zap, Sun } from "lucide-react"
import { useState } from "react"

export default function InvestorModules() {
  const inverterModules = [
    {
      name: "Fronius",
      logo: "https://www.glssolution.com/images/web/modules/fronius.png",
    },
    {
      name: "Solis",
      logo: "https://www.glssolution.com/images/web/modules/solis.png",
    },
    {
      name: "SolaX Power",
      logo: "https://www.glssolution.com/images/web/modules/solax.png",
    },
    {
      name: "SMA",
      logo: "https://www.glssolution.com/images/web/modules/sma.png",
    },
    {
      name: "KSTAR",
      logo: "https://www.glssolution.com/images/web/modules/kstar.png",
    },
    {
      name: "GROWATT",
      logo: "https://www.glssolution.com/images/web/modules/growatt.png",
    },
    {
      name: "Kaco",
      logo: "https://www.glssolution.com/images/web/modules/kaco.png",
    },
    {
      name: "hoymiles",
      logo: "https://www.glssolution.com/images/web/modules/hoymiles.png",
    },
  ]

  const solarModules = [
    {
      name: "REC",
      logo: "https://www.glssolution.com/images/web/modules/rec.png",
    },
    {
      name: "JinKO Solar",
      logo: "https://www.glssolution.com/images/web/modules/jinko.png",
    },
    {
      name: "Yingli Solar",
      logo: "https://www.glssolution.com/images/web/modules/yingli.png",
    },
    {
      name: "Q CELLS",
      logo: "https://www.glssolution.com/images/web/modules/q-cell.png",
    },
    {
      name: "ReneSola",
      logo: "https://www.glssolution.com/images/web/modules/renesola.png",
    },
  ]

  const ModuleSection = ({
    title,
    modules,
    icon: Icon,
    gradient,
    bgColor,
  }: {
    title: string
    modules: typeof inverterModules
    icon: any
    gradient: string
    bgColor: string
  }) => {
    const [currentIndex, setCurrentIndex] = useState(2)

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % modules.length)
    }

    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + modules.length) % modules.length)
    }

    const getVisibleModules = () => {
      const visible = []
      for (let i = -2; i <= 2; i++) {
        const index = (currentIndex + i + modules.length) % modules.length
        visible.push({
          ...modules[index],
          position: i,
          isCenter: i === 0,
        })
      }
      return visible
    }

    const visibleModules = getVisibleModules()

    return (
      <div className={`py-20 ${bgColor} relative overflow-hidden`}>
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-md hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-md hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative">
          {/* Section Header */}
          <div className="text-center mb-16">
           
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{title}</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto rounded-full" />
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Modules Carousel */}
            <div className="flex items-center justify-center gap-4 px-16">
              {visibleModules.map((module) => (
                <div 
                  key={`${module.name}-${module.position}`} 
                  className={`flex-shrink-0 transition-all duration-500 ${
                    module.isCenter 
                      ? 'w-72 transform scale-110 shadow-lg rounded-2xl' 
                      : 'w-60 transform scale-90 opacity-90'
                  }`}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 group cursor-pointer transition-all duration-200">
                    {/* Logo container */}
                    <div className="flex justify-center items-center h-20 mb-6">
                      <Image
                        src={module.logo || "/placeholder.svg"}
                        alt={`${module.name} logo`}
                        width={160}
                        height={80}
                        className="max-h-16 w-auto object-contain"
                      />
                    </div>
                    {/* Company info */}
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                        {module.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-12 space-x-2">
              {modules.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex ? "bg-green-500 w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Slide counter */}
            <div className="text-center mt-4 text-sm text-gray-500">
              {currentIndex + 1} of {modules.length}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-gray-50 overflow-hidden">
      {/* Inverter Modules Section */}
      <ModuleSection
        title="Inverter Modules"
        modules={inverterModules}
        icon={Zap}
        gradient="bg-gradient-to-r from-orange-500 to-red-500"
        bgColor="bg-white"
      />

      {/* Solar Modules Section */}
      <ModuleSection
        title="Solar Modules"
        modules={solarModules}
        icon={Sun}
        gradient="bg-gradient-to-r from-green-500 to-cyan-500"
        bgColor="bg-gray-50"
      />
    </section>
  )
}