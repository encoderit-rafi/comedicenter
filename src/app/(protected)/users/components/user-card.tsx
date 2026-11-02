import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import Image from "next/image";

interface UserCardProps {
  name: string;
  imageUrl: string;
  timestamp: string;
}

export function UserCard({ name, imageUrl, timestamp }: UserCardProps) {
  const formattedDate = timestamp
    ? format(new Date(timestamp), "MM/dd/yyyy hh:mma")
    : "N/A";
  return (
    <Card className="w-full shadow-none">
      <CardContent className="flex items-center gap-4 p-4">
        <div>
          <div className="overflow-hidden rounded-full">
            <Image
              src="/img/profile.jpg"
              alt="user"
              width={80}
              height={80}
              className="h-[80px] w-[80px] object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-[17px] text-lg font-[600] text-[#34373C]">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-[14px] text-sm font-[400] text-[#767F88]">
            <Clock className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
