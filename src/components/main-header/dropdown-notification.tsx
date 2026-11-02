import ClickOutside from "@/components/click-outside";
import { Dispatch, SetStateAction, useState } from "react";
import NotificationList from "./notification-list";

const DropdownNotification = ({
  isNotification,
  setIsNotification,
  setNotifications,
  notifications,
}: {
  isNotification: boolean;
  notifications: any[];
  setIsNotification: Dispatch<SetStateAction<boolean>>;
  setNotifications: Dispatch<SetStateAction<any[]>>;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [notifications, setNotifications] = useState<any[]>([]);
  const [count, setCount] = useState<number>(10);

  return (
    <ClickOutside
      onClick={() => setDropdownOpen(false)}
      className="min-[500px]:relative"
    >
      <li>
        <div
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
          }}
          className="h-8.5 w-8.5 border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 relative flex cursor-pointer items-center justify-center rounded-full dark:text-white"
        >
          <span
            className={`z-1 bg-meta-1 absolute -top-0.5 right-0 h-2 w-2 rounded-full bg-red-500 ${
              isNotification === false ? "hidden" : "inline"
            }`}
          >
            <span className="-z-1 bg-meta-1 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
          </span>

          <span className="h-[18px] w-[18px] min-[500px]:h-[26px] min-[500px]:w-[26px]">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.3362 23.1111H9.66381C9.89781 24.7438 11.3033 26 13 26C14.6967 26 16.1022 24.7433 16.3362 23.1111ZM1.44444 22.1481H24.5556C25.3534 22.1481 26 21.5015 26 20.7037C26 19.9059 25.3534 19.2593 24.5556 19.2593H23.5926C22.7948 19.2593 22.1481 18.6126 22.1481 17.8148C22.1481 15.7483 22.1481 12.037 22.1481 12.037C22.1481 7.61126 19.0055 3.91926 14.8301 3.07185C14.6057 3.0266 14.4444 2.8292 14.4444 2.60001V1.44444C14.4444 0.64663 13.7978 0 13 0C12.2022 0 11.5556 0.64663 11.5556 1.44444V2.60001C11.5556 2.8292 11.3943 3.0266 11.1699 3.07185C6.99448 3.91926 3.85185 7.61126 3.85185 12.037V17.8148C3.85185 18.6126 3.20522 19.2593 2.40741 19.2593C1.92593 19.2593 1.44444 19.2593 1.44444 19.2593C0.64663 19.2593 0 19.9059 0 20.7037C0 21.5015 0.64663 22.1481 1.44444 22.1481Z"
                fill="#919191"
              />
            </svg>
          </span>
        </div>

        {dropdownOpen && (
          <div
            className={`-right-27 h-90 border-stroke shadow-default dark:border-strokedark dark:bg-boxdark absolute mt-2.5 flex w-[300px] flex-col rounded-xl border  bg-white max-[768px]:left-[calc(-300px+35px)] max-[500px]:left-0 max-[500px]:w-full sm:right-0 sm:w-80`}
          >
            <div className="flex justify-between px-4 py-3">
              <h5 className="text-bodydark2 text-xl font-bold">Notification</h5>
              {/* <span className="text-[14px] text-[#2A5B9A] underline">
                Clear all
              </span> */}
            </div>

            <NotificationList
              isNotification={isNotification}
              setIsNotification={setIsNotification}
              notifications={notifications}
              setNotifications={setNotifications}
              count={count}
              setCount={setCount}
            />
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
