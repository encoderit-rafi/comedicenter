"use client";

import { putMyClinic } from "@/actions/clinic-switch.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const clinicSchema = z.object({
  selectedClinic: z.string({ required_error: "Please select a clinic." }),
});

interface ConditionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  MyData: any;
}

export function SwitchToClinic({
  isOpen,
  onClose,
  MyData,
}: ConditionalModalProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof clinicSchema>>({
    defaultValues: {
      selectedClinic: MyData?.user?.clinic_id || "",
    },
  });

  const handleClinicChange = (value: string) => {
    // console.log(value, "handleClinicChange");
    form.setValue("selectedClinic", value);
  };
  const onSubmit = async (data: z.infer<typeof clinicSchema>) => {
    await putMyClinic(data.selectedClinic);
    router.refresh();
    onClose();
  };
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-backdrop") {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {isOpen && (
        <div id="modal-backdrop" onClick={handleBackdropClick}>
          <DialogContent
            className="overflow-hidden !rounded-[16px] max-[600px]:w-[calc(100%-20px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <DialogHeader>
              <DialogTitle className="pr-[60px] text-left font-[700] leading-normal min-[1024px]:text-[22px]">
                Choose your clinic
              </DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="clinic scrollbar-custom mt-[30px] flex max-h-[calc(100vh-150px)] flex-col space-y-3 overflow-y-auto pr-4 min-[992px]:h-auto min-[992px]:max-h-[550px]"
                  >
                    <FormField
                      control={form.control}
                      name="selectedClinic"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={handleClinicChange}
                              value={field.value}
                              className="ml-auto"
                            >
                              {MyData?.user?.doctor_clinics?.map(
                                (item: any) => (
                                  <label
                                    key={item?.clinic?.id}
                                    className={`clinic_item flex w-full cursor-pointer  items-center justify-between rounded-none border border-l-0 border-r-0 border-t-0 border-b-[#dcdcdc] p-3 py-[10px] transition-all duration-200`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="relative block h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-full border border-gray-300">
                                        <Image
                                          src={
                                            item?.clinic?.avatar ||
                                            "/img/default-image-new.png"
                                          }
                                          alt="Clinic Avatar"
                                          width={50}
                                          height={50}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                          {item?.clinic?.name || "N/A"}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                          {item?.clinic?.location?.address}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="relative">
                                      <RadioGroupItem
                                        value={item?.clinic?.id}
                                        className="sr-only"
                                      />
                                      <div
                                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                                          field.value === item?.clinic?.id
                                            ? "border-purple-700 bg-purple-700 text-white"
                                            : "border-gray-400"
                                        }`}
                                      >
                                        {field.value === item?.clinic?.id && (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        )}
                                      </div>
                                    </div>
                                  </label>
                                ),
                              )}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="mt-4 flex !h-auto w-full items-center gap-2 rounded-[10px] bg-[#7B2199] py-4 text-white hover:bg-purple-700 min-[1024px]:!text-[18px]"
                      disabled={form.formState.isSubmitting}
                    >
                      <span>
                        {form.formState.isSubmitting && (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          </>
                        )}
                      </span>
                      Apply
                    </Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
}
