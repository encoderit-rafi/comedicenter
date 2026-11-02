import { Card, CardContent } from "@/components/ui/card";
import { API } from "@/lib/fetch";
import Image from "next/image";
import PaymentForm from "../components/payment-form";
export const dynamic = "force-dynamic";
interface PaymentProps {
  params: Promise<{ subid: string }>;
}

export default async function Page({ params }: PaymentProps) {
  const { subid } = await params;
  let selectedPlan = null;

  try {
    const response = await API.GetAll("plans", {
      where: {
        uid: subid,
      },
    });
    if (response.error) {
      throw new Error(response.error);
    }

    selectedPlan = response.data;
  } catch (err) {
    console.error("API Error:", err);
  }
  const formatPrice = parseFloat(selectedPlan?.plans[0]?.price).toFixed(0);
  return (
    <div>
      <div className="main_content_area bg-[#F6F8FB]">
        <div className="bg-gray-50 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl rounded-lg bg-white p-6 shadow-sm">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-2xl font-semibold text-[#34373C]">
                        Payment
                      </h1>
                      <p className="text-sm text-gray-500">
                        Enter Card Details Below
                      </p>
                    </div>
                    <Card className="bg-[#e8f5e9]">
                      <CardContent className="p-0 pt-6">
                        <div className="space-y-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">
                              Total payable
                            </p>
                            <p className="text-4xl font-bold text-green-600">
                              <span>$</span>
                              {selectedPlan?.plans[0]?.price || "NA"}
                            </p>
                          </div>
                          <div className="flex justify-center">
                            <div className="relative w-full">
                              <Image
                                src="/img/payimg.png"
                                alt=""
                                width={500}
                                height={500}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              <div>
                <PaymentForm selectedPlan={selectedPlan?.plans} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
