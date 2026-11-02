import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { parse } from "date-fns";
import { Clock } from "lucide-react";
import { Button } from "../ui/button";

interface TimePickerPopoverProps {
  value: string;
  placeholder?: string;
  onChange: (type: "hour" | "minute" | "ampm", value: string) => void;
  disabled?: boolean;
}

export function TimePickerPopover({
  value,
  placeholder,
  onChange,
  disabled = false,
}: TimePickerPopoverProps) {
  let hours = 12;
  let minutes = 0;
  let ampm = "am"; // Default to lowercase

  try {
    const timeDate = parse(value, "h:mm a", new Date());
    hours = timeDate.getHours();
    minutes = timeDate.getMinutes();
    ampm = hours >= 12 ? "pm" : "am"; // Convert to lowercase
    hours = hours % 12 || 12;
  } catch (error) {
    console.error("Error parsing time:", error);
  }

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "!h-auto w-auto gap-2 rounded-[12px] border border-[#E1E1F3] bg-[#FBFBFF] px-[15px] py-[18px] text-left font-normal min-[768px]:w-[150px]",
            disabled && "cursor-not-allowed opacity-50",
          )}
          disabled={disabled}
        >
          {value || placeholder}
          <Clock className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col divide-y max-[600px]:w-[250px] max-[600px]:overflow-x-auto sm:h-[250px] sm:flex-row sm:divide-x sm:divide-y-0">
          {/* Hours */}
          <ScrollArea className="w-full sm:w-auto">
            <div className="flex p-2 sm:flex-col">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                <Button
                  key={hour}
                  size="icon"
                  variant={hours === hour ? "default" : "ghost"}
                  className="aspect-square shrink-0 sm:w-full"
                  onClick={() => onChange("hour", hour.toString())}
                >
                  {hour}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>

          {/* Minutes */}
          <ScrollArea className="w-full sm:w-auto">
            <div className="flex p-2 sm:flex-col">
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <Button
                  key={minute}
                  size="icon"
                  variant={minutes === minute ? "default" : "ghost"}
                  className="aspect-square shrink-0 sm:w-full"
                  onClick={() =>
                    onChange("minute", minute.toString().padStart(2, "0"))
                  }
                >
                  {minute.toString().padStart(2, "0")}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>

          {/* AM/PM */}
          <ScrollArea className="w-full sm:w-auto">
            <div className="flex p-2 sm:flex-col">
              {["am", "pm"].map(
                (
                  period, // Use lowercase "am" and "pm"
                ) => (
                  <Button
                    key={period}
                    size="icon"
                    variant={ampm === period ? "default" : "ghost"}
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => onChange("ampm", period)}
                  >
                    {period} {/* Display lowercase */}
                  </Button>
                ),
              )}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
