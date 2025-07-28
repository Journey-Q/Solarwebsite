import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50" id="about">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - 3D Building Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/build1.jpg"
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
              {/* Innovative Technology */}
              <div className="group flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300 cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-medium text-gray-900">Innovative Technology</span>
                  <p className="text-sm text-gray-600 mt-1">Latest solar panel technology for maximum efficiency</p>
                </div>
              </div>

              {/* Expert Installation */}
              <div className="group flex items-center p-4 bg-gray-800 rounded-xl shadow-sm hover:bg-gray-700 transition-all duration-300 cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-medium text-white">Expert Installation</span>
                  <p className="text-sm text-gray-300 mt-1">Certified professionals with years of experience</p>
                </div>
              </div>

              {/* Lifetime Support */}
              <div className="group flex items-center p-4 bg-gray-200 rounded-xl shadow-sm hover:bg-gray-300 transition-all duration-300 cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-medium text-gray-700">Lifetime Support</span>
                  <p className="text-sm text-gray-600 mt-1">24/7 customer support and maintenance services</p>
                </div>
              </div>
            </div>

            
          </div>
        </div>

        
      </div>
    </section>
  )
}
