"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SubscriptionType } from "@/types/subscription";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppContext } from "../context";
import PlanForm from "./components/plan-form";

export function FilterSlider({
  plans,
  currentData,
  myData,
}: {
  plans: any;
  currentData: any;
  myData: any;
}) {
  const swiperRef = useRef<any>(null);
  const [windowWidthWithoutScrollbar, setWindowWidthWithoutScrollbar] =
    useState<number>(0);
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanUid, setSelectedPlanUid] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedSlide, setSelectedSlide] = useState<any>("");
  const [selectedPlanname, setSelectedPlanname] = useState<string>("");
  const { setPlanMemberData } = useAppContext();
  const clinicRoles = ["Doctor", "Staff"];
  const currentRole = myData?.user?.role;
  // console.log(currentRole, "myData");

  // Set window sizes
  useEffect(() => {
    const updateWindowSizes = () => {
      const withoutScrollbar = document.documentElement.clientWidth;
      setWindowWidthWithoutScrollbar(withoutScrollbar);

      const container = document.querySelector(".container") as HTMLElement;
      if (container) {
        const containerWidth = container.getBoundingClientRect().width;
        const leftSpace = (withoutScrollbar - containerWidth) / 2;
        const calculatedSliderWidth = withoutScrollbar - leftSpace;
        setSliderWidth(calculatedSliderWidth);
      }
    };

    updateWindowSizes();
    window.addEventListener("resize", updateWindowSizes);

    return () => window.removeEventListener("resize", updateWindowSizes);
  }, []);

  const [activeToastId, setActiveToastId] = useState<string | number | null>(
    null,
  );

  const OnPopup = (
    uid: string,
    price: string,
    slide: any,
    planName: string,
  ) => {
    setPlanMemberData("");
    if (clinicRoles.includes(currentRole)) {
      if (!activeToastId) {
        const toastId = toast.error("Not able to proceed");
        setActiveToastId(toastId);
        setTimeout(() => setActiveToastId(null), 3000);
      }
      return;
    }
    if (currentData?.Dental?.status === true) {
      if (!activeToastId) {
        const toastId = toast.error(
          "You cannot activate more than one dental plan at a time",
        );
        setActiveToastId(toastId);
        setTimeout(() => setActiveToastId(null), 3000);
      }
      return;
    }

    setModalOpen(true);
    setSelectedPlanUid(uid);
    setSelectedPrice(price);
    setSelectedSlide(slide);
    setSelectedPlanname(planName);
  };

  const OffPopup = () => {
    setModalOpen(false);
  };
  return (
    <>
      {modalOpen ? (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <PlanForm
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            OffPopup={OffPopup}
            plans={plans}
            selectedUid={selectedPlanUid}
            selectedPrice={selectedPrice}
            selectedSlide={selectedSlide}
            selectedPlaname={selectedPlanname}
            myData={myData}
          />
        </div>
      ) : (
        ""
      )}

      <div className="filter-slider min-h-[calc(100vh-300px)] max-[992px]:flex max-[992px]:items-center">
        <div className="py-12">
          <div className="mx-auto flex flex-col lg:flex-row">
            <div
              className={`mx-auto mr-0 transition-all duration-500 ease-in-out`}
              style={{
                width: `${sliderWidth}px`,
              }}
            >
              <Swiper
                ref={swiperRef}
                observer={true}
                observeParents={true}
                modules={[Navigation]}
                slidesPerView={3.3}
                spaceBetween={15}
                // loop={plans?.length > 3}
                loop={false}
                navigation={false}
                breakpoints={{
                  320: { slidesPerView: 1.2, spaceBetween: 15 },
                  768: { slidesPerView: 2.2, spaceBetween: 15 },
                  1024: { slidesPerView: 3.3, spaceBetween: 15 },
                }}
              >
                {plans?.map((slide: any, index: any) => (
                  <SwiperSlide key={index}>
                    <div className="h-full p-0">
                      <Card className="relative flex h-full min-h-[530px] flex-col rounded-[15px] bg-[#E7F0FA]">
                        {slide.is_featured && (
                          <span className="absolute right-0 top-0">
                            <Image
                              src="/img/badge2.svg"
                              alt="badge"
                              width={50}
                              height={50}
                              className="h-auto w-auto rounded-lg object-contain"
                            />
                          </span>
                        )}
                        <CardHeader>
                          <span className="font-[600] text-[#4683C1]">
                            {slide?.planName}
                          </span>
                          <h2 className="text-[50px] font-bold  text-[#34373C]">
                            <span>${parseFloat(slide.price).toFixed(0)} </span>
                            <span className="text-[18px] font-normal text-[#5F636A] min-[1024px]:text-[30px]">
                              /{" "}
                              {slide.interval === "month"
                                ? slide.interval_count === 1
                                  ? "month"
                                  : "quarter"
                                : "year"}
                            </span>
                          </h2>

                          <div className="!mb-3">
                            {slide?.type === SubscriptionType.Dental && (
                              <>
                                {[
                                  "Executive Business Plan",
                                  "Business Smile Plan",
                                  "Family Smile Plan",
                                ].includes(slide?.planName) ? (
                                  <>
                                    <Button
                                      className={`inline-block h-auto rounded-[10px] px-[50px] py-[15px] font-[600] ${
                                        slide.uid !==
                                          currentData?.Dental?.plan?.uid ||
                                        currentData?.Dental?.status === false
                                          ? "bg-[#7B2199] text-white"
                                          : "cursor-not-allowed bg-[#c1dcfa] text-[#000] !opacity-100"
                                      }`}
                                      disabled={
                                        slide.uid ===
                                          currentData?.Dental?.plan?.uid &&
                                        currentData?.Dental?.status === true
                                      }
                                      onClick={() =>
                                        OnPopup(
                                          slide.uid,
                                          slide.price,
                                          slide,
                                          slide.planName,
                                        )
                                      }
                                    >
                                      {slide.uid !==
                                        currentData?.Dental?.plan?.uid ||
                                      currentData?.Dental?.status === false
                                        ? "Continue"
                                        : "Your Current Plan"}
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Link
                                      href={
                                        currentData?.Dental?.status !== true &&
                                        !clinicRoles.includes(currentRole)
                                          ? `/payment/${slide?.uid}`
                                          : "#"
                                      }
                                      className={`inline-block h-auto rounded-[10px] px-[50px] py-[15px] font-[600] text-black ${currentData?.Dental?.status === false || slide.uid !== currentData?.Dental?.plan?.uid ? "bg-[#7B2199] text-white" : "cursor-not-allowed bg-[#c1dcfa] text-[#000] !opacity-100"}`}
                                      onClick={(e) => {
                                        setPlanMemberData("");
                                        if (clinicRoles.includes(currentRole)) {
                                          e.preventDefault();
                                          if (!activeToastId) {
                                            const toastId = toast.error(
                                              "Not able to proceed",
                                            );
                                            setActiveToastId(toastId);
                                            setTimeout(
                                              () => setActiveToastId(null),
                                              3000,
                                            );
                                          }
                                          return;
                                        }
                                        if (
                                          currentData?.Dental?.status ===
                                            true &&
                                          slide.uid !==
                                            currentData?.Dental?.plan?.uid
                                        ) {
                                          if (!activeToastId) {
                                            const toastId = toast.error(
                                              "You cannot activate more than one dental plan at a time",
                                            );
                                            setActiveToastId(toastId);
                                            setTimeout(
                                              () => setActiveToastId(null),
                                              3000,
                                            );
                                          }
                                          return;
                                        }
                                      }}
                                    >
                                      {slide.uid !==
                                        currentData?.Dental?.plan?.uid ||
                                      currentData?.Dental?.status !== true
                                        ? "Continue"
                                        : "Your Current Plan"}
                                    </Link>
                                  </>
                                )}
                              </>
                            )}
                            {slide.type === SubscriptionType.Cosmetic && (
                              <>
                                <Link
                                  href={
                                    currentData?.Cosmetic?.status !== true &&
                                    !clinicRoles.includes(currentRole)
                                      ? `/payment/${slide?.uid}`
                                      : "#"
                                  }
                                  className={`inline-block h-auto rounded-[10px] px-[50px] py-[15px] font-[600] ${currentData?.Cosmetic?.status === false || slide.uid !== currentData?.Cosmetic?.plan?.uid ? "bg-[#7B2199] text-white" : "cursor-not-allowed bg-[#c1dcfa] text-[#000] !opacity-100"}`}
                                  onClick={(e) => {
                                    setPlanMemberData("");
                                    if (clinicRoles.includes(currentRole)) {
                                      e.preventDefault();
                                      if (!activeToastId) {
                                        const toastId = toast.error(
                                          "Not able to proceed",
                                        );
                                        setActiveToastId(toastId);
                                        setTimeout(
                                          () => setActiveToastId(null),
                                          3000,
                                        );
                                      }
                                      return;
                                    }
                                    if (
                                      currentData?.Cosmetic?.status === true
                                    ) {
                                      if (!activeToastId) {
                                        const toastId = toast.error(
                                          "You cannot activate more than one aesthetic plan at a time",
                                        );
                                        setActiveToastId(toastId);
                                        setTimeout(
                                          () => setActiveToastId(null),
                                          3000,
                                        );
                                      }
                                      return;
                                    }
                                  }}
                                >
                                  {slide.uid !==
                                    currentData?.Cosmetic?.plan?.uid ||
                                  currentData?.Cosmetic?.status !== true
                                    ? "Continue"
                                    : "Your Current Plan"}
                                </Link>
                              </>
                            )}
                            {slide.type === SubscriptionType.Wellness && (
                              <>
                                <Link
                                  href={
                                    currentData?.Wellness?.status !== true &&
                                    !clinicRoles.includes(currentRole)
                                      ? `/payment/${slide?.uid}`
                                      : "#"
                                  }
                                  className={`inline-block h-auto rounded-[10px] px-[50px] py-[15px] font-[600] ${currentData?.Wellness?.status === false || slide.uid !== currentData?.Wellness?.plan?.uid ? "bg-[#7B2199] text-white" : "cursor-not-allowed bg-[#c1dcfa] text-[#000] !opacity-100"}`}
                                  onClick={(e) => {
                                    setPlanMemberData("");

                                    if (clinicRoles.includes(currentRole)) {
                                      e.preventDefault();
                                      if (!activeToastId) {
                                        const toastId = toast.error(
                                          "Not able to proceed",
                                        );
                                        setActiveToastId(toastId);
                                        setTimeout(
                                          () => setActiveToastId(null),
                                          3000,
                                        );
                                      }
                                      return;
                                    }
                                    if (
                                      currentData?.Wellness?.status === true
                                    ) {
                                      if (!activeToastId) {
                                        const toastId = toast.error(
                                          "You cannot activate more than one health & wellness plan at a time",
                                        );
                                        setActiveToastId(toastId);
                                        setTimeout(
                                          () => setActiveToastId(null),
                                          3000,
                                        );
                                      }
                                      return;
                                    }
                                  }}
                                >
                                  {slide.uid !==
                                    currentData?.Wellness?.plan?.uid ||
                                  currentData?.Wellness?.status !== true
                                    ? "Continue"
                                    : "Your Current Plan"}
                                </Link>
                              </>
                            )}
                            {slide.type === SubscriptionType.All && (
                              <>
                                <Link
                                  href={
                                    currentData?.All?.status !== true &&
                                    !clinicRoles.includes(currentRole)
                                      ? `/payment/${slide?.uid}`
                                      : "#"
                                  }
                                  className={`inline-block h-auto rounded-[10px] px-[50px] py-[15px] font-[600] ${currentData?.All?.status === false || slide.uid !== currentData?.All?.plan?.uid ? "bg-[#7B2199] text-white" : "cursor-not-allowed bg-[#c1dcfa] text-[#000] !opacity-100"}`}
                                  onClick={(e) => {
                                    setPlanMemberData("");

                                    if (clinicRoles.includes(currentRole)) {
                                      e.preventDefault();
                                      if (!activeToastId) {
                                        const toastId = toast.error(
                                          "Not able to proceed",
                                        );
                                        setActiveToastId(toastId);
                                        setTimeout(
                                          () => setActiveToastId(null),
                                          3000,
                                        );
                                      }
                                      return;
                                    }
                                    if (currentData?.All?.status === true) {
                                      if (!activeToastId) {
                                        const toastId = toast.error(
                                          "You cannot activate more than one all-inclusive plan at a time",
                                        );
                                        setActiveToastId(toastId);
                                        setTimeout(
                                          () => setActiveToastId(null),
                                          3000,
                                        );
                                      }
                                      return;
                                    }
                                  }}
                                >
                                  {slide.uid !== currentData?.All?.plan?.uid ||
                                  currentData?.All?.status !== true
                                    ? "Continue"
                                    : "Your Current Plan"}
                                </Link>
                              </>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <ul>
                            {slide?.benefits?.length
                              ? slide?.benefits?.map(
                                  (benefit: string, index: number) => (
                                    <li
                                      key={index}
                                      className="mb-4 flex gap-[10px]"
                                    >
                                      <span>
                                        <Image
                                          src="/img/tick.svg"
                                          alt="tick"
                                          width={50}
                                          height={50}
                                          className="h-auto w-full rounded-lg object-contain"
                                        />
                                      </span>
                                      <span className="flex-1">{benefit}</span>
                                    </li>
                                  ),
                                )
                              : ""}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {plans?.length >= 3 && (
                <div className="flex justify-end gap-3 px-4 pt-4">
                  <button
                    onClick={() => swiperRef.current.swiper.slidePrev()}
                    className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                  >
                    <Image
                      src="/img/left-arrow.svg"
                      alt="Previous"
                      className="h-10 w-10 rounded-[10px] object-cover"
                      width={200}
                      height={200}
                    />
                  </button>
                  <button
                    onClick={() => swiperRef.current.swiper.slideNext()}
                    className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                  >
                    <Image
                      src="/img/right-arrow.svg"
                      alt="Next"
                      className="h-10 w-10 rounded-[10px] object-cover"
                      width={200}
                      height={200}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
