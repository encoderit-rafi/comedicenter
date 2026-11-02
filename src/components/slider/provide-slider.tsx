"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperSlider: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowWidthWithoutScrollbar, setWindowWidthWithoutScrollbar] =
    useState<number>(0);
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [isSliding, setIsSliding] = useState<boolean>(false);

  // Set Swiper and window widths on mount and resize
  useEffect(() => {
    const updateWindowSizes = () => {
      if (typeof window !== "undefined") {
        // const withScrollbar = window.innerWidth;
        const withoutScrollbar = document.documentElement.clientWidth;

        // setWindowWidth(withScrollbar);
        setWindowWidthWithoutScrollbar(withoutScrollbar);

        const container = document.querySelector(".container") as HTMLElement;
        if (container) {
          const containerWidth = container.getBoundingClientRect().width;
          // (containerWidth,"containerWidth");

          const leftSpace = (withoutScrollbar - containerWidth) / 2;
          // (leftSpace,"leftSpace");
          if (withoutScrollbar > leftSpace) {
            const calculatedSliderWidth = withoutScrollbar - leftSpace;
            setSliderWidth(calculatedSliderWidth);
            // ("withoutScrollbar greater than leftSpace")
          } else {
            // ("withoutScrollbar less than leftSpace")
          }
        }
      }
    };

    updateWindowSizes();

    window.addEventListener("resize", updateWindowSizes);

    return () => window.removeEventListener("resize", updateWindowSizes);
  }, []);

  // Attach Swiper events to detect sliding
  // const onSwiperInit = (swiper: any) => {
  //   swiper.on("touchStart", () => {
  //     if (!isSliding) {
  //       setIsSliding(true);
  //     }
  //   });

  //   swiper.on("slideChangeTransitionStart", () => {
  //     if (!isSliding) {
  //       setIsSliding(true);
  //     }
  //   });
  // };

  return (
    // className={`${isSliding ? '' : 'rounded-l-[15px] overflow-hidden'}`}
    <div className="filter-slider">
      <div className="overflow-hidden py-12">
        <div
          className={`mx-auto mr-0 transition-all duration-500 ease-in-out`}
          style={{
            width: isSliding
              ? `${windowWidthWithoutScrollbar}px`
              : `${sliderWidth}px`, // Switch width when sliding starts
          }}
        >
          <Swiper
            className={`${isSliding ? "" : "overflow-hidden rounded-l-[15px]"}`}
            ref={swiperRef}
            observer={true}
            observeParents={true}
            modules={[Navigation]}
            slidesPerView={3.3}
            spaceBetween={0}
            loop={true}
            navigation={false}
            // onInit={onSwiperInit}
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 0 },
              768: { slidesPerView: 2.2, spaceBetween: 0 },
              1024: { slidesPerView: 4.3, spaceBetween: 0 },
            }}
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className="flex h-[450px] flex-col justify-end bg-[#7B2199] p-8 text-white">
                <span className="text-[50px]">→</span>
                <h2 className="text-2xl font-bold">
                  Reach out to a Qualified Provider Today
                </h2>
                <p className="mt-2 text-[16px] opacity-[.84]">
                  Charitable giving- a component of every purchase goes directly
                  to underserved patients/communities
                </p>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="relative h-[450px]">
                <Image
                  src="/img/aedc1_new.jpg"
                  alt="Instant Savings"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-0 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black to-transparent p-4 text-white">
                  <div className="slider-con-wrapper min-h-[110px]">
                    <h3 className="text-[20px] font-semibold min-[1024px]:text-[25px]">
                      Instant Savings
                    </h3>
                    <p className="text-[16px] opacity-[.84]">
                      Making high quality dental, beauty and wellness available
                      to everyone.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div className="relative h-[450px]">
                <Image
                  src="/img/sl2_1.jpg"
                  alt="Convenient Booking"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-0 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black to-transparent p-4 text-white">
                  <div className="slider-con-wrapper min-h-[110px]">
                    <h3 className="text-[20px] font-semibold min-[1024px]:text-[25px]">
                      Your purchase their hope
                    </h3>
                    <p className="text-[16px] opacity-[.84]">
                      A portion of every membership goes directly to improving
                      the lives of those in need.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 4 */}
            <SwiperSlide>
              <div className="relative h-[450px]">
                <Image
                  src="/img/sl3_1.png"
                  alt="User Friendly"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-0 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black to-transparent p-4 text-white">
                  <div className="slider-con-wrapper min-h-[110px]">
                    <h3 className="text-[20px] font-semibold min-[1024px]:text-[25px]">
                      User Friendly
                    </h3>
                    <p className="text-[16px] opacity-[.84]">
                      Personalized care right at your fingertips.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 5 */}
            <SwiperSlide>
              <div className="relative h-[450px]">
                <Image
                  src="/img/sl4_1.jpg"
                  alt="Convenient Booking"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-0 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black to-transparent p-4 text-white">
                  <div className="slider-con-wrapper min-h-[110px]">
                    <h3 className="text-[20px] font-semibold min-[1024px]:text-[25px]">
                      Meal Prep
                    </h3>
                    <p className="text-[16px] opacity-[.84]">
                      Nutrition is the foundation of every health and wellness
                      journey...eat with intention!
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 6 */}
            <SwiperSlide>
              <div className="relative h-[450px]">
                <Image
                  src="/img/sl5_1.jpg"
                  alt="Convenient Booking"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-0 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black to-transparent p-4 text-white">
                  <div className="slider-con-wrapper min-h-[110px]">
                    <h3 className="text-[20px] font-semibold min-[1024px]:text-[25px]">
                      Health & Wellness
                    </h3>
                    <p className="text-[16px] opacity-[.84]">
                      Empower your body and elevate your life.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3 px-4 pt-4">
            <button
              onClick={() => swiperRef.current.swiper.slidePrev()}
              className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
            >
              {/* <img src="/img/left-arrow.svg" alt="Previous" /> */}
              <Image
                src="/img/left-arrow.svg"
                alt="Next"
                className="h-10 w-10 rounded-[10px] object-cover "
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
                className="h-10 w-10 rounded-[10px] object-cover "
                width={200}
                height={200}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperSlider;
