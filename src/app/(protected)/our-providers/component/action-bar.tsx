"use client";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LocationLabel } from "./location-label";
import SlidingFilter from "./sliding-filter";

const ActionBar = ({
  location,
  isLoggedIn,
}: {
  location: string;
  isLoggedIn: boolean;
}) => {
  const searchParams = useSearchParams();
  const [show, setShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(
    searchParams?.get("query") || "",
  );
  const [isIcon, setIsIcon] = useState<boolean>(
    !!searchParams?.get("query") ? true : false,
  );
  const [render, setRender] = useState<boolean>(false);
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const handleSearch = () => {
    if (!search) return;
    params.set("query", search.trim());
    params.delete("uid");
    replace(`${pathname}?${params.toString()}`);
    setIsIcon(true);
  };

  const handleClear = () => {
    params.delete("query");
    setSearch("");
    replace(`${pathname}?${params.toString()}`);
    setIsIcon(false);
    setRender(!render);
  };
  return (
    <>
      <div className="filter_nav bg-white py-3 shadow-[0_4px_5.5px_-3px_rgba(0,0,0,0.1)]">
        <div className="container max-[768px]:px-[15px]">
          <div className="flex  justify-between gap-3 max-[700px]:flex-wrap">
            <div className="filter_nav_left flex items-center">
              <LocationLabel location={location} isLoggedIn={isLoggedIn} />
            </div>
            <div className="filter_nav_right flex flex-wrap gap-3 max-[1024px]:w-full md:flex-nowrap md:gap-[10px]">
              <div className="flex flex-wrap gap-[10px] max-[1024px]:w-full">
                <div className="relative flex w-full items-center min-[1024px]:w-[400px]">
                  <Input
                    type="text"
                    key={render ? 1 : 0}
                    defaultValue={search}
                    onChange={(e) => {
                      setSearch(e.target.value), setIsIcon(false);
                    }}
                    placeholder="Search by practitioner or zip code"
                    className="input-banner h-full w-full flex-1 rounded-[16px] bg-[#FBFBFF] px-[20px] py-[15px] text-[18px] text-black max-[600px]:w-full min-[1024px]:w-full"
                  />
                  <span className="absolute right-[15px] w-[20px] transition-all duration-300 ease-in-out min-[768px]:w-[25px]">
                    {isIcon ? (
                      <X
                        className="scale-100 cursor-pointer opacity-100 transition-all duration-1000 ease-in-out"
                        onClick={handleClear}
                      />
                    ) : (
                      <svg
                        onClick={handleSearch}
                        width="100%"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        className="scale-100 cursor-pointer opacity-100 transition-all duration-1000 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.9041 20.9284L29 29M24.3333 12.6667C24.3333 19.1099 19.1099 24.3333 12.6667 24.3333C6.22334 24.3333 1 19.1099 1 12.6667C1 6.22334 6.22334 1 12.6667 1C19.1099 1 24.3333 6.22334 24.3333 12.6667Z"
                          stroke="#4F4F78"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
              <div className="filter_btn flex" onClick={() => setShow(true)}>
                <div className="inline-flex cursor-pointer items-center gap-3 self-center rounded-lg bg-[#EBEBF9] px-6 py-3 ">
                  <span className="text-lg font-[500] text-[#40406F] min-[1024px]:text-[17px]">
                    Filter
                  </span>
                  <span className="flex-1">
                    {searchParams.get("speciality") ||
                    searchParams.get("service") ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.68333 7.63405C7.68333 7.14714 7.28243 6.75761 6.7813 6.75761L2.12078 6.75761C1.61965 6.75761 1.21875 7.14714 1.21875 7.63405C1.21875 8.12097 1.61965 8.5105 2.12078 8.5105L6.7813 8.5105C7.27241 8.5105 7.68333 8.11123 7.68333 7.63405Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M15.1997 13.9734C15.1997 14.4603 15.6006 14.8499 16.1017 14.8499L20.7623 14.8499C21.2634 14.8499 21.6643 14.4603 21.6643 13.9734C21.6643 13.4865 21.2634 13.097 20.7623 13.097L16.1017 13.097C15.6106 13.097 15.1997 13.4865 15.1997 13.9734Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M7.68333 20.3128C7.68333 19.8258 7.28243 19.4363 6.7813 19.4363L2.12078 19.4363C1.61965 19.4363 1.21875 19.8258 1.21875 20.3128C1.21875 20.7997 1.61965 21.1892 2.12078 21.1892L6.7813 21.1892C7.27241 21.1892 7.68333 20.7997 7.68333 20.3128Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M9.60889 18.5009L9.60889 22.1236C9.60889 22.6105 10.0098 23 10.5109 23C11.0121 23 11.413 22.6105 11.413 22.1236L11.413 21.1887L20.7641 21.1887C21.2652 21.1887 21.6661 20.7991 21.6661 20.3122C21.6661 19.8253 21.2652 19.4358 20.7641 19.4358L11.413 19.4358L11.413 18.5009C11.413 18.014 11.0121 17.6245 10.5109 17.6245C10.0098 17.6245 9.60889 18.0237 9.60889 18.5009Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M9.60889 5.82208L9.60889 9.44472C9.60889 9.93164 10.0098 10.3212 10.5109 10.3212C11.0121 10.3212 11.413 9.93164 11.413 9.44472L11.413 8.50985L20.7641 8.50985C21.2652 8.50985 21.6661 8.12031 21.6661 7.6334C21.6661 7.14649 21.2652 6.75696 20.7641 6.75696L11.413 6.75696L11.413 5.82208C11.413 5.33516 11.0121 4.94563 10.5109 4.94563C10.0098 4.94563 9.60889 5.33517 9.60889 5.82208Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M11.4719 12.1616L11.4719 13.0965L2.12078 13.0965C1.61965 13.0965 1.21875 13.486 1.21875 13.9729C1.21875 14.4598 1.61965 14.8494 2.12078 14.8494L11.4719 14.8494L11.4719 15.7842C11.4719 16.2711 11.8728 16.6606 12.3739 16.6606C12.8751 16.6606 13.276 16.2711 13.276 15.7842L13.276 12.1616C13.276 11.6747 12.8751 11.2851 12.3739 11.2851C11.8728 11.2851 11.4719 11.6747 11.4719 12.1616Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                        <circle
                          cx="17.5"
                          cy="6.44568"
                          r="4.5"
                          fill="#92278F"
                          stroke="#EBEBF9"
                          strokeWidth="2.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.46458 3.68844C7.46458 3.20152 7.06368 2.81199 6.56255 2.81199L1.90203 2.81199C1.4009 2.81199 1 3.20152 1 3.68844C1 4.17535 1.4009 4.56488 1.90203 4.56488L6.56255 4.56488C7.05366 4.56488 7.46458 4.16561 7.46458 3.68844Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M14.981 10.0278C14.981 10.5147 15.3819 10.9042 15.883 10.9042L20.5435 10.9042C21.0446 10.9042 21.4455 10.5147 21.4455 10.0278C21.4455 9.54088 21.0446 9.15134 20.5435 9.15134L15.883 9.15134C15.3919 9.15134 14.981 9.54088 14.981 10.0278Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M7.46458 16.3671C7.46458 15.8802 7.06368 15.4906 6.56255 15.4906L1.90203 15.4906C1.4009 15.4906 1 15.8802 1 16.3671C1 16.854 1.4009 17.2435 1.90203 17.2435L6.56255 17.2435C7.05366 17.2435 7.46458 16.854 7.46458 16.3671Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M9.39014 14.5552L9.39014 18.1779C9.39014 18.6648 9.79104 19.0543 10.2922 19.0543C10.7933 19.0543 11.1942 18.6648 11.1942 18.1779L11.1942 17.243L20.5453 17.243C21.0464 17.243 21.4473 16.8535 21.4473 16.3666C21.4473 15.8796 21.0464 15.4901 20.5453 15.4901L11.1942 15.4901L11.1942 14.5552C11.1942 14.0683 10.7933 13.6788 10.2922 13.6788C9.79104 13.6788 9.39014 14.0781 9.39014 14.5552Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M9.39014 1.8764L9.39014 5.49904C9.39014 5.98596 9.79104 6.37549 10.2922 6.37549C10.7933 6.37549 11.1942 5.98596 11.1942 5.49904L11.1942 4.56417L20.5453 4.56417C21.0464 4.56417 21.4473 4.17464 21.4473 3.68772C21.4473 3.20081 21.0464 2.81128 20.5453 2.81128L11.1942 2.81128L11.1942 1.8764C11.1942 1.38949 10.7933 0.999955 10.2922 0.999955C9.79104 0.999956 9.39014 1.38949 9.39014 1.8764Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M11.2532 8.21591L11.2532 9.15078L1.90203 9.15078C1.4009 9.15078 1 9.54031 1 10.0272C1 10.5141 1.4009 10.9037 1.90203 10.9037L11.2532 10.9037L11.2532 11.8385C11.2532 12.3254 11.6541 12.715 12.1552 12.715C12.6563 12.715 13.0572 12.3254 13.0572 11.8385L13.0572 8.21591C13.0572 7.72899 12.6563 7.33946 12.1552 7.33946C11.6541 7.33946 11.2532 7.72899 11.2532 8.21591Z"
                          fill="#40406F"
                          stroke="#40406F"
                          strokeWidth="0.5"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SlidingFilter show={show} setShow={setShow} />
    </>
  );
};

export default ActionBar;
