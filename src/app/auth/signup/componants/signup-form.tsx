"use client";

import { postRegister } from "@/actions/auth.action";
import { useAppContext } from "@/components/context";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, formatPhone } from "@/lib/utils";
import { signUpSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
export default function SignUpForm() {
  const { signupData, setSignupData } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: signupData?.name || "",
      email: signupData?.email || "",
      phoneNumber: formatPhone(signupData?.phoneNumber || ""),
      password: signupData?.password || "",
      confirmPassword: signupData?.confirmPassword || "",
      is_terms: signupData?.is_terms || false,
    },
  });

  const { watch, reset, formState } = form;
  const allFields = watch();
  const isFormEmpty = Object.values(allFields).every((val) =>
    typeof val === "string" ? val.trim() === "" : val === false,
  );

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const res = await postRegister(data);

      if (res.error) {
        if (res.message === "Email address is already in use.") {
          form.setError("email", {
            type: "manual",
            message: res.message,
          });
        } else {
          toast.error(res.message || "An error occurred.");
        }
        return;
      }

      setSignupData(data);
      const sessionId = res?.data?.session_id;
      if (sessionId) {
        toast.success("A code has been sent to your email address");
        router.push(`/auth/verification?session_id=${sessionId}`);
      } else {
        toast.error("Session ID is missing. Please try again.");
      }
    } catch (err) {
      console.error("SignUp Error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-[100%] rounded-[15px] bg-white p-8 md:w-[50%] min-[1024px]:mr-[-80px] min-[1024px]:p-[60px] min-[1100px]:pr-[150px]">
      <div className="pb-4">
        <p className="text-[22px] font-[500] text-[#8C2B91]">
          Register as a patient{" "}
        </p>
        <h2 className="mb-2 text-[32px] font-bold text-[#34373C]">
          Let&apos;s Get Started
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-[400] text-[#656B89]">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Full Name"
                    className="w-full bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-3">
            {/* Email Field */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="min-w-[200px] flex-1">
                  <FormLabel className="font-[400] text-[#656B89]">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Email Address"
                      className="w-full bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number Field */}
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className=" min-w-[200px] flex-1">
                    <FormLabel className="font-[400] text-[#656B89]">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Enter Phone Number"
                          className={cn(field?.value && "pl-[30px]")}
                          onChange={(e) => {
                            const formatted = formatPhone(e.target.value);
                            field.onChange(formatted);
                          }}
                          maxLength={17}
                        />
                        {field?.value && (
                          <span className="absolute left-[10px] top-4 text-sm">
                            +1
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Password Field */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="min-w-[200px] flex-1">
                  <FormLabel className="font-[400] text-[#656B89]">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        // placeholder="Password"
                        onKeyDown={(e) => e.key === " " && e.preventDefault()}
                        className="w-full bg-white pr-10"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
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
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        // placeholder="Confirm Password"
                        onKeyDown={(e) => e.key === " " && e.preventDefault()}
                        className="w-full bg-white pr-10"
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

          {/* Terms Checkbox */}
          <FormField
            name="is_terms"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                      className="h-[23px] w-[23px] rounded-[6px] border border-[#e2e8f0]"
                    />
                    <label className="text-sm text-gray-600">
                      By continuing, you agree to our{" "}
                      <Link
                        href="/terms-conditions"
                        target="_blank"
                        className="text-[#266EB8] hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      &{" "}
                      <Link
                        href="/privacy-policy"
                        target="_blank"
                        className="text-[#266EB8] hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="!h-auto w-full bg-[#7B2199] py-4 text-white hover:bg-purple-700 min-[1024px]:!text-[18px]"
            disabled={isFormEmpty || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
