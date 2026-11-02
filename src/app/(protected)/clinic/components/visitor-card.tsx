"use client";
import { Clock } from "lucide-react";
import Image from "next/image";

interface VisitorCardProps {
  name: string;
  time: string;
  imageUrl: string;
}

export default function VisitorCard({
  name,
  time,
  imageUrl,
}: VisitorCardProps) {
  // console.log(time, "timetimetime");

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-white p-4">
      <div className="h-[80px] w-[80px]">
        <Image
          src={imageUrl}
          alt={name}
          width={48}
          height={48}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-[17px] font-[600] text-[#343462] ">{name}</h3>
        {/* <p className="py-[5px] text-[#1565C0]">
          {role === "Doctor" ? "Practitioner" : " Clinical Team "}
        </p> */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="h-4 w-4 text-[#767F88]" />
          <span className="text-[14px] text-[#767F88]">{time}</span>
        </div>
      </div>
    </div>
  );
}
