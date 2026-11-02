import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { FAQ } from "@/components/faq/faq";
export const dynamic = "force-dynamic";
const CosMediCenterPage = () => {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <div className="main_content_area bg-[#F6F8FB]">
        <section className="faq bg-white py-[80px]">
          <div className="container">
            <div className="flex flex-wrap">
              <div className="w-full min-[1024px]:w-1/2">
                <div>
                  <h2 className="text-[30px] font-bold leading-[40px] text-[#34373C] min-[1024px]:text-[48px] min-[1024px]:leading-[60px]">
                    <span className="block">Frequently asked</span> questions
                  </h2>
                  <p className="mt-4 text-[18px] text-[#000] min-[1024px]:w-[70%] min-[1024px]:text-[22px]">
                    Everything you need to know about the product and how it
                    works
                  </p>
                </div>
              </div>
              <div className="w-full min-[1024px]:w-1/2">
                <div className="max-[1024px]:pt-[30px]">
                  <FAQ />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CosMediCenterPage;
