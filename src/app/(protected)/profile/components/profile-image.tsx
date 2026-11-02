"use client";
import Image from "next/image";
function ProfileImage({ session }: { session: any }) {
  return (
    <div>
      <div className="absolute -bottom-[70px] left-1/2 -translate-x-1/2 transform min-[768px]:-bottom-[100px]">
        <Image
          src={
            session?.user?.avatar ? session?.user?.avatar : "/img/dummy-new.png"
          }
          alt={session?.user?.name || "Profile Image"}
          width={200}
          height={200}
          className="h-[120px] w-[120px] rounded-full border-4 border-white bg-white object-cover min-[768px]:h-[180px] min-[768px]:w-[180px]"
        />
      </div>
    </div>
  );
}

export default ProfileImage;
