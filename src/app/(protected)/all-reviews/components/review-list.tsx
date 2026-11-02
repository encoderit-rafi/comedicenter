import moment from "moment";
import Image from "next/image";

const ReviewList = ({ review }: { review: any[] }) => {
  return (
    <div className=" w-full">
      {review?.map((item) => (
        <div
          key={item?.uid}
          className="mb-4 flex flex-wrap items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md"
        >
          <div>
            <div className="flex items-center justify-start">
              <div className="flex flex-wrap gap-4">
                <Image
                  src={
                    item?.visit_history?.patient?.avatar || "/img/dummy-new.png"
                  }
                  alt={item?.visit_history?.patient?.name}
                  width={50}
                  height={50}
                  className="h-[50px] w-[50px] rounded-full"
                />
                <div className="flex-1">
                  <h4 className="text-base font-semibold">
                    {item?.visit_history?.patient?.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {moment(item?.visit_history?.created_at)
                      .local()
                      .format("L")}
                  </p>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="mt-4">
              <h4 className="mb-2 text-base font-semibold">{item?.title}</h4>
              <p className="text-sm text-gray-700 xl:max-w-[70vw]">
                {item?.description}
              </p>
            </div>

            {/* Photos Section */}
            <div className="mt-4 flex gap-4">
              {item?.photos?.map((photo: string, index: number) => {
                const image = JSON.parse(photo);
                return (
                  <div
                    key={index}
                    className="relative h-20 w-20 overflow-hidden rounded-md border border-gray-200"
                  >
                    <Image
                      src={image?.url || "/img/default-image.jpg"}
                      alt={`Photo ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      placeholder="blur"
                      blurDataURL="/img/default-image-new.png"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                        fill={i < item?.rating ? "#FFBE19" : "#E1E1F3"}
                      />
                    </svg>
                  </span>
                ))}
              </div>
              <p className="text-sm font-normal">{item?.rating}.0</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
