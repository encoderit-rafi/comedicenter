"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { getServiceCat } from "@/actions/admin.clinic.action";
import {
  handleFileUpload,
  postCreateUser,
  postUpdateUser,
} from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, formatPhone } from "@/lib/utils";
import { createUserSchema } from "@/schema/auth.schema";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConditionalModal } from "./conditional-popup";

type FormValues = z.infer<typeof createUserSchema>;

interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface AddUserDialogProps {
  users: any;
  specialties: any;
  // serviceCategory: any;
  services_data: any;
  selectedUser: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  setSelectedUser: (user: User | null) => void;
  session: any;
  myData: any;
}

export function AddUserDialog({
  specialties,
  // serviceCategory,
  services_data,
  users,
  selectedUser,
  open,
  setOpen,
  setSelectedUser,
  session,
  myData,
}: AddUserDialogProps) {
  // console.log(services_data, "services_data");
  const [selectedServiceUid, setSelectedServiceUid] = useState<string>("");
  // setServiceCategory
  const [serviceCategories, setServiceCategories] = useState<any[]>([]);
  const [showConditionalModal, setShowConditionalModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState<any>();
  const [avatarPreview, setAvatarPreview] = useState<string | null>("");
  const refFileInput = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string | "">(
    selectedUser?.role || "Doctor",
  );
  const [loadingToastId, setLoadingToastId] = useState<string | number | null>(
    null,
  );

  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: selectedUser?.role || "Doctor",
      speciality_uid: "",
      service_uid: "",
      service_category_uid: "",
      license: "",
      avatar: "",
    },
  });
  const { watch, reset, formState } = form;

  const allFields = watch();
  const isFormEmpty = Object.values(allFields).every((val) =>
    typeof val === "string" ? val.trim() === "" : val === false,
  );
  // console.log(selectedUser, "selectedUser");
  useEffect(() => {
    if (selectedUser) {
      const resetValues = {
        name: selectedUser?.name || "",
        email: selectedUser?.email || "",
        phone: formatPhone(selectedUser?.phone || ""),
        role: selectedUser?.role || "Doctor",
        speciality_uid:
          selectedUser?.role === "Doctor"
            ? selectedUser?.practice?.specialty?.uid
            : "",
        service_uid:
          selectedUser?.role === "Doctor"
            ? selectedUser?.practice?.service?.id.toString()
            : "",
        service_category_uid:
          selectedUser?.role === "Doctor"
            ? selectedUser?.practice?.service_category?.uid.toString()
            : "",
        license: selectedUser?.role === "Doctor" ? selectedUser?.license : "",
        avatar: selectedUser?.avatar || "",
      };

      form.reset(resetValues);
      setAvatarPreview(selectedUser?.avatar || "");
      setSelectedRole(selectedUser?.role || "Doctor");

      if (
        selectedUser?.role === "Doctor" &&
        selectedUser?.practice?.service?.id
      ) {
        const serviceId = selectedUser?.practice?.service?.id.toString();
        setSelectedServiceUid(selectedUser?.practice?.service?.uid);

        getServiceCat("service_category", serviceId).then(
          (serviceCategoryData) => {
            setServiceCategories(
              serviceCategoryData?.data?.service_categories || [],
            );
          },
        );
      }
    }
  }, [selectedUser, form]);

  const handleCloseConditionalModal = () => {
    setShowConditionalModal(false);
    setOpen(true);
  };

  const handleClose = (isOpen: boolean) => {
    toast.dismiss();
    if (!isOpen) {
      if (abortController) {
        abortController.abort();
        setAbortController(null);
      }

      if (loadingToastId !== null) {
        toast.dismiss(loadingToastId);
        setLoadingToastId(null);
      }

      form.reset();
      setAvatarPreview(null);
      router.refresh();
    }
    setOpen(isOpen);
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const controller = new AbortController();
      setAbortController(controller);
      try {
        const validFileTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validFileTypes.includes(files[0].type)) {
          throw new Error("Invalid image format");
        }
        const toastId = toast.loading("Uploading...");
        setLoadingToastId(toastId);
        const options = {
          maxSizeMB: 0.4,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(files[0], options);

        const uniqueString = Date.now().toString();
        const modifiedFileName = `uploads/${uniqueString}_${compressedFile.name}`;
        const { data: signedUrl, error } =
          await handleFileUpload(modifiedFileName);

        if (error || !signedUrl?.data) {
          throw new Error("Error getting signed URL");
        }

        const url = signedUrl.data[modifiedFileName];
        const response = await fetch(url, {
          method: "PUT",
          body: compressedFile,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Image upload failed");
        }

        const uploadedUrl = url.split("?")[0];
        setAvatarPreview(uploadedUrl);
        form.setValue("avatar", uploadedUrl);
        toast.dismiss(toastId);
        toast.success("Image uploaded successfully");
      } catch (error: any) {
        if (error.name === "AbortError") {
          toast.error("Image upload cancelled");
        } else {
          toast.error(error.message || "An error occurred during file upload");
        }
      } finally {
        if (loadingToastId !== null) {
          toast.dismiss(loadingToastId);
          setLoadingToastId(null);
        }

        setAbortController(null);

        if (refFileInput.current) {
          refFileInput.current.value = "";
        }
      }
    }
  };
  // console.log(selectedServiceUid, "selectedServiceUid");

  const handleServiceChange = async (value: string) => {
    form.clearErrors("service_uid");
    const selectedService = services_data?.services.find((item: any) => {
      return item.id.toString() === value.toString();
    });

    if (selectedService) {
      const { uid } = selectedService;
      setSelectedServiceUid(uid);
    } else {
      console.log("No matching service found.");
    }

    form.setValue("service_uid", value);
    form.setValue("service_category_uid", "");
    const serviceCategoryData = await getServiceCat("service_category", value);
    setServiceCategories(serviceCategoryData?.data?.service_categories || []);
  };
  // console.log(
  //   "services_data",
  //   services_data?.services,
  //   "serviceCategories",
  //   serviceCategories,
  // );
  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);

      let res;
      if (!!selectedUser) {
        res = await postUpdateUser(data, selectedUser?.uid, selectedServiceUid);
        // console.log(res, "postUpdateUser");
        if (res?.is_exist === true) {
          // toast.error(res.message);
          setOpen(false);
          setResponseMessage(res);
          setShowConditionalModal(true);
          return;
        }
      } else {
        res = await postCreateUser(data, selectedServiceUid);
        if (
          res.message ===
          "This practitioner is already associated with another clinic."
        ) {
          // toast.error(res.message);
          setOpen(false);
          setResponseMessage(res);
          setShowConditionalModal(true);
          return;
        }
        // console.log(res, "postCreateUser");
      }

      if (res.error) {
        if (res.message === "Email address is already in use.") {
          form.setError("email", {
            type: "manual",
            message: res.message,
          });
        } else {
          toast.error(res.message || "An error occurred.");
        }
        setIsSubmitting(false);
        return;
      }
      toast.success(
        selectedUser?.uid
          ? "User updated successfully!"
          : "User created successfully!",
      );
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast.error(
        error?.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // const filtertedServiceCate = useMemo(() => {
  //   const sCat = serviceCategory?.service_categories;
  //   if (selectedServiceUid) {
  //     const serviseID = services_data?.services.find(
  //       (s: any) => s.uid == selectedServiceUid,
  //     ).id;
  //     return sCat.filter((s: any) => s.service_id == serviseID);
  //   }
  //   return sCat;
  // }, [selectedServiceUid]);

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogTrigger asChild>
          <div className="min-h-[250px] cursor-pointer">
            <div
              className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-6 hover:border-gray-300"
              onClick={() => {
                form.reset({
                  name: "",
                  email: "",
                  phone: "",
                  role: "Doctor",
                  speciality_uid: "",
                  service_uid: "",
                  service_category_uid: "",
                  license: "",
                  avatar: "",
                });
                setSelectedUser(null);
                setAvatarPreview("");
                setSelectedRole("Doctor");
                setOpen(true);
              }}
            >
              <div className="mb-1 h-[120px] w-[120px] rounded-full">
                <Image
                  src={"/img/add-user.svg"}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="mt-1 text-lg font-medium text-[#92278F]">
                Add User
              </span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent
          onEscapeKeyDown={(e: any) => e.preventDefault()}
          onPointerDownOutside={(e: any) => e.preventDefault()}
          onInteractOutside={(e: any) => e.preventDefault()}
          className="!rounded-[30px] max-[600px]:w-[calc(100%-20px)] sm:max-w-[700px]"
        >
          <DialogHeader>
            <DialogTitle className="text-left min-[1024px]:text-[22px]">
              {!!selectedUser && selectedUser?.uid ? "Edit User" : "Add User"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="scrollbar-custom max-h-[calc(100vh-150px)] space-y-3 overflow-y-auto pr-4 min-[992px]:h-auto min-[992px]:max-h-[550px]"
            >
              <div className="flex justify-center">
                <div className="relative">
                  <div className="relative h-24 w-24 overflow-hidden rounded-full">
                    <Image
                      src={avatarPreview ? avatarPreview : "/img/dummy-new.png"}
                      alt="Profile"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <label className="absolute bottom-0 right-0 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white">
                    <Image
                      src={"/img/camera.svg"}
                      alt="Profile"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={refFileInput}
                      onChange={onFileChange}
                    />
                  </label>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="grid grid-cols-1 gap-4 min-[650px]:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[400] text-[#656B89]">
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
                        <FormLabel className="font-[400] text-[#656B89]">
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
                </div>

                <div className="grid grid-cols-1 gap-4 min-[650px]:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[400] text-[#656B89]">
                          Phone
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="Enter Phone Number"
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
                    name="role"
                    render={({ field }) => (
                      <FormItem className="role-select space-y-3">
                        <FormLabel className="font-[400] text-[#656B89]">
                          Select Role
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              if (value === "Doctor") {
                                form.reset({
                                  ...form.getValues(),
                                  role: value || "",
                                  speciality_uid:
                                    selectedUser?.role === "Doctor"
                                      ? selectedUser?.practice?.specialty?.uid
                                      : "",
                                  service_uid:
                                    selectedUser?.role === "Doctor"
                                      ? selectedUser?.practice?.service?.id.toString()
                                      : "",
                                  service_category_uid:
                                    selectedUser?.role === "Doctor"
                                      ? selectedUser?.practice?.service_category
                                          ?.uid
                                      : "",
                                  license:
                                    selectedUser?.role === "Doctor"
                                      ? selectedUser?.license
                                      : "",
                                });
                                field.onChange(value);
                                setSelectedRole(value);
                              } else if (value === "Staff") {
                                form.reset({
                                  ...form.getValues(),
                                  role: value || "",
                                  speciality_uid: "",
                                  service_uid: "",
                                  service_category_uid: "",
                                  license: "",
                                });
                                field.onChange(value);
                                setSelectedRole(value);
                              }
                            }}
                            value={selectedRole}
                            className="radio-check-me flex min-h-[35px] gap-6"
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem
                                value="Doctor"
                                id="practitioner"
                                className="RadioGroupItem"
                              />
                              <Label
                                htmlFor="practitioner"
                                className="text-base font-normal"
                              >
                                Practitioner
                              </Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <RadioGroupItem
                                value="Staff"
                                id="clinical-team"
                                className="RadioGroupItem"
                              />
                              <Label
                                htmlFor="clinical-team"
                                className="text-base font-normal"
                              >
                                Clinical Team
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {selectedRole === "Doctor" && (
                  <>
                    {
                      <FormField
                        control={form.control}
                        name="speciality_uid"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[400] text-[#656B89]">
                              Specialization
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-auto rounded-[8px] py-[15px] ">
                                  <SelectValue placeholder="Select Specilization" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {specialties?.specialties?.map(
                                  (specialty: any) => (
                                    <SelectItem
                                      key={specialty.uid}
                                      value={specialty.uid}
                                    >
                                      {specialty.name}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    }

                    <div className="grid grid-cols-1 gap-4 min-[650px]:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="service_uid"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[400] text-[#656B89]">
                              Service Category
                            </FormLabel>
                            <Select
                              onValueChange={handleServiceChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-auto rounded-[8px] py-[15px]">
                                  <SelectValue placeholder="Select Service Category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services_data?.services?.map(
                                  (service_item: any, index: number) => (
                                    <SelectItem
                                      key={index}
                                      // field.value
                                      value={service_item.id.toString()}
                                    >
                                      {service_item.name}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service_category_uid"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-[400] text-[#656B89]">
                              Service
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={!form.getValues("service_uid")}
                            >
                              <FormControl>
                                <SelectTrigger className="h-auto rounded-[8px] py-[15px]">
                                  <SelectValue placeholder="Select Service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceCategories?.map(
                                  (service_item: any, index: number) => (
                                    <SelectItem
                                      key={index}
                                      value={service_item.uid.toString()}
                                    >
                                      {service_item.name}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="license"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-[400] text-[#656B89]">
                            License Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123LDS5505"
                              {...field}
                              maxLength={20}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              <div className="flex justify-end min-[400px]:pl-[20px]">
                <Button
                  type="submit"
                  className="flex !h-auto w-full gap-2 bg-[#7B2199] px-[100px] py-[18px] hover:bg-purple-700 min-[400px]:!w-1/2"
                  disabled={isFormEmpty || form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  )}
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {showConditionalModal && (
        <ConditionalModal
          setShowConditionalModal={setShowConditionalModal}
          isOpen={showConditionalModal}
          onClose={handleCloseConditionalModal}
          res={responseMessage}
          myData={myData}
          setOpen={setOpen}
          selectedUser={selectedUser}
        />
      )}
    </>
  );
}
