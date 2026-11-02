import Breadcrumb from "@/components/breadcrumb/breadcrumb";
const loading = () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "All Reviews" }]}
      />
      <div className="main_content_area bg-[#F6F8FB]">
        <div>
          <div className="top-bar bg-white shadow-md">
            <div className="container">
              <div className="flex w-full flex-wrap items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex h-[100px] w-[100px] animate-pulse items-center justify-center  rounded-md bg-gray-300 dark:bg-gray-700 ">
                      <svg
                        className="h-12 w-12 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="animae-pulse">
                    <div className="mb-2 h-3.5 w-44 rounded-full bg-gray-200"></div>
                    <div className="mb-2.5 h-2 rounded-full bg-gray-200 "></div>
                  </div>
                </div>

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
                          className="animae-pulse"
                        >
                          <path
                            d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                            fill={"#D8DAE0"}
                          />
                        </svg>
                      </span>
                    ))}
                  </div>
                  <div className=" animae-pulse h-2.5 w-24 rounded-full bg-gray-200 "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="review_list pt-4">
          <div className="container">
            <div className="w-full">
              <div className="mb-4 flex flex-wrap items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <div className="min-w-[70%]">
                  <div className="flex items-center justify-start">
                    <div className="flex animate-pulse gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 ">
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
                      <div>
                        <div className="mt-2 h-3.5 w-36 rounded-full bg-gray-200"></div>

                        <div className="mt-2 h-3 w-20 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mt-4">
                    <div className="mb-2 h-3.5 w-36 rounded-full bg-gray-200"></div>
                    <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700 md:w-full"></div>
                    <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700 md:w-[80%]"></div>
                  </div>

                  {/* Photos Section */}
                  <div className="mt-4 flex gap-4 ">
                    {[...Array(3)].map((photo, index) => (
                      <div
                        className="flex h-20 w-20 animate-pulse items-center justify-center rounded bg-gray-300 "
                        key={index}
                      >
                        <svg
                          className="h-10 w-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                    ))}
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
                            className="animate-pulse"
                          >
                            <path
                              d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                              fill={"#D8DAE0"}
                            />
                          </svg>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <div className="min-w-[70%]">
                  <div className="flex items-center justify-start">
                    <div className="flex animate-pulse gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 ">
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
                      <div>
                        <div className="mt-2 h-3.5 w-36 rounded-full bg-gray-200"></div>

                        <div className="mt-2 h-3 w-20 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mt-4">
                    <div className="mb-2 h-3.5 w-36 rounded-full bg-gray-200"></div>
                    <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700 md:w-full"></div>
                    <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700 md:w-[80%]"></div>
                  </div>

                  {/* Photos Section */}
                  <div className="mt-4 flex gap-4 ">
                    {[...Array(3)].map((photo, index) => (
                      <div
                        className="flex h-20 w-20 animate-pulse items-center justify-center rounded bg-gray-300 "
                        key={index}
                      >
                        <svg
                          className="h-10 w-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                    ))}
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
                            className="animate-pulse"
                          >
                            <path
                              d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                              fill={"#D8DAE0"}
                            />
                          </svg>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default loading;
