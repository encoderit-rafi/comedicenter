import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ContactForm from "./componants/contact-form";
export const dynamic = "force-dynamic";
const AllReview: React.FC = () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <div className="main_content_area bg-[#F6F8FB]">
        <div className="container mx-auto px-4 py-2 md:py-12">
          <div className="rounded-[12px] border border-[#E3E3E3] bg-[#fff] p-[50px]">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column - Contact Info */}
              <div className="space-y-8">
                <div className="flex items-center gap-2">
                  <Image
                    src="/img/logo.svg"
                    alt="CosMediCenter Logo"
                    width={500}
                    height={500}
                    className="h-auto w-auto"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-block">
                      <Image
                        src="/img/phone.svg"
                        alt=""
                        width={200}
                        height={200}
                        className="h-[25px] w-[25px]"
                      />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#34373C]">
                        Reservation
                      </h3>
                      <Link
                        href="tel:+1 9733448170"
                        className="text-lg text-[#2A5B9A] hover:text-blue-800"
                      >
                        +1 9733448170
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="inline-block">
                      <Image
                        src="/img/mail.svg"
                        alt=""
                        width={200}
                        height={200}
                        className="h-[25px] w-[25px]"
                      />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#34373C]">Email Info</h3>
                      <Link
                        href="mailto:info@cosmedicenter.com"
                        className="text-lg text-[#2A5B9A] hover:text-blue-800"
                      >
                        info@cosmedicenter.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="inline-block">
                      <Image
                        src="/img/location.svg"
                        alt=""
                        width={200}
                        height={200}
                        className="h-[25px] w-[25px]"
                      />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#34373C]">Address</h3>
                      <p className="text-gray-600">Newark, New Jersey</p>
                    </div>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReview;
