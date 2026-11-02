"use client";
import { postCode, postResendCode } from "@/actions/auth.action";
import SuccessModal from "@/app/auth/verification/componants/success-modal";
import { useAppContext } from "@/components/context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { commonErrorHandler, errorToast, maskEmail } from "@/lib/utils";
import { codeSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function Verification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const session_id = searchParams.get("session_id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { emailData } = useAppContext();
  const [resenting, setResenting] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const form = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = form.watch("otp");

  const onSubmit = async (data: z.infer<typeof codeSchema>) => {
    try {
      const res = await postCode(data.otp, session_id);
      if (res.error) {
        form.reset();
        if (res.error === "Invalid Code") {
          toast.error("Invalid verification code. Please try again.");
          form.reset();
        } else if (res.error === "Maximum number of retries exceeded") {
          toast.error("Maximum number of tries has been exceeded");
        } else {
          toast.error(res.error || "An error occurred.");
        }
        return;
      }
      toast.success("Code verified successfully");
      form.reset();
      router.replace(
        `/auth/forgot-password/change-password?session_id=${session_id}`,
      );
    } catch (err: any) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  async function resendOTP() {
    try {
      setResenting(true);

      const { error, data, statusCode } = await postResendCode(session_id);

      if (error) {
        if (statusCode === 403) {
          router.replace("/auth/forgot-password");
        }
        throw new Error(error);
      }

      const params = new URLSearchParams(searchParams);
      params.set("session_id", data.session_id);
      router.replace(`${pathname}?${params.toString()}`);
      toast.success("Code sent successfully.");
      setTimeLeft(300); // Reset the timer to 5 minutes
    } catch (error) {
      const message = commonErrorHandler(error);
      errorToast(
        message?.error
          ? "Maximum number of tries has been exceeded."
          : "An unexpected error occurred.",
      );

      router.push("/auth/forgot-password/email");
    } finally {
      setResenting(false);
    }
  }

  return (
    <>
      <div className="w-[100%] rounded-[15px] bg-white p-8 md:w-[50%] min-[1024px]:mr-[-80px] min-[1024px]:min-h-[600px] min-[1024px]:p-[60px] min-[1024px]:pr-[60px] min-[1100px]:pr-[150px]">
        <p className="text-[22px] font-[500] text-[#8C2B91]">Forgot Password</p>
        <h2 className="mb-2 text-[36px] font-bold text-[#34373C] min-[1100px]:text-[45px]">
          Verification Code
        </h2>
        <span>
          {" "}
          <span className="block text-[#15192080] min-[1024px]:w-[100%]">
            We have sent the verification code to your email address{" "}
          </span>
          <span>{emailData?.email ? maskEmail(emailData?.email) : ""}</span>
        </span>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
            <h3 className="pb-2 text-center text-[#656B89]">
              Enter Verification Code
            </h3>
            <FormField
              control={form.control}
              name="otp"
              render={({ field, fieldState }) => (
                <FormItem className="flex w-full flex-col items-center justify-center">
                  <FormControl>
                    <InputOTP {...field} maxLength={5}>
                      <InputOTPGroup className="flex justify-center gap-2 pb-0">
                        {[...Array(5)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="!rounded-[8px] border bg-white"
                            onChange={(e) => field.onChange(e)}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <div className="px-6 pt-6">
              <Button
                className="w-full bg-[#7B2199] text-white hover:bg-purple-700 "
                type="submit"
                disabled={form.formState.isSubmitting || !otpValue}
              >
                {form.formState.isSubmitting ? "Verifying..." : "Verify Code"}
              </Button>
              <div className="block pt-8 text-center">
                <p>
                  <button
                    disabled={resenting}
                    type="button"
                    onClick={resendOTP}
                    className="hover:text-secondary cursor-pointer text-[18px]  text-xs font-[700] text-[#405168]"
                  >
                    {resenting ? "Resending.." : "Resend Code"}
                  </button>
                </p>
              </div>
              <div>
                <p className="mt-[80px] text-center">
                  {!!timeLeft && (
                    <>
                      Code expires in <b>{formatTime(timeLeft)}</b>
                    </>
                  )}
                </p>
              </div>
            </div>
          </form>
        </Form>
        {/* Success Modal */}
        <SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message="Email Sent"
          desc="Check your email and open the link we sent to continue"
        />
      </div>
    </>
  );
}

export default Verification;
