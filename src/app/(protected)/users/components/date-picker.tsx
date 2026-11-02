import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";

interface DatePickerProps {
  placeholder?: string;
  value?: Date;
  onChange: (date?: Date) => void;
  disabled?: (date: Date) => boolean; // Add disabled prop
}

export function DatePicker({
  placeholder,
  value,
  onChange,
  disabled,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "!min-h-[54px] justify-between gap-[10px] rounded-[11px] bg-[#FBFBFF] text-left font-normal min-[1200px]:w-[230px]",
            !value && "text-muted-foreground",
          )}
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}

          <span className="flex-1">
            {value ? format(value, "PPP") : placeholder}
          </span>
          <span className="h-[20px] w-[20px]">
            <Image
              src="/img/calendar.svg"
              alt="affordable"
              width={50}
              height={50}
              className="h-[20px] w-[20px] object-contain "
            />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}
