"use client";
import { putSubscriptionMembers } from "@/actions/subscription.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, errorToast } from "@/lib/utils";
import { addMemberSchema } from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  EllipsisVertical,
  LoaderCircle,
  Pencil,
  PlusIcon,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const MembersModal = ({
  children,
  members,
  subUid,
  isExpired,
  planName,
  isMembers,
  membersLimit,
}: {
  children: React.ReactNode;
  members: any[];
  subUid: string;
  isExpired: boolean;
  isMembers: boolean;
  planName: string;
  membersLimit: number;
}) => {
  const [shouldShowForm, setShouldShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number>(-1);
  const [show, setShow] = useState<boolean>(false);
  const [showAddButton, setShowAddButton] = useState<boolean>(
    members?.length < membersLimit && isMembers && !isExpired,
  );
  let updatedMembersList: any[] = [];
  const form = useForm({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof addMemberSchema>) => {
    try {
      let payload = { members_data: [...updatedMembersList, data] };
      if (selectedIndex !== -1) {
        updatedMembersList[selectedIndex] = data;
        payload = { members_data: updatedMembersList };
      }
      const res = await putSubscriptionMembers(subUid, payload);
      if (res?.error) throw new Error(res?.error);
      form.reset();
      console.log(selectedIndex);

      if (members?.length + 1 === membersLimit && selectedIndex === -1)
        setShowAddButton(false);
      setSelectedIndex(-1);
      setShouldShowForm(!shouldShowForm);
    } catch (error) {
      errorToast(error);
    }
  };

  const handleEdit = (index: number, name: string) => {
    setSelectedIndex(index), form.reset({ name });
    setShouldShowForm(true);
    setOpenDropdownIndex(-1);
  };

  const handleDelete = async (index: number) => {
    setLoading(true);
    try {
      updatedMembersList.splice(index, 1);
      let payload = { members_data: updatedMembersList };
      const res = await putSubscriptionMembers(subUid, payload);
      if (res?.error) throw new Error(res?.error);
      if (res?.data) {
        setLoading(false);
        setOpenDropdownIndex(-1);
        setShowAddButton(true);
      }
    } catch (error) {
      setLoading(false);
      errorToast(error);
    }
  };
  return (
    <Dialog
      open={show}
      onOpenChange={(e) => {
        setShow(e);
        setShouldShowForm(false);
        form.reset();
        setSelectedIndex(-1);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" w-full !rounded-[30px] !p-0  sm:max-w-[50%] xl:max-w-[30%] ">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-left text-[18px] font-[600] text-[#343462] md:text-[22px]">
            Members{members?.length > 0 && `(${members?.length})`}
          </DialogTitle>
          <div className="scrollbar-custom max-h-[50vh] overflow-y-auto">
            {members.map((_item: string, index: number) => {
              const item = JSON.parse(_item);
              updatedMembersList.push(item);

              return (
                <div
                  key={index}
                  className={cn(
                    "mr-2 flex max-w-full justify-between overflow-hidden border-b",
                  )}
                >
                  <p
                    className={cn(
                      "my-2 max-w-[90%] truncate text-wrap",
                      planName === "Family Smile Plan" &&
                        index === 0 &&
                        "flex w-full max-w-full justify-between",
                    )}
                  >
                    {item?.name}{" "}
                    {planName === "Family Smile Plan" && index === 0 && (
                      <span className="self-end rounded-lg bg-[#1C75BC]/20 px-3 text-xs text-[#1C75BC]">
                        Primary Member
                      </span>
                    )}
                  </p>
                  {planName !== "Family Smile Plan" && (
                    <DropdownMenu
                      onOpenChange={(isOpen) =>
                        setOpenDropdownIndex(isOpen ? index : -1)
                      }
                      open={openDropdownIndex === index}
                    >
                      <DropdownMenuTrigger>
                        {" "}
                        <EllipsisVertical className="h-5 w-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="mr-36">
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleEdit(index, item?.name)}
                        >
                          <Pencil /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleDelete(index)}
                        >
                          {loading && (
                            <LoaderCircle className="mr-2 animate-spin" />
                          )}{" "}
                          <Trash2 /> Delete
                        </DropdownMenuItem>{" "}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              );
            })}
          </div>
        </DialogHeader>
        <DialogFooter
          className={cn(
            " px-6 pb-6 sm:rounded-b-3xl",
            shouldShowForm && "bg-gray-100",
          )}
        >
          <div className=" flex w-full justify-end pt-[10px]">
            {shouldShowForm ? (
              <div className="w-full ">
                <Label className="font-[400] text-[#656B89]">
                  {selectedIndex !== -1 ? "Update" : "Add"} Member
                </Label>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex w-full gap-2 space-y-2"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="h-inherit w-full min-[768px]:flex-1">
                          <FormControl>
                            <Input
                              className=" h-full !px-[20px] !py-[15px] text-black"
                              placeholder="Member Name"
                              {...field}
                              maxLength={50}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      autoFocus
                      className="!mt-0 h-full bg-[#7B2199] !px-[30px] py-[18px] text-white hover:bg-purple-700"
                    >
                      {" "}
                      {form.formState.isSubmitting && (
                        <LoaderCircle className="mr-2 animate-spin" />
                      )}{" "}
                      {selectedIndex !== -1 ? "Save" : "Add"}{" "}
                    </Button>
                  </form>
                  {form.formState.errors.name && (
                    <span className="text-sm text-red-500">
                      {form.formState.errors.name?.message}
                    </span>
                  )}
                </Form>
              </div>
            ) : showAddButton ? (
              <div
                className="flex cursor-pointer gap-1 text-[#1C75BC]"
                onClick={() => {
                  form.reset({ name: "" });
                  setShouldShowForm(!shouldShowForm);
                }}
              >
                <PlusIcon />
                <span>Add New Member</span>
              </div>
            ) : (
              <></>
            )}{" "}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
