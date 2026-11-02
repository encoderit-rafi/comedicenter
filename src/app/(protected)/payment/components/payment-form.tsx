"use client";
import {
  postSubscription,
  revalidatePageFromClient,
} from "@/actions/auth.action";
import { useAppContext } from "@/components/context";
import { subscriptionSchema } from "@/schema/auth.schema";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import * as z from "zod";
import SuccessModal from "./success-modal";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);
type SubscriptionData = z.infer<typeof subscriptionSchema>;
function CheckoutForm({ selectedPlan }: { selectedPlan: any }) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { planMemberData } = useAppContext();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [selectedPlanData] = useState(selectedPlan);
  const [cardComplete, setCardComplete] = useState<boolean>(false);
  const [expiryComplete, setExpiryComplete] = useState<boolean>(false);
  const [cvcComplete, setCvcComplete] = useState<boolean>(false);
  console.log(planMemberData, "planMemberData");

  const handleChange = (
    event: any,
    setState: Dispatch<SetStateAction<boolean>>,
  ) => {
    if (event?.complete) {
      setState(true);
    } else {
      setState(false);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);
    if (!stripe || !elements) return;
    if (!cardComplete && !expiryComplete && !cvcComplete) {
      setErrorMessage("Please complete the form.");
      setIsProcessing(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      const { token, error } = await stripe.createToken(
        cardNumberElement as any,
      );
      if (error) {
        setErrorMessage(error.message || "An unexpected error occurred");
        setIsProcessing(false);
        return;
      }

      if (token?.id) {
        const subscriptionData: SubscriptionData = {
          payment_method: "card",
          stripe_token: token.id,
          plan_uid:
            selectedPlanData?.map((item: any) => item?.uid).toString() || "",
          members_data: planMemberData,
          is_renew: true,
        };

        const res: any = await postSubscription(subscriptionData);
        // console.log(res, "res");

        if (res?.data?.subscription?.active) {
          setPaymentSuccess(true);
          setErrorMessage(null);
          setIsModalOpen(true);
          setIsFormComplete(true);
          revalidatePageFromClient("qr-code");
          setTimeout(() => {
            router.replace(`/profile`);
          }, 1000);
        } else if (res?.error) {
          setErrorMessage(
            res.error.message || "Payment failed. Please try again.",
          );
        }
      }
    } catch (error) {
      setErrorMessage("Payment failed. Please try again.");
    }

    setIsProcessing(false);
  };

  return (
    <div>
      {isFormComplete ? (
        <SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message="Payment Successful!"
          selectedPlan={selectedPlan}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor=""
              className="mb-2 block text-left text-sm font-medium text-[#656B89]"
            >
              Card number
            </label>
            <CardNumberElement
              className="mb-3 rounded-[5px] border border-slate-200 px-3 py-4"
              onChange={(e) => handleChange(e, setCardComplete)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label
                htmlFor=""
                className="mb-2 block text-left text-sm font-medium text-[#656B89]"
              >
                Expiry date
              </label>
              <CardExpiryElement
                className="mb-3 rounded-[5px] border border-slate-200 px-3 py-4"
                onChange={(e) => handleChange(e, setExpiryComplete)}
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor=""
                className="mb-2 block text-left text-sm font-medium text-[#656B89]"
              >
                CVC
              </label>
              <CardCvcElement
                className="mb-3 rounded-[5px] border border-slate-200 px-3 py-4"
                onChange={(e) => handleChange(e, setCvcComplete)}
              />
            </div>
          </div>

          {errorMessage && (
            <span style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </span>
          )}
          <div className="text-right">
            <button
              type="submit"
              className="mt-2 inline-block w-full rounded-[8px] bg-[#7B2199] px-[25px] py-2 text-white hover:bg-purple-700"
              disabled={!stripe || isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function CheckoutPage({ selectedPlan }: { selectedPlan: any }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="pg_inside pb-5">
        <div className="d-flex justify-content-center">
          <div className="card subscription-card col-12">
            <div className="card-body pt-0 text-center">
              <div className="sub-listing ">
                <Elements stripe={stripePromise}>
                  <CheckoutForm selectedPlan={selectedPlan} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
