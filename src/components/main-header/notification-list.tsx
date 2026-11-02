import {
  getNotifications,
  putNotification,
} from "@/actions/notification.action";
import { cn } from "@/lib/utils";
import { NotificationType } from "@/types/notification.enum";
import { BellOff } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
const NotificationList = ({
  isNotification,
  setIsNotification,
  setNotifications,
  notifications,
  count,
  setCount,
}: {
  isNotification: boolean;
  notifications: any[];
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  setNotifications: Dispatch<SetStateAction<any[]>>;
  setIsNotification: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchNotifications = async (offset: number) => {
    if (loading || !hasMore) return;
    setLoading(true);
    setIsError(false);
    const { error, data } = await getNotifications(offset);

    if (error) {
      setHasMore(false);
      setIsError(true);
      setLoading(false);
      return;
    }

    setNotifications((prev: any) => {
      const newNotifications = [...prev, ...(data?.user_notifications || [])];
      setCount(data.count);
      if (newNotifications.length >= data.count) {
        setHasMore(false);
      }
      return newNotifications;
    });

    setPage((prev) => prev + 1);
    setLoading(false);
  };
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          notifications.length < count
        ) {
          if (isNotification && page === 1) {
            setNotifications([]);
            fetchNotifications(0);
          } else fetchNotifications((page - 1) * 10);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading]);

  const updateNotificationsStatus = async () => {
    if (isNotification) {
      try {
        const { error, data } = await putNotification();
        if (data) {
          setIsNotification(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    return () => {
      updateNotificationsStatus();
      setNotifications([]);
      fetchNotifications(0);
    };
  }, []);

  return (
    <>
      <ul
        className={cn(
          " scrollbar-custom flex  h-auto max-h-[50vh] w-full flex-col overflow-y-auto",
        )}
      >
        {notifications.map((item: any, index: number) => {
          const info = JSON.parse(item?.info);
          const imageSrc =
            item?.notification_type === NotificationType.QRScannedSuccess ||
            item?.notification_type === NotificationType.ReviewAdded
              ? item?.responsibleUser?.avatar
              : `/img/${NotificationType[item?.notification_type as keyof typeof NotificationType]}.png`;

          return (
            <li key={index}>
              <div
                className={cn(
                  "border-stroke hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 flex flex-wrap gap-2.5 border-t px-4 py-3",
                  !item?.is_read && "bg-[#E7F0FA] ",
                )}
              >
                <div>
                  <Image
                    src={imageSrc || "/img/dummy-new.png"}
                    alt={"doctor"}
                    width={50}
                    height={50}
                    className="h-[50px] w-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="text-black dark:text-white">
                      {item?.description}{" "}
                      {item?.notification_type ===
                        NotificationType.QRScannedByStaff && "on "}
                      {item?.notification_type !==
                        NotificationType.QRScannedSuccess &&
                        moment(info?.date).local().format("MM/DD/YYYY")}
                      {item?.notification_type ===
                        NotificationType.QRScannedByStaff &&
                        `, at ${moment(info?.date).local().format("h:mm A")}.`}
                    </span>
                  </p>
                  <p className="pt-[10px] text-xs text-[#A0A0C1]">
                    {moment(item?.created_at)
                      .local()
                      .format("MM/DD/YYYY, hh:mm A")}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
        {loading &&
          Array.from({ length: 2 }).map((item, index: number) => (
            <li key={index}>
              <div className="border-stroke hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 flex flex-wrap gap-2.5 border-t px-4 py-3">
                <div>
                  <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 ">
                    <svg
                      className="h-8 w-8 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2.5 mt-4 h-2 w-full rounded-full bg-gray-200 "></div>
                  <div className="mb-2.5 h-2 w-full rounded-full bg-gray-200 "></div>
                  <div className="mb-2.5 h-2 w-[30%] rounded-full bg-gray-200 "></div>
                </div>
              </div>
            </li>
          ))}
        <div ref={observerRef} className="h-10 w-full  text-white">
          load more
        </div>
        {isError && (
          <li className=" w-full pb-10">
            <Image
              src="/img/sad-smile.svg"
              alt="sad smile"
              width={100}
              height={100}
              className="mx-auto mb-2 h-10 w-10 "
            />
            <p className="  text-center text-sm text-gray-800">
              Failed to load notifications,
              <span className="block">Please try again.</span>
            </p>
          </li>
        )}

        {notifications?.length === 0 && !loading && !isError && (
          <li className=" w-full pb-10">
            <BellOff className="mx-auto mb-2 h-7 w-7" />
            <p className="  text-center text-sm text-gray-800">
              No notifications at the moment.
              <span className="block">Check back later!</span>
            </p>
          </li>
        )}
      </ul>
    </>
  );
};

export default NotificationList;
