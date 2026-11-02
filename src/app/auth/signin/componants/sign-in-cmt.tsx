"use client";

import { Login } from "@/actions/auth.action";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const { signupData, setSignupData } = useAppContext();
  useEffect(() => {
    setSignupData();
  }, [setSignupData]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = await Login(values);
      if (!res) {
        throw new Error("Internal server error!");
      }
      if (res?.error) {
        throw new Error(res?.error);
      }
      if (searchParams.get("callbackUrl") === "/payment") {
        router.replace("/subscription");
        setSignupData();
        router.refresh();
      } else {
        router.push(
          searchParams.get("callbackUrl")
            ? String(searchParams.get("callbackUrl"))
            : "/our-providers",
        );
        setSignupData();
        router.refresh();
      }
      toast.success("You have successfully logged in");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            {/* Email Field */}
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
          </div>

          <div>
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
          </div>

          <div className="text-right">
            <Link
              href="/auth/forgot-password/email"
              className="text-[#266EB8] hover:underline"
            >
              <span>Forgot password?</span>
            </Link>
          </div>
          {/* Submit Button */}
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
    </>
  );
}

export default SignInForm;
