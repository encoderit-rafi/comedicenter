import React, { useRef } from 'react'
import Image from "next/image";

function sliderNav() {
    const swiperRef = useRef<any>(null);
  return (
    <div>
        <div className="flex justify-end gap-3 pt-4 px-4">
                                <button
                                  onClick={() => swiperRef.current.swiper.slidePrev()}
                                  className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                                >
                                  {/* <img src="/img/left-arrow.svg" alt="Previous" /> */}
                                  <Image
                                          src="/img/left-arrow.svg"
                                          alt="Next"
                                          className="w-10 h-10 rounded-[10px] object-cover "
                                          width={200}
                                          height={200}
                                        />
                                </button>
                                <button
                                  onClick={() => swiperRef.current.swiper.slideNext()}
                                  className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                                >
                                  {/* <img src="/img/right-arrow.svg" alt="Next" /> */}
                                  <Image
                                    src="/img/right-arrow.svg"
                                    alt="Next"
                                    className="w-10 h-10 rounded-[10px] object-cover "
                                    width={200}
                                    height={200}
                                  />
                                </button>
                              </div>
    </div>
  )
}

export default sliderNav