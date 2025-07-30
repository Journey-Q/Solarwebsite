"use client"
import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface StickyProductBannerProps {
  onClose?: () => void;
  isScrolled: boolean;

}

const StickyProductBanner = ({ onClose, isScrolled }: StickyProductBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // Sample product data - replace with your actual products
  const products = [
    {
      id: 1,
      name: "Premium Solar Panel 400W",
      price: "Rs299",
      originalPrice: "Rs399",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=100&h=100&fit=crop",
      discount: "25% OFF",
      link: "/products/solar-panel-400w"
    },

    {
      id: 3,
      name: "Solar Inverter 5000W",
      price: "Rs449",
      originalPrice: "Rs549",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      discount: "18% OFF",
      link: "/products/solar-inverter-5000w"
    },
    {
      id: 4,
      name: "Complete Solar Kit 6kW",
      price: "Rs2,999",
      originalPrice: "Rs3,999",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=100&h=100&fit=crop",
      discount: "25% OFF",
      link: "/products/complete-solar-kit-6kw"
    },

    {
      id: 6,
      name: "Solar Charge Controller",
      price: "Rs89",
      originalPrice: "Rs119",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop",
      discount: "25% OFF",
      link: "/products/charge-controller"
    }
  ];

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleProductClick = (product: {
    id: number;
    name: string;
    price: string;
    originalPrice: string;
    image: string;
    discount: string;
    link: string;
  }) => {
    // Navigate to product page - replace with your routing logic
    console.log(`Navigating to: ${product.link}`);
    // window.location.href = product.link; // Simple navigation
    // or use your router: router.push(product.link);
  };

  if (!isVisible) return null;

  return (
    <div className="absolute top-17 z-40 bg-transparent ">
      {/* Banner Header */}
      {/* <div className="bg-white/10 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
            SALE
          </span>
          <span className="text-white font-semibold text-sm">
            🔥 Latest Products - Limited Time Offers!
          </span>
        </div>
        <button
          onClick={handleClose}
          className="text-white hover:text-green-200 transition-colors p-1"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div> */}

      {/* Marquee Container */}
      <div className="relative overflow-hidden py-3">
        <div className="flex animate-marquee space-x-8 whitespace-nowrap">
          {/* First set of products */}
          {products.map((product) => (
            <div
              key={`first-${product.id}`}
              onClick={() => handleProductClick(product)}
              className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2 cursor-pointer  transition-all duration-300 transform hover:scale-105 min-w-max group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover border-2 border-white/20 group-hover:border-white/40 transition-colors"
              />
              <div className="text-left">
                <h4 className={` text-gray-900 font-semibold text-sm transition-colors`}>
                  {product.name}
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 font-bold text-lg">
                    {product.price}
                  </span>
                  <span className="text-white/60 text-sm line-through">
                    {product.originalPrice}
                  </span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {product.discount}
                  </span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {products.map((product) => (
            <div
              key={`second-${product.id}`}
              onClick={() => handleProductClick(product)}
              className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2 cursor-pointer transition-all duration-300 transform hover:scale-105 min-w-max group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover border-2 border-white/20 group-hover:border-white/40 transition-colors"
              />
              <div className="text-left">
                 <h4 className={` text-gray-900 font-semibold text-sm transition-colors`}>
                  {product.name}
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 font-bold text-lg">
                    {product.price}
                  </span>
                  <span className="text-white/60 text-sm line-through">
                    {product.originalPrice}
                  </span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {product.discount}
                  </span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default StickyProductBanner;