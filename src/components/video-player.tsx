"use client";

import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

type Slide = { src: string; poster: string; landscape?: boolean };

const slides: Slide[] = [
  { src: "/video/cos-sl1.mp4", poster: "/video/cos-sl1_frame.jpeg" },
  { src: "/video/cos-sl2.mp4", poster: "/video/cos-sl2_frame.jpeg" },
  { src: "/video/cos-sl3.mp4", poster: "/video/cos-sl3_frame.jpeg" },
  {
    src: "/video/cos-video.mp4",
    poster: "/video/cos-video_frame.jpeg",
    landscape: true,
  },
];

const VideoPlayer: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidthWithoutScrollbar, setWindowWidthWithoutScrollbar] =
    useState<number>(0);

  const setVideoRef =
    (index: number): React.RefCallback<HTMLVideoElement> =>
    (el) => {
      videoRefs.current[index] = el;
    };

  const pauseAllVideos = (excludeIndex: number | null) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== excludeIndex) {
        video.pause();
      }
    });
  };

  // const tryPlay = (video: HTMLVideoElement, index: number) => {
  //   const start = () =>
  //     video
  //       .play()
  //       .then(() => setPlayingIndex(index))
  //       .catch(() => {});

  //   if (video.readyState >= 2) {
  //     start();
  //   } else {
  //     const canPlay = () => {
  //       video.removeEventListener("canplay", canPlay);
  //       start();
  //     };
  //     video.addEventListener("canplay", canPlay, { once: true });
  //     try {
  //       video.load();
  //     } catch {}
  //   }
  // };

  // const handleVideoClick = (index: number) => {
  //   const video = videoRefs.current[index];
  //   if (!video) return;

  //   if (playingIndex === index) {
  //     // Pause at current frame; overlay poster appears
  //     video.pause();
  //     setPlayingIndex(null);
  //   } else {
  //     // Pause others, then play this one (resume from current position)
  //     pauseAllVideos(index);
  //     tryPlay(video, index);
  //   }
  // };

  const handleSlideChange = (swiper: SwiperType) => {
    pauseAllVideos(null);
    setPlayingIndex(null);
    setActiveIndex(swiper.realIndex);
  };

  // Prime active + neighbor slides so play starts quickly on live
  // useEffect(() => {
  //   const total = videoRefs.current.length || slides.length;
  //   if (!total) return;

  //   const neighbors = new Set<number>([
  //     activeIndex,
  //     (activeIndex + 1) % total,
  //     (activeIndex - 1 + total) % total,
  //   ]);

  //   neighbors.forEach((i) => {
  //     const v = videoRefs.current[i];
  //     if (v && v.readyState < 1) {
  //       // escalate preload and kick off a fetch of headers/metadata
  //       v.preload = "metadata";
  //       try {
  //         v.load();
  //       } catch {}
  //     }
  //   });
  // }, [activeIndex]);

  useEffect(() => {
    const updateWindowSizes = () => {
      if (typeof window !== "undefined") {
        const withoutScrollbar = document.documentElement.clientWidth;
        setWindowWidthWithoutScrollbar(withoutScrollbar);
      }
    };
    updateWindowSizes();
    window.addEventListener("resize", updateWindowSizes);
    return () => window.removeEventListener("resize", updateWindowSizes);
  }, []);

  const isPrimed = (i: number) =>
    i === activeIndex ||
    i === (activeIndex + 1) % slides.length ||
    i === (activeIndex - 1 + slides.length) % slides.length;

  return (
    <div className="filter-slider py-12">
      <div
        className="relative"
        style={{ width: `${windowWidthWithoutScrollbar}px` }}
      >
        {windowWidthWithoutScrollbar > 0 && (
          <Swiper
            observer
            observeParents
            modules={[Navigation]}
            slidesPerView={1.5}
            spaceBetween={15}
            loop
            centeredSlides
            navigation={false}
            onSlideChange={handleSlideChange}
            onSwiper={(instance) => {
              swiperRef.current = instance;
              setActiveIndex(instance.realIndex);
            }}
            breakpoints={{
              320: { slidesPerView: 1.5, spaceBetween: 5 },
              768: { slidesPerView: 1.5, spaceBetween: 10 },
              1024: { slidesPerView: 1.5, spaceBetween: 15 },
            }}
          >
            {slides.map((s, i) => (
              <SwiperSlide key={i}>
                <div className={`relative ${s.landscape ? "land_scape" : ""}`}>
                  {/* Poster overlay:
                      - visible whenever this slide is NOT currently playing
                      - hides while playing
                  */}
                  {/* <div
                    className={`absolute inset-0 z-[5] transition-opacity duration-200 ${
                      playingIndex === i
                        ? "pointer-events-none opacity-0"
                        : "opacity-100"
                    }`}
                  >
                    <Image
                      src={s.poster}
                      alt="Video poster"
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority={i === 0}
                    />
                  </div> */}
                  <div className="overflow-visible">
                    <video
                      ref={setVideoRef(i)}
                      poster={s.poster}
                      preload="metadata"
                      playsInline
                      controls
                      controlsList="nodownload noplaybackrate"
                      loop
                      className="block aspect-video h-auto w-full"
                    >
                      <source src={s.src} type="video/mp4" />
                    </video>
                  </div>

                  {/* Play/Pause button */}
                  {/* <div className="absolute inset-0 z-[10] flex items-center justify-center">
                    <button
                      // onClick={() => handleVideoClick(i)}
                      className="border-0 bg-transparent p-0 focus:outline-none"
                      aria-label={
                        playingIndex === i ? "Pause video" : "Play video"
                      }
                    >
                      <Image
                        src={
                          playingIndex === i
                            ? "/img/pause-icon.svg"
                            : "/img/play-icon.svg"
                        }
                        alt="Play/Pause"
                        width={50}
                        height={50}
                      />
                    </button>
                  </div> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Nav buttons */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-[15px] top-1/2 z-[20] -translate-y-1/2 transform rounded-full bg-gray-200 p-2 hover:bg-gray-300 min-[768px]:left-[50px] min-[1024px]:left-[100px]"
          aria-label="Previous slide"
        >
          <Image
            src="/img/left-arrow.svg"
            alt="Previous"
            className="h-[25px] w-[25px] rounded-[10px] object-cover min-[1024px]:h-10 min-[1024px]:w-10"
            width={200}
            height={200}
          />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-[15px] top-1/2 z-[20] -translate-y-1/2 transform rounded-full bg-gray-200 p-2 hover:bg-gray-300 min-[768px]:right-[50px] min-[1024px]:right-[100px]"
          aria-label="Next slide"
        >
          <Image
            src="/img/right-arrow.svg"
            alt="Next"
            className="h-[25px] w-[25px] rounded-[10px] object-cover min-[1024px]:h-10 min-[1024px]:w-10"
            width={200}
            height={200}
          />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
