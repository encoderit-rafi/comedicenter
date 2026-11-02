"use client";

import { PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function EditProfile({ session }: { session: any }) {
  return (
    <>
      <Image
        src={
          session?.user?.avatar ? session?.user?.avatar : "/img/dummy-new.png"
        }
        alt="Dr. Richard Hong"
        width={800}
        height={800}
        className="h-full w-full object-cover"
      />
      <span className="absolute left-0 top-0 h-full w-full backdrop-blur-[15px]"></span>
      <div className="absolute right-0 top-0 z-0 flex justify-end p-4">
        <Link href="profile/edit-profile">
          <div className="relative z-[9] inline-flex items-center justify-end gap-2 rounded-[8px] bg-[#92278F] p-2 px-4 text-[#fff]">
            <span>
              <PencilIcon className="h-4 w-4" />
            </span>
            <span>Edit Profile</span>
          </div>
        </Link>
      </div>
    </>
  );
}
