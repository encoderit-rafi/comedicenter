// "use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ClinicList from "./clinic-list";
import TabWrapper from "./tab-wrapper";

const Clinic = ({
  initialData,
  uid,
  isSubscribed,
}: {
  initialData: any;
  uid: string | undefined;
  isSubscribed: boolean;
}) => {
  const doctors = initialData;

  // const observerRef = useRef<HTMLDivElement | null>(null);
  // const [doctors, setDoctors] = useState(initialData);
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);
  // const pathname = usePathname();
  // const [render, setRender] = useState<boolean>(false);
  // useEffect(() => {
  //   setDoctors(initialData);
  //   setRender((prev) => !prev);
  // }, [initialData]);
  // // Fetch more properties when user scrolls down
  // const fetchMoreProperties = async () => {
  //   if (!hasMore || loading) return;
  //   setLoading(true);
  //   const offset = page * 10;
  //   const { data, error } = await getClinics({
  //     limit: 10,
  //     populate: ["users"],
  //     offset,
  //   });

  //   if (error || !data?.properties?.length) {
  //     setHasMore(false);
  //     setLoading(false);
  //     return;
  //   }

  //   setDoctors((prev: any) => [...prev, ...data]);
  //   setPage((prev) => prev + 1);
  //   setLoading(false);
  // };
  // // Observe when the user reaches the bottom
  // useEffect(() => {
  //   if (!observerRef.current) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasMore && !loading) {
  //         fetchMoreProperties();
  //       }
  //     },
  //     { threshold: 1.0 },
  //   );

  //   observer.observe(observerRef.current);
  //   return () => observer.disconnect();
  // }, [hasMore, loading]);
  return (
    <div
      // key={render ? 1 : 0}
      className={cn(
        "scrollbar-custom max-h-[50vh] space-y-4 overflow-auto pb-[15px] pr-[15px] md:max-h-[70vh]",
        isSubscribed && "md:max-h-[90vh]",
      )}
    >
      {doctors?.data?.users.map((doctor: any, index: number) => (
        <TabWrapper key={doctor?.uid} uid={doctor?.uid}>
          <div
            className={cn(
              "flex items-center rounded-lg border border-[#E3E3E3] bg-[#FFF] p-4",
              (uid ? doctor?.uid === uid : index === 0) && "bg-[#E7F0FA]",
            )}
          >
            <Image
              src={doctor?.avatar || "/img/dummy-new.png"}
              alt={doctor?.name}
              width={200}
              height={200}
              className="h-16 w-16 rounded-full object-cover min-[1024px]:h-[85px] min-[1024px]:w-[85px]"
            />
            <div className="ml-4 flex flex-1 gap-4 max-[768px]:flex-wrap">
              <div className="flex flex-col items-start justify-center min-[1024px]:w-1/2">
                <h3 className="text-limit5 text-[20px] font-[600]">
                  {" "}
                  {doctor?.name}
                </h3>
                <p className="text-[16px] text-[#777777]">
                  {doctor?.specialty_name}
                </p>
                {doctor?.is_featured && (
                  <span className="mt-2 inline-block">
                    <Image
                      src={"/img/featured.svg"}
                      width={200}
                      height={200}
                      alt="featured"
                      className="h-auto w-auto"
                    />
                  </span>
                )}
              </div>

              <ClinicList clinics={doctor?.clinics || []} />
            </div>
            <div className="ml-4">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                className={cn(
                  "hidden",
                  (uid ? doctor?.uid === uid : index === 0) && "block",
                )}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.6055 13.1875L13.1867 17.6094C12.8812 17.9141 12.3867 17.9141 12.082 17.6094C11.7766 17.3047 11.7766 16.8047 12.082 16.5L15.3016 13.2812H7.03125C6.59922 13.2812 6.25 12.9297 6.25 12.5C6.25 12.0703 6.59922 11.7188 7.03125 11.7188H15.3016L12.082 8.5C11.7766 8.19532 11.7766 7.70309 12.082 7.39059C12.3867 7.08591 12.8812 7.08591 13.1867 7.39059L17.6055 11.8125C17.793 12 17.8516 12.2578 17.8086 12.5C17.8516 12.7422 17.793 13 17.6055 13.1875ZM12.5 0C5.59609 0 0 5.59375 0 12.5C0 19.4062 5.59609 25 12.5 25C19.4039 25 25 19.4062 25 12.5C25 5.59375 19.4039 0 12.5 0Z"
                  fill="#2A5B9A"
                />
              </svg>
            </div>
          </div>
        </TabWrapper>
      ))}
      {/* {loading && doctors?.data?.count > 10 && (
        <LoaderCircle className="mr-2 animate-spin text-[#92278F]" />
      )}
      {doctors?.data?.count > 10 && (
        <div ref={observerRef} className="h-10 w-full"></div>
      )} */}
    </div>
  );
};

export default Clinic;
