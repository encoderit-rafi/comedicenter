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
                <span className="font-medium text-[#87C2FF]">Users</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container mx-auto min-h-[calc(100vh-300px)] py-8">
        <div className="w-full">
          {/*  */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white pt-[45px] text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
              >
                <div className="flex flex-col items-center p-6 pb-6 pt-0">
                  <div className="relative mb-3 flex items-center justify-center overflow-hidden rounded-full">
                    <div className="h-[120px] w-[120px] animate-pulse rounded-full bg-gray-300"></div>
                  </div>
                  <h3 className="text-primary text-limit-x mb-3 h-5 w-1/2 animate-pulse rounded bg-gray-300 text-[18px] font-semibold text-[#343462]"></h3>
                  <p className="text-muted-foreground h-4 w-3/4 animate-pulse rounded bg-gray-300 text-[15px] text-[#686868]"></p>
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
