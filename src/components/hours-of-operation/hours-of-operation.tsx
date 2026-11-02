"use client";

import { putClinicHours } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { HoursOfOperationSchema } from "@/schema/hours-operation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { TimePickerPopover } from "./time-picker";

interface ConditionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  MyData: any;
}

const defaultHours = [
  { day: "Monday", enabled: false, openTime: "", closeTime: "" },
  { day: "Tuesday", enabled: false, openTime: "", closeTime: "" },
  { day: "Wednesday", enabled: false, openTime: "", closeTime: "" },
  { day: "Thursday", enabled: false, openTime: "", closeTime: "" },
  { day: "Friday", enabled: false, openTime: "", closeTime: "" },
  { day: "Saturday", enabled: false, openTime: "", closeTime: "" },
];

export function HoursOfOperation({
  isOpen,
  onClose,
  MyData,
}: ConditionalModalProps) {
  const router = useRouter();
  const [hours, setHours] = useState(defaultHours);
  // console.log(MyData, "MyData");

  const [validationErrors, setValidationErrors] = useState<
    Record<number, string>
  >({});

  const form = useForm<z.infer<typeof HoursOfOperationSchema>>({
    resolver: zodResolver(HoursOfOperationSchema),
    defaultValues: {
      hours: defaultHours,
    },
  });
  useEffect(() => {
    if (isOpen && MyData?.user?.clinic?.hours_of_operation) {
      const parsedHours = MyData?.user?.clinic?.hours_of_operation.map(
        (hour: string) => JSON.parse(hour),
      );

      const updatedHours = defaultHours.map((day) => {
        const savedHour = parsedHours.find((h: any) => h.day === day.day);
        return savedHour
          ? {
              ...day,
              enabled: true,
              openTime: savedHour.opening,
              closeTime: savedHour.closing,
            }
          : day;
      });

      setHours(updatedHours);
      form.reset({ hours: updatedHours });
    }
  }, [isOpen, MyData, form]);

  const isSaveButtonDisabled = () => {
    const hasEnabledDays = hours.some(
      (day) => day.enabled && day.openTime && day.closeTime,
    );
    if (!hasEnabledDays) return true;
    const hasInvalidTimes = hours.some(
      (day) => day.enabled && (!day.openTime || !day.closeTime),
    );
    return hasInvalidTimes;
  };

  const validateDay = (day: {
    enabled: boolean;
    openTime: string;
    closeTime: string;
  }) => {
    if (!day.enabled) return null;
    // if (!day.openTime || !day.closeTime)
    //   return "Both start and end times are required.";

    try {
      const openTime = parse(day.openTime, "h:mm a", new Date());
      const closeTime = parse(day.closeTime, "h:mm a", new Date());
      if (openTime >= closeTime) {
        return "Closing time must be after opening time.";
      }
      return null;
    } catch (error) {
      console.error("Error parsing time:", error);
      return "Invalid time format.";
    }
  };

  useEffect(() => {
    form.setValue("hours", hours);

    const errors: Record<number, string> = {};
    hours.forEach((day, index) => {
      const error = validateDay(day);
      if (error) {
        errors[index] = error;
      }
    });
    setValidationErrors(errors);
  }, [hours, form]);

  const toggleDay = (index: number) => {
    const updatedHours = [...hours];

    if (updatedHours[index].enabled) {
      updatedHours[index].openTime = "";
      updatedHours[index].closeTime = "";
    }

    updatedHours[index].enabled = !updatedHours[index].enabled;
    setHours(updatedHours);
  };

  const handleTimeChange = (
    index: number,
    type: "openTime" | "closeTime",
    timeType: "hour" | "minute" | "ampm",
    value: string,
  ) => {
    const updatedHours = [...hours];
    const currentTimeStr = updatedHours[index][type] || "12:00 am"; // Default to lowercase

    try {
      const currentTime = parse(currentTimeStr, "h:mm a", new Date());
      const newTime = new Date(currentTime);

      if (timeType === "hour") {
        const hour = Number.parseInt(value, 10);
        const isPM = currentTimeStr.includes("pm"); // Check for lowercase
        newTime.setHours(
          isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour,
        );
      } else if (timeType === "minute") {
        newTime.setMinutes(Number.parseInt(value, 10));
      } else if (timeType === "ampm") {
        const hours = newTime.getHours();
        if (value === "am" && hours >= 12) {
          newTime.setHours(hours - 12);
        } else if (value === "pm" && hours < 12) {
          newTime.setHours(hours + 12);
        }
      }

      // Format the time in lowercase
      updatedHours[index][type] = format(newTime, "h:mm a").toLowerCase();
      setHours(updatedHours);
    } catch (error) {
      console.error("Error parsing time:", error);
    }
  };
  // console.log(MyData?.user?.clinic?.uid, "MyData?.user?.clinic?.uid");
  const onSubmit = async (data: z.infer<typeof HoursOfOperationSchema>) => {
    // console.log(data, "data");
    // console.log(hours, "hours");

    if (Object.keys(validationErrors).length > 0) {
      console.warn("Validation errors exist:", validationErrors);
      return;
    }

    const payload = {
      hours_of_operation: hours
        .filter((day) => day.enabled)
        .map((day) => ({
          day: day.day,
          opening: day.openTime,
          closing: day.closeTime,
        })),
    };
    // console.log(payload, "payload");

    const response = await putClinicHours(MyData?.user?.clinic?.uid, payload);
    // console.log(response, "response putClinicHours");

    if (response.error) {
      toast.error(response.error);
    } else {
      // Hours of operation added successfully
      toast.success("Hours of operation added successfully");
      router.refresh();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-visible !rounded-[16px] max-[600px]:w-[calc(100%-20px)] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="pr-[60px] text-left font-[600] leading-normal text-[#343462] min-[1024px]:text-[25px]">
            Hours of Operation
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="scrollbar-custom max-h-[calc(100vh-150px)] space-y-4 overflow-y-auto pr-4 min-[992px]:h-auto min-[992px]:max-h-[550px]"
          >
            {hours.map((day, index) => (
              <div
                key={day.day}
                className="flex flex-col gap-2 border border-l-0 border-r-0 border-t-0 border-b-[#E1E1F3] pb-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={day.enabled}
                    onCheckedChange={() => toggleDay(index)}
                    id={`day-${index}`}
                    className="h-[23px] w-[23px] rounded-[6px] border border-[#e2e8f0]"
                  />

                  <Label
                    htmlFor={`day-${index}`}
                    className="text-[16px] font-[400]"
                  >
                    {day.day}
                  </Label>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {/* Start Time */}
                    <TimePickerPopover
                      value={day.openTime.toLowerCase()}
                      placeholder="Start Time"
                      onChange={(timeType, value) =>
                        handleTimeChange(index, "openTime", timeType, value)
                      }
                      disabled={!day.enabled}
                    />

                    <span className="mx-1">to</span>

                    {/* End Time */}
                    <TimePickerPopover
                      value={day.closeTime.toLowerCase()}
                      placeholder="End Time"
                      onChange={(timeType, value) =>
                        handleTimeChange(index, "closeTime", timeType, value)
                      }
                      disabled={!day.enabled}
                    />
                  </div>

                  {validationErrors[index] && (
                    <div className="text-sm text-red-500">
                      {validationErrors[index]}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="submit"
              className="mt-4 flex !h-auto w-full items-center gap-2 rounded-[10px] bg-[#7B2199] py-4 text-white hover:bg-purple-700 min-[1024px]:!text-[18px]"
              disabled={isSaveButtonDisabled() || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              )}
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
