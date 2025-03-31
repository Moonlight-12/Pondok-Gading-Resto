"use client"

import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules"

export default function MenuSlider() {
  const [isLoading, setIsLoading] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(0)

  const images = [
    "/menu/menu-cover_page-0001.jpg", // Cover (will be shown alone)
    "/menu/0b_page-0001.jpg", // Back cover
    "/menu/page1.jpg",
    "/menu/page2.jpg",
    "/menu/page3.jpg",
    "/menu/page4.jpg",
    "/menu/page6.jpg",
    "/menu/page7.jpg",
    "/menu/page8.jpg",
    "/menu/page9.jpg",
    "/menu/page10.jpg",
    "/menu/page11.jpg",
    "/menu/page12.jpg",
  ]

  // Preload images
  useEffect(() => {
    let loadedCount = 0
    const totalImages = images.length

    const preloadImages = () => {
      images.forEach((src) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          loadedCount++
          setImagesLoaded(loadedCount)
          if (loadedCount === totalImages) {
            setIsLoading(false)
          }
        }
        img.onerror = () => {
          loadedCount++
          setImagesLoaded(loadedCount)
          if (loadedCount === totalImages) {
            setIsLoading(false)
          }
        }
      })
    }

    preloadImages()

    // Ensure we show the slider after a maximum timeout even if images fail
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [images])

  // Calculate loading percentage
  const loadingPercentage = Math.round((imagesLoaded / images.length) * 100)

  return (
    <div className="w-full max-w-xs md:max-w-xl lg:max-w-xl mx-auto bg-transparent px-2">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-40 sm:h-60">
          <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${loadingPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">Loading menu ({loadingPercentage}%)...</p>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          grabCursor={true}
          slidesPerView={1}
          spaceBetween={0}
          navigation={true}
          pagination={{ clickable: true }}
          className="!pb-8"
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 1 },
            768: { slidesPerView: 1.2, spaceBetween: 15 },
            1024: { slidesPerView: 1.5, spaceBetween: 20 },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex items-center justify-center p-1">
                <div className="w-[95vw] max-w-[400px] mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={image}
                    alt={`Menu page ${index + 1}`}
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '75vh' }}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}