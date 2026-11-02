function SkeletonLoader() {
  return (
    <>
      <div className="h-20 w-full animate-pulse rounded-lg bg-gray-200 p-4">
        <div className="flex gap-2">
          <div>
            <span className="block h-[50px] w-[50px] rounded-full bg-gray-300"></span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="h-[20px] w-[400px] bg-gray-300"></p>
            <p className="h-[20px] w-[400px] bg-gray-300"></p>
          </div>
        </div>
      </div>
      <div className="h-20 w-full animate-pulse rounded-lg bg-gray-200 p-4">
        <div className="flex gap-2">
          <div>
            <span className="block h-[50px] w-[50px] rounded-full bg-gray-300"></span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="h-[20px] w-[400px] bg-gray-300"></p>
            <p className="h-[20px] w-[400px] bg-gray-300"></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonLoader;
