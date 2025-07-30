"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function ContactUs() {
  const [selectedBranch, setSelectedBranch] = useState(0)

  const branches = [
    {
      name: "Main Office - Downtown",
      address: "123 Business District, Suite 500, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "downtown@company.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1635959542207!5m2!1sen!2sus",
    },
    {
      name: "North Branch - Uptown",
      address: "456 Innovation Ave, Floor 12, New York, NY 10025",
      phone: "+1 (555) 234-5678",
      email: "uptown@company.com",
      hours: "Mon-Fri: 8:30 AM - 5:30 PM",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.4842829283607!2d-73.96468908459358!3d40.78175797932394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sManhattan%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1635959542207!5m2!1sen!2sus",
    },
    {
      name: "South Branch - Financial",
      address: "789 Wall Street Plaza, Level 8, New York, NY 10005",
      phone: "+1 (555) 345-6789",
      email: "financial@company.com",
      hours: "Mon-Fri: 9:00 AM - 7:00 PM",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.309328430987!2d-74.0104611845944!3d40.70544937932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Manhattan%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1635959542207!5m2!1sen!2sus",
    },
  ]

  const currentBranch = branches[selectedBranch]

  return (
    <section className="bg-gray-50 mb-10" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-gray-900">Get In Touch</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Visit us at any of our convenient locations. Our team is ready to help you harness the power of the sun.
          </p>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Single Container with Three Sections */}
        <Card className="overflow-hidden  h-auto lg:h-[480px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
            {/* Map Section */}
            <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full order-1 lg:order-1">
              <iframe
                src={currentBranch.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Details Section */}
            <div className="lg:col-span-4 bg-white p-4 sm:p-6 flex flex-col  order-2 lg:order-2">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{currentBranch.name}</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Address</h4>
                    <p className="text-gray-600 text-sm">{currentBranch.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Phone</h4>
                    <a
                      href={`tel:${currentBranch.phone}`}
                      className="text-green-500 hover:text-green-600 transition-colors text-sm"
                    >
                      {currentBranch.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Email</h4>
                    <a
                      href={`mailto:${currentBranch.email}`}
                      className="text-green-500 hover:text-green-600 transition-colors text-sm break-all"
                    >
                      {currentBranch.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Business Hours</h4>
                    <p className="text-gray-600 text-sm">{currentBranch.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Branches Section */}
            <div className="lg:col-span-3 bg-white p-4 sm:p-6 flex flex-col md:max-h-120 lg:max-h-none  order-3 lg:order-3">
              <div className="mb-4 sm:mb-6">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2" />
                  All Branches
                </h4>
                <div className="w-16 h-0.5 bg-green-500 rounded-full" />
              </div>

              <div className="flex-1 space-y-3 sm:space-y-4 md:overflow-y-auto">
                {branches.map((branch, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedBranch(index)}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-all duration-200 ${
                      selectedBranch === index
                        ? "bg-green-50 border-green-200 shadow-sm ring-2 ring-green-100"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Building2
                        className={`w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0 ${
                          selectedBranch === index ? "text-green-500" : "text-gray-400"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <h5
                          className={`font-medium text-sm mb-2 ${
                            selectedBranch === index ? "text-green-700" : "text-gray-900"
                          }`}
                        >
                          {branch.name}
                        </h5>
                        <p className="text-xs text-gray-600 mb-2 sm:mb-3 leading-relaxed">{branch.address}</p>
                        
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}