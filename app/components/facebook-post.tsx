"use client"
import { useEffect } from "react"

// Add global declaration for window.FB
declare global {
  interface Window {
    FB: any
  }
}

export default function FacebookSplitView() {
  useEffect(() => {
    // Check if the SDK is already loaded
    if (!window.FB) {
      // Create script element
      const script = document.createElement("script")
      script.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v23.0&appId=1224836515790840"
      script.async = true
      script.defer = true
      script.crossOrigin = "anonymous"
      script.onload = () => {
        // Parse the XFBML widgets
        if (window.FB && window.FB.XFBML) {
          window.FB.XFBML.parse()
        }
      }
      document.body.appendChild(script)
    } else {
      // SDK already loaded, parse new widgets
      window.FB.XFBML.parse()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-start">
      {/* Facebook SDK Root */}
      <div id="fb-root"></div>

      {/* Left Side - Text and Description */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col order-2 lg:order-1 animate-[slideInLeft_0.8s_ease-out] lg:animate-[slideInLeft_1s_ease-out_0.2s_both]">
        <div className="max-w-lg mx-auto pt-4 lg:pt-8">
          {/* Main Heading */}
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight text-center lg:text-left animate-[slideInLeft_1s_ease-out_0.3s_both]">
            Connect with Us on
            <br />
            <span className="text-blue-600">Facebook</span>
          </h1>

          {/* Description */}
          <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 leading-relaxed text-center lg:text-left animate-[slideInLeft_1s_ease-out_0.5s_both]">
            Stay updated with GLS Solution's latest solar innovations, sustainable energy projects, and join our
            community of eco-conscious customers and partners.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center lg:justify-start animate-[slideInLeft_1s_ease-out_0.7s_both]">
            <a
              href="https://www.facebook.com/glssolution/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 lg:px-8 py-3 lg:py-4 bg-blue-600 text-white rounded-lg transition-colors duration-300 font-semibold text-sm lg:text-base shadow-lg"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Visit Our Facebook Page
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Right Side - Phone Frame */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-start justify-center pt-4 lg:pt-8 order-1 lg:order-2 animate-[slideInRight_0.8s_ease-out] lg:animate-[slideInRight_1s_ease-out_0.4s_both]">
        <div className="relative animate-[slideInUp_1s_ease-out_0.6s_both]">
          {/* iPhone Frame */}
         <div className="relative w-72 h-[580px] lg:w-79 lg:h-[620px] bg-gray-900 rounded-[40px] lg:rounded-[45px] p-1.5 lg:p-2 shadow-2xl">
            {/* Screen */}
           <div className="w-full h-full bg-white/100 backdrop-blur-md rounded-[32px] lg:rounded-[38px] overflow-hidden relative">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 lg:w-28 lg:h-5 bg-black rounded-full z-10"></div>

              {/* Facebook Page Embed */}
              <div className="pt-8 lg:pt-10 h-full overflow-hidden">
                <div
                  className="fb-page w-full h-full"
                  data-href="https://www.facebook.com/glssolution"
                  data-tabs="timeline"
                  data-width="320"
                  data-height="560"
                  data-small-header="true"
                  data-adapt-container-width="true"
                  data-hide-cover="false"
                  data-show-facepile="false"
                ></div>
              </div>
            </div>
          </div>

          {/* iPhone Side Buttons */}
          <div className="absolute left-[-2px] lg:left-[-3px] top-32 lg:top-40 w-0.5 lg:w-1 h-6 lg:h-8 bg-gray-700 rounded-l-sm"></div>
          <div className="absolute left-[-2px] lg:left-[-3px] top-40 lg:top-50 w-0.5 lg:w-1 h-8 lg:h-12 bg-gray-700 rounded-l-sm"></div>
          <div className="absolute left-[-2px] lg:left-[-3px] top-48 lg:top-56 w-0.5 lg:w-1 h-8 lg:h-12 bg-gray-700 rounded-l-sm"></div>
          <div className="absolute right-[-2px] lg:right-[-3px] top-36 lg:top-44 w-0.5 lg:w-1 h-12 lg:h-16 bg-gray-700 rounded-r-sm"></div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}