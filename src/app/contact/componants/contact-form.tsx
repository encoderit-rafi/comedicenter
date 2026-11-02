"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { postSupport } from "@/actions/enquiries.action";
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
import { Textarea } from "@/components/ui/textarea";
import { errorToast } from "@/lib/utils";
import { supportSchema } from "@/schema/contact.schema";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const form = useForm<z.infer<typeof supportSchema>>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const allFields = form.watch();
  const isFormEmpty = Object.values(allFields).every((val) =>
    typeof val === "string" ? val.trim() === "" : val === false,
  );
  const onSubmit = async (data: z.infer<typeof supportSchema>) => {
    const res = await postSupport(data);
    if (res.error) {
      errorToast(res.error);
      return;
    }
    toast.success(res.data);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#34373C]">Get in touch</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2 max-[1024px]:w-full min-[1024px]:flex-1">
                  <FormLabel className="text-sm font-[400] text-[#656B89]">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2 max-[1024px]:w-full min-[1024px]:flex-1">
                  <FormLabel className="text-sm font-[400] text-[#656B89]">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-[400] text-[#656B89]">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type Your Message Here..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isFormEmpty || form.formState.isSubmitting}
            className="w-full bg-[#7B2199] !text-[18px] font-[600]"
          >
            {form.formState.isSubmitting && (
              <LoaderCircle className="mr-2 animate-spin" />
            )}{" "}
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  );
}
