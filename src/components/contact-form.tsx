"use client";

import { postEnquiries } from "@/actions/enquiries.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, errorToast, formatPhone } from "@/lib/utils";
import { contactFormchema } from "@/schema/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const defaultValues: Partial<z.infer<typeof contactFormchema>> = {
  name: "",
  email: "",
  phone: "",
  specialization: "",
  address: "",
  city: "",
  state_id: "",
  zip: "",
  license: "",
};

const ContactForm = ({
  stateData,
  specialityData,
  children,
}: {
  specialityData: any;
  stateData: any;
  children: ReactNode;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const form = useForm<z.infer<typeof contactFormchema>>({
    resolver: zodResolver(contactFormchema),
    defaultValues,
  });

  const handleClick = () => {
    setModalOpen(true);
  };
  const onSubmit = async (data: z.infer<typeof contactFormchema>) => {
    const res = await postEnquiries({
      ...data,
      phone: data.phone.replace(/\D/g, "").slice(-10) || "",
    });
    if (res.error) {
      errorToast(res.error);
      return;
    }
    toast.success("Thank you! We've received your request.");
    form.reset();
    setModalOpen(false);
  };

  const allFields = form.watch();
  const isFormEmpty = Object.values(allFields).every((val) =>
    typeof val === "string" ? val.trim() === "" : val === false,
  );

  return (
    <>
      {modalOpen && (
        <Dialog
          open={modalOpen}
          onOpenChange={(e) => {
            setModalOpen(e), form.reset();
          }}
        >
          <DialogContent className="max-[600px]:w-[calc(100%-20px)]">
            <DialogHeader className="pt-[10px]">
              <DialogTitle className="text-[24px] leading-normal min-[1024px]:w-[70%]">
                Contact us to Register Your Interest to Join
              </DialogTitle>
            </DialogHeader>
            <div className="scrollbar-custom max-h-[calc(100vh-150px)] space-y-3 overflow-y-auto pr-4 min-[992px]:h-auto min-[992px]:max-h-[450px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-[400] text-[#656B89] ">
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
                        <FormItem>
                          <FormLabel className="font-[400] text-[#656B89] ">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Email Address"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="phone"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className={cn(
                              "font-[400] text-[#656B89] ",
                              !!form.formState.errors.phone && "text-[#EF4848]",
                            )}
                          >
                            Phone
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="Enter Phone"
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
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-[400] text-[#656B89] ">
                            Specialization
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Specialization"
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[400] text-[#656B89] ">
                          Clinic Address
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-[400] text-[#656B89] ">
                            City
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-[400] text-[#656B89] ">
                            Zip Code
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Zip Code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="state_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[400] text-[#656B89] ">
                          State
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-auto rounded-[8px] py-[15px] ">
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper">
                            <SelectGroup className="overflow-y-auto">
                              {stateData.map((item: any) => (
                                <SelectItem
                                  key={item.id}
                                  value={String(item.id)}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="license"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[400] text-[#656B89] ">
                          License Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter License Number"
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
                    className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  >
                    {form.formState.isSubmitting && (
                      <LoaderCircle className="mr-2 animate-spin" />
                    )}{" "}
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <div onClick={handleClick}>{children}</div>
    </>
  );
};

export default ContactForm;
