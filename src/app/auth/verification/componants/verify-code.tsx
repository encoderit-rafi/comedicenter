"use client";
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
import { useState } from "react";

import { Login, postResendCode } from "@/actions/auth.action";
import { postVerifyCode } from "@/actions/verify-code.action";
import { useAppContext } from "@/components/context";
import { commonErrorHandler, errorToast, maskEmail } from "@/lib/utils";
import { codeSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SuccessModal from "./success-modal";

function Verification() {
  const { signupData, setSignupData } = useAppContext(); // Use context
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const session_id = searchParams.get("session_id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resenting, setResenting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = form.watch("otp");

  const onSubmit = async (data: z.infer<typeof codeSchema>) => {
    try {
      const payload = {
        session_id: session_id,
        otp: data.otp,
      };
      const responseData = await postVerifyCode(payload);

      if (responseData?.error) {
        form.reset();
        if (responseData?.error === "Invalid Code") {
          toast.error("Invalid verification code. Please try again.");
        } else if (
          responseData?.error === "Maximum number of retries exceeded"
        ) {
          toast.error("Maximum number of tries has been exceeded");
        } else {
          toast.error(responseData?.error || "An error occurred.");
        }
        return;
      }
      if (responseData && responseData?.data?.token) {
        const payload = {
          username: responseData?.data?.user?.email,
          password: signupData?.password,
        };
        const result = await Login(payload);
        if (result?.error) {
          toast.error("Login failed. Please try again.");
        } else {
          setIsModalOpen(true);
        }
      } else {
        toast.error("Verification successful, but login failed!");
        router.push("/auth/signup");
      }
      form.reset();
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  async function resendOTP() {
    setResenting(true);
    try {
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
      setResenting(false);
    } catch (error) {
      setResenting(false);
      const message = commonErrorHandler(error);

      errorToast(
        message?.error
          ? "Maximum number of tries has been exceeded."
          : "An unexpected error occurred.",
      );

      router.push("/auth/signup");
    }
  }

  return (
    <>
      <div className="w-[100%] rounded-[15px] bg-white p-8 md:w-[50%] min-[1024px]:mr-[-80px] min-[1024px]:min-h-[600px] min-[1024px]:p-[60px] min-[1024px]:pr-[60px] min-[1100px]:pr-[150px]">
        <p className="text-[22px] text-[#8C2B91]">Create Account</p>
        <h2 className="mb-2 text-[36px] font-bold text-[#34373C] min-[1100px]:text-[45px]">
          {" "}
          Verification Code{" "}
        </h2>
        <span>
          {" "}
          <span className="block text-[#15192080] min-[1024px]:w-[100%]">
            We have sent the verification code to your email address{" "}
          </span>
          <span>{signupData?.email ? maskEmail(signupData?.email) : ""}</span>
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
                disabled={!otpValue || form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Continue"}
              </Button>
              <div className=" block pt-4 text-center">
                <p>
                  Didn&apos;t receive code?
                  <button
                    disabled={resenting}
                    type="button"
                    onClick={resendOTP}
                    className="hover:text-secondary !h-auto cursor-pointer pl-[5px] text-xs text-[#1C75BC] underline"
                  >
                    {resenting ? "Resending.." : "Resend"}
                  </button>
                </p>
              </div>
            </div>
          </form>
        </Form>
        {/* Success Modal */}
        <SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message="Success!"
          desc="Welcome to CosMediCenter your  gateway to a better you"
          hasButton
        />
      </div>
    </>
  );
}

export default Verification;
