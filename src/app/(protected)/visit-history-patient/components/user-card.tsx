import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Image from "next/image";

interface UserCardProps {
  name: string;
  imageUrl: string;
  timestamp: string;
  role: string;
}

export function UserCard({ name, imageUrl, timestamp, role }: UserCardProps) {
  // console.log(timestamp, "timestampxxxx");

  return (
    <Card className="w-full shadow-none">
      <CardContent className="flex items-center gap-4 p-4">
        <div>
          <div className="overflow-hidden rounded-full">
            <Image
              src={imageUrl || "/img/dummy-new.png"}
              alt="user"
              width={80}
              height={80}
              className="h-[80px] w-[80px] object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="py-[5px] text-[#1565C0]">
            {role === "Doctor" ? "Practitioner" : " Clinical Team "}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{timestamp}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
