"use client";

import { postForgotPasswordEmail } from "@/actions/auth.action";
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
import { errorToast } from "@/lib/utils";
import { formSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

function EmailForm() {
  const router = useRouter();
  const { setEmailData } = useAppContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error, data } = await postForgotPasswordEmail(
        values,
        "ClinicAdmin",
      );
      if (error) throw new Error(error);

      setEmailData(values);
      localStorage.setItem("emailData", JSON.stringify(values));

      toast.success("A code has been sent to your email address");
      router.push(
        `/auth/provider-login/forgot-password/verification-code?session_id=${data.session_id}`,
      );
      form.reset();
    } catch (error) {
      errorToast(error);
    }
  }
  const emailValue = form.watch("email");

  return (
    <>
      <div className="w-[100%] rounded-[15px] bg-white p-8 md:w-[50%] min-[1024px]:mr-[-80px] min-[1024px]:min-h-[600px] min-[1024px]:p-[60px] min-[1024px]:pr-[60px] min-[1100px]:pr-[150px]">
        <div className="pb-[50px]">
          <p className="text-[22px] font-[500] text-[#8C2B91]">
            Forgot Password
          </p>
          <h2 className="mb-2 text-[36px] font-bold text-[#34373C] min-[1100px]:text-[45px]">
            Enter your email
          </h2>
          <span className="block text-[#15192080] min-[1024px]:w-[100%]">
            Enter your email address to receive a code to reset your account
            password.
          </span>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-[60px]"
          >
            <div>
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
                        className="mx-auto w-[90%] bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="h-auto w-full rounded-[15px] bg-[#7B2199] !py-6 text-white hover:bg-purple-700 min-[1024px]:!text-[20px]"
              disabled={!emailValue || form.formState.isSubmitting}
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default EmailForm;
