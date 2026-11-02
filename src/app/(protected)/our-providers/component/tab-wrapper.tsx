"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TabWrapper = ({
  children,
  uid,
}: {
  children: React.ReactNode;
  uid: string;
}) => {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSelect = (uid: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("uid", uid);
    params.delete("page");

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="cursor-pointer" onClick={() => handleSelect(uid)}>
      {children}
    </div>
  );
};

export default TabWrapper;
