"use client";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { GetUser } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { AddUserDialog } from "./add-user-dialog";
import DeleteUser from "./delete-user";

interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  user: any;
}

function UsersList({
  users,
  specialties,
  services_data,
  session,
  doctorClinic,
  myData,
}: {
  users: any;
  specialties: any;
  services_data: any;
  session: any;
  doctorClinic: any;
  myData: any;
}) {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const handleEditUser = async (user: User) => {
    const { error, data } = await GetUser(user?.user?.uid);
    if (error) {
      console.warn("Failed to fetch user:", error);
    }
    setSelectedUser(data?.user);
    setOpen(true);
  };
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user?.user);
    setDeleteOpen(true);
  };

  const getRoletext = (role: string) => {
    if (role === "Staff") {
      return "Clinical Team";
    } else if (role === "Doctor") {
      return "Practitioner";
    }
  };
  return (
    <div>
      {users && users?.length === 0 ? (
        <>
          {doctorClinic?.doctor_clinic?.is_admin === true && (
            <div className="flex flex-col items-center justify-center">
              <p className="mb-4 text-lg text-gray-500">
                You haven't added any users. Please add a user.
              </p>
              <div className="inline-block w-[300px]">
                <AddUserDialog
                  specialties={specialties}
                  services_data={services_data}
                  // serviceCategory={serviceCategory}
                  users={users}
                  selectedUser={selectedUser}
                  setOpen={setOpen}
                  open={open}
                  setSelectedUser={setSelectedUser}
                  session={session}
                  myData={myData}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {users?.map((user: any) => (
              <Card key={user.id} className="overflow-hidden">
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
                            onClick={() => handleEditUser(user)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-destructive w-full justify-start"
                            size="sm"
                            onClick={() => handleDeleteUser(user)}
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
                  <div className="relative mb-1 flex items-center justify-center overflow-hidden rounded-full">
                    <div className="h-[120px] w-[120px]">
                      <Image
                        src={
                          user?.user?.avatar &&
                          user?.user?.avatar.startsWith("http")
                            ? user?.user?.avatar
                            : "/img/dummy-new.png"
                        }
                        alt={user?.user?.name || "User Avatar"}
                        width={100}
                        height={100}
                        className="h-full w-full rounded-full border border-[#e2e8f0] object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-primary text-limit-x mb-1 text-[18px] font-semibold text-[#343462] ">
                    {user?.user?.name}
                  </h3>
                  <p className="text-muted-foreground text-[15px] text-[#686868]">
                    {getRoletext(user?.role)}
                  </p>
                </CardContent>
              </Card>
            ))}
            <AddUserDialog
              specialties={specialties}
              services_data={services_data}
              // serviceCategory={serviceCategory}
              users={users}
              selectedUser={selectedUser}
              setOpen={setOpen}
              open={open}
              setSelectedUser={setSelectedUser}
              session={session}
              myData={myData}
            />
            <DeleteUser
              selectedUser={selectedUser}
              setDeleteOpen={setDeleteOpen}
              deleteOpen={deleteOpen}
              message="Delete User"
              desc="Are you sure  you want to delete this user?"
              hasButton
            />
          </div>
        </>
      )}
    </div>
  );
}

export default UsersList;
