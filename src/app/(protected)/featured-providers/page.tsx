import Image from "next/image";
export const dynamic = "force-dynamic";
const CmcCares = () => {
  return (
    <>
      <div className="container">
        <div className="flex min-h-screen flex-col flex-wrap items-center justify-center py-8 md:flex-row md:py-16">
          <div>
            <Image
              src="/img/coming-soon.svg"
              width={100}
              height={100}
              alt="Beauty and wellness"
              className="w-auto max-w-[350px] object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CmcCares;
