export default function SkeletonLoader() {
  return (
    <div>
      <div className="flex flex-col gap-3 bg-[#34373C] sm:flex-row sm:items-center sm:justify-between">
        <div className="container">
          <nav>
            <ol className="flex items-center gap-2 p-2">
              {/* Home Link */}
              <li className="flex items-center">
                <a href="/" className="font-medium text-white">
                  Home
                </a>
                <span className="mx-2">
                  <svg
                    width="7"
                    height="13"
                    viewBox="0 0 7 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 6.5L1 12"
                      stroke="white"
                      strokeOpacity="0.56"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </li>

              {/* Clinic Label */}
              <li className="flex items-center">
                <span className="font-medium text-[#87C2FF]">Clinic</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container flex min-h-screen flex-wrap">
        <div className="w-full p-6 max-[768px]:p-0 min-[768px]:w-6/12">
          <div className="relative">
            <div className="w-full">
              <div className="flex flex-col bg-[#f6f8fb] py-4 md:p-0">
                <div className="flex w-full items-center justify-center overflow-hidden rounded-t-lg bg-gray-100">
                  <div className="w-full rounded-lg bg-white shadow-md">
                    <div>
                      <div className="relative h-[200px] rounded-t-[10px] bg-cover bg-center">
                        <div className="skeleton-image h-full w-full"></div>
                        <span className="skeleton-backdrop absolute left-0 top-0 h-full w-full backdrop-blur-[15px]"></span>
                        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 transform">
                          <div className="skeleton-image flex h-[190px] w-[190px] items-center justify-center rounded-[20px] border-4 border-white bg-[#7b7e82]">
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
                      </div>

                      <div className="bg-gradient-to-r from-[#450B78] via-[#3C2A88] to-[#021C6F] p-4 pb-10 pt-20 text-center">
                        <div className="mt-4 text-center">
                          <div className="flex items-center justify-center text-yellow-500">
                            <div className="skeleton-text h-[20px] w-[40px]"></div>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div className="skeleton-text mt-2 h-[30px] w-[200px] rounded-[16px] bg-gray-200"></div>
                            <div className="skeleton-text mt-2 h-[20px] w-[150px] rounded-[16px] bg-gray-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-b-[10px] border border-[#E3E3E3] bg-white p-4">
                <div className="flex items-center gap-2">
                  <div className="py-[25px]">
                    <div className="skeleton-image h-[150px] w-[150px] rounded-full bg-[#c5c5c5]"></div>
                  </div>
                  <div className="flex-1">
                    <div className="skeleton-text h-[20px] w-3/4 rounded-[16px] bg-[#c5c5c5]"></div>
                    <div className="skeleton-text mt-2 h-[25px] w-1/2 rounded-[16px] bg-[#c5c5c5]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-6 pl-0 max-[768px]:p-0 min-[768px]:w-6/12">
          {/*  */}
          <div className="flex w-full flex-col gap-[10px] max-[768px]:mt-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <div className="w-full pl-0 max-[768px]:p-0 ">
                  <div className="rounded-lg border bg-[#FFFFFF] p-4 shadow-[0px_0px_10.6px_4px_rgba(0,0,0,0.06)]">
                    <div className="w-full">
                      <div className="flex flex-wrap items-center justify-center gap-4 max-[768px]:flex-col max-[768px]:items-center">
                        <div>
                          <div className="h-[80px] w-[80px] rounded-full bg-gray-200 text-[16px]"></div>
                        </div>
                        <div className="flex h-[inherit] flex-1 flex-col gap-4 max-[1100px]:flex-wrap max-[768px]:w-full max-[768px]:items-center ">
                          <div className="h-[18px] w-1/2 rounded-[16px] bg-gray-200 min-[1200px]:w-[230px]"></div>
                          <div className="h-[18px] w-3/4 rounded-[16px] bg-gray-200 min-[1200px]:w-[230px]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
}
