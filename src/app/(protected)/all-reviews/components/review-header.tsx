import Image from "next/image";

const ReviewHeader = ({
  clinic,
  avgRating,
  count,
}: {
  clinic: any;
  avgRating: string;
  count: number;
}) => {
  return (
    <>
      <div className="top-bar bg-white shadow-md">
        <div className="container">
          <div className="flex w-full flex-wrap items-center justify-between py-4">
            <div className="flex items-center gap-4 min-[1024px]:pr-[20px]">
              <div>
                <Image
                  src={clinic?.avatar || "/img/default-image-new.png"}
                  alt={clinic?.name || "Clinic image"}
                  width={100}
                  height={100}
                  className="h-[100px] w-[100px] rounded-md object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{clinic?.name}</h3>
                <p className="text-sm text-gray-500">
                  {clinic?.location?.address}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <p className="mt-[5px] text-2xl font-bold">{avgRating}</p>
              <div className="flex flex-wrap items-center gap-1">
                {[...Array(5)].map((_, i) => {
                  const fullStars = Math.floor(+avgRating);
                  const decimalPart = +avgRating - fullStars;
                  const isHalfStar = i === fullStars && decimalPart > 0;

                  return (
                    <span key={i} className="relative inline-block">
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <clipPath id={`clip-${i}`}>
                            <rect width={`${decimalPart * 24}`} height="25" />
                          </clipPath>
                        </defs>

                        <path
                          d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                          fill="#E1E1F3"
                        />

                        {i < fullStars && (
                          <path
                            d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                            fill="#FFBE19"
                          />
                        )}

                        {isHalfStar && (
                          <path
                            d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                            fill="#FFBE19"
                            clipPath={`url(#clip-${i})`}
                          />
                        )}
                      </svg>
                    </span>
                  );
                })}
              </div>

              <p className="cursor-default text-sm text-blue-500 hover:underline">
                {count} {count === 1 ? "Review" : "Reviews"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewHeader;
