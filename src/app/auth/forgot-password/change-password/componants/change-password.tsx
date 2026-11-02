"use client";

import { postResetPassword } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { commonErrorHandler, errorToast } from "@/lib/utils";
import { resetPasswordSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

function ChangePassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  // Initialize the form instance
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { watch, reset, formState } = form;
  const allFields = watch();
  const isFormEmpty = Object.values(allFields).every((val) =>
    typeof val === "string" ? val.trim() === "" : val === false,
  );
  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    try {
      const { error, data, statusCode } = await postResetPassword(
        values,
        session_id,
      );
      if (!!error) {
        if (statusCode === 403) {
          router.replace("/auth/forgot-password");
        }
        throw new Error(error);
      }
      router.replace(`/auth/signin`);
      toast.success("Your password has been reset successfully");
    } catch (error) {
      const message = commonErrorHandler(error);
      errorToast(message.error);
    }
  }
  return (
    <>
      <div className="w-[100%] rounded-[15px] bg-white p-8 md:w-[50%] min-[1024px]:mr-[-80px] min-[1024px]:min-h-[600px] min-[1024px]:p-[60px] min-[1024px]:pr-[60px] min-[1100px]:pr-[150px]">
        <p className="text-[22px] font-[500] text-[#8C2B91]">Forgot Password</p>
        <div className="mb-5">
          <h2 className="text-[32px] font-bold leading-normal text-[#34373C] min-[1100px]:text-[45px]">
            Change Password
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-[70px] pt-6"
          >
            <div>
              {/* Password Field */}
              <FormField
                name="newPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="min-w-[200px] flex-1 pb-3">
                    <FormLabel className="font-[400] text-[#656B89]">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="w-full bg-white pr-10"
                          onKeyDown={(e) => e.key === " " && e.preventDefault()}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeIcon className="h-5 w-5 text-gray-400" />
                          ) : (
                            <EyeOffIcon className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="min-w-[200px] flex-1">
                    <FormLabel className="font-[400] text-[#656B89]">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Password"
                          className="w-full bg-white pr-10"
                          onKeyDown={(e) => e.key === " " && e.preventDefault()}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeIcon className="h-5 w-5 text-gray-400" />
                          ) : (
                            <EyeOffIcon className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="h-auto w-full rounded-[15px] bg-[#7B2199] !py-6 text-white hover:bg-purple-700 min-[1024px]:!text-[20px]"
              disabled={isFormEmpty || form.formState.isSubmitting}
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default ChangePassword;
