"use client";

import { LoginAsProvider } from "@/actions/auth.action";
import { useAppContext } from "@/components/context";
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
import { loginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

function SigninForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signupData, setSignupData } = useAppContext();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const { username, password } = values;
      const res = await LoginAsProvider({ username, password });
      if (!res || res.error)
        throw new Error(res?.error || "Internal server error!");
      router.replace(`${searchParams.get("callbackUrl") || "/clinic"}`);
      setSignupData();
      toast.success("You have successfully logged in");

      router.refresh();
      // setIsModalOpen(true);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    }
  }

  return (
    <div className="w-full rounded-[15px] bg-white p-8 md:w-[50%] min-[1024px]:mr-[-80px] min-[1024px]:p-[60px] min-[1024px]:pr-[60px] min-[1100px]:pr-[150px]">
      <div className="pb-[50px]">
        <h2 className="mb-2 text-[36px] font-bold leading-normal text-gray-900 min-[1100px]:text-[45px]">
          Sign In
        </h2>
        <p className="mb-6 text-gray-600 md:w-[70%]">Login as Provider</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="username"
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

          <div className="text-right">
            <Link
              href="/auth/provider-login/forgot-password/email"
              className="text-[#266EB8] hover:underline"
            >
              <span>Forgot password?</span>
            </Link>
          </div>

          <Button
            type="submit"
            className="!h-auto w-full rounded-[10px] bg-[#7B2199] py-4 text-[18px] text-white hover:bg-purple-700"
            disabled={
              !form.formState.dirtyFields.username ||
              !form.formState.dirtyFields.password ||
              form.formState.isSubmitting
            }
          >
            Continue
          </Button>
        </form>
      </Form>
      <div className="flex justify-center pt-[20px]">
        <Link
          href="/auth/signin"
          className="font-[600] text-[#266EB8] hover:underline"
        >
          Click here for patient login.
        </Link>
      </div>
    </div>
  );
}

export default SigninForm;
