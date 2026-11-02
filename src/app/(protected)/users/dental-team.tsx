import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "David Brown",
    role: "Dental Practitioner",
    imageUrl: "/img/profile.png",
  },
  {
    id: "2",
    name: "John Doe",
    role: "Dental Practitioner",
    imageUrl: "/img/profile.png",
  },
  {
    id: "3",
    name: "Mary Parker",
    role: "Dental Practitioner",
    imageUrl: "/img/profile.png",
  },
];

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="flex items-center justify-end p-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      aria-label="Open menu"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40" align="end">
                    <div className="grid gap-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        size="sm"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-destructive w-full justify-start"
                        size="sm"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-6">
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-primary mb-1 text-lg font-semibold">
                {member.name}
              </h3>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </CardContent>
          </Card>
        ))}
        {/* <AddUserDialog /> */}
      </div>
    </div>
  );
}
