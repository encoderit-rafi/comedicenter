"use client";

import {
  handleFileUpload,
  postEditProfile,
  postProfileEmailUpdate,
} from "@/actions/auth.action";
import { useAppContext } from "@/components/context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, errorToast, FileValidation, formatPhone } from "@/lib/utils";
import { editProfileSchema } from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import imageCompression from "browser-image-compression";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export function EditForm({
  session_name,
  session_email,
  session_phone,
  session_avatar,
}: {
  session_name: string;
  session_email: string;
  session_phone: string | null;
  session_avatar?: string | null;
}) {
  const router = useRouter();
  const originalEmail = session_email;
  const { update } = useSession();
  const { setProfileData } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    session_avatar || null,
  );
  const refFileInput = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [imageKey, setImageKey] = useState<number>(0);

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: session_name || "",
      email: session_email || "",
      phone: formatPhone(session_phone || ""),
      avatar: avatarPreview || null,
    },
  });
  const { watch, reset, formState } = form;
  const allFields = watch();
  const isFormEmpty = Object.values(allFields).every((val) =>
    typeof val === "string" ? val.trim() === "" : val === false,
  );
  const handleFile = async (file: File) => {
    const { error, message } = FileValidation(file, 2, [
      "image/jpeg",
      "image/png",
    ]);
    if (error) {
      errorToast(message);
      form.setError("avatar", { type: "manual", message });
      return;
    }

    try {
      const options = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      setPhoto(compressedFile);
      setAvatarPreview(URL.createObjectURL(compressedFile));
      form.setValue("avatar", compressedFile.name);
      form.trigger("avatar");
      setImageKey((prevKey) => prevKey + 1);
    } catch (err: any) {
      toast.error("Error compressing image: " + err.message);
    }
  };

  async function handleSubmit(formData: z.infer<typeof editProfileSchema>) {
    setLoading(true);
    let uploadedUrl = avatarPreview;

    if (photo) {
      // toast.loading("Uploading image...");
      const uniqueString = Date.now().toString();
      const modifiedFileName = `uploads/${uniqueString}_${photo.name}`;

      const { data: signedUrl, error } =
        await handleFileUpload(modifiedFileName);
      if (error || !signedUrl?.data) {
        toast.dismiss();
        toast.error("Error getting signed URL");
        setLoading(false);
        return;
      }

      const url = signedUrl.data[modifiedFileName];
      const uploadResponse = await fetch(url, { method: "PUT", body: photo });

      if (!uploadResponse.ok) {
        toast.dismiss();
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }

      uploadedUrl = url.split("?")[0];
      // toast.dismiss();
      // if(avatarPreview !== session_avatar)
      // {
      //   toast.success("Image uploaded successfully");
      // }
    }

    try {
      if (originalEmail !== formData.email) {
        const payload = {
          name: formData.name || "",
          email: formData.email || "",
          phone: formData.phone.replace(/\D/g, "") || "",
          avatar: uploadedUrl || "", // Ensure avatar is always a string
        };
        setProfileData(payload);
        const response = await postProfileEmailUpdate({
          email: formData.email,
        });
        if (response.error) throw new Error(response.error);
        toast.success("A verification code has been sent to your email");
        router.push(
          `/auth/email-verification?session_id=${response?.data?.session_id}`,
        );
      } else {
        const payload = {
          name: formData.name || "",
          email: formData.email || "",
          phone: formData.phone.replace(/\D/g, "").slice(-10) || "",
          avatar: uploadedUrl || "", // Ensure avatar is always a string
        };

        const res = await postEditProfile(payload);

        if (
          res?.error ||
          (res?.statusCode !== undefined && res.statusCode >= 400)
        ) {
          toast.error(res.message || "An error occurred.");
          return;
        }

        await update({ ...payload });
        toast.success("Profile updated successfully");
        router.replace(`/profile`);
      }
    } catch (error) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="relative z-0">
        <div className="relative h-[150px] w-full">
          <span className="absolute left-0 top-0 z-[9] h-full w-full backdrop-blur-[15px]"></span>
          <Image
            src={avatarPreview ? avatarPreview : "/img/dummy-new.png"}
            alt="Dr. Richard Hong"
            width={200}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute -bottom-14 left-1/2 z-40 -translate-x-1/2">
          <div className="relative">
            <div className="h-[140px] w-[140px] ">
              <Image
                // src={avatarPreview ? avatarPreview : "/img/dummy-new.png"}
                key={imageKey}
                src={
                  avatarPreview?.startsWith("http") ||
                  avatarPreview?.startsWith("blob:")
                    ? avatarPreview
                    : "/img/dummy-new.png"
                }
                alt="Profile picture"
                width={200}
                height={200}
                quality={50}
                className="w-ful h-full rounded-full bg-white object-cover p-[5px]"
              />
            </div>
            <label className="absolute bottom-0 right-0 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white">
              <div>
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.32619 11.8257C10.7275 11.8257 11.8636 10.6523 11.8636 9.20486C11.8636 7.75739 10.7275 6.58398 9.32619 6.58398C7.92484 6.58398 6.78882 7.75739 6.78882 9.20486C6.78882 10.6523 7.92484 11.8257 9.32619 11.8257Z"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    opacity="0.63"
                    d="M7.63464 15.3204H11.0178C13.3935 15.3204 14.5815 15.3204 15.4348 14.7315C15.8041 14.4765 16.1213 14.1489 16.3682 13.7674C16.9383 12.886 16.9383 11.659 16.9383 9.20504C16.9383 6.75111 16.9383 5.52431 16.368 4.6429C16.1212 4.26134 15.804 3.93373 15.4346 3.67877C14.5813 3.08984 13.3935 3.08984 11.0177 3.08984H7.63452C5.25876 3.08984 4.07087 3.08984 3.21756 3.67877C2.84816 3.93373 2.53098 4.26134 2.28415 4.6429C1.71411 5.5241 1.71411 6.7505 1.71411 9.20338V9.20504C1.71411 11.659 1.71411 12.886 1.71411 9.20504C1.71411 6.75111 1.71411 5.52431 1.71411 9.20338C1.71411 11.659 1.71411 12.886 2.28428 13.7674C2.5311 14.1489 2.84828 14.4765 3.21769 14.7315C4.071 15.3204 5.25888 15.3204 7.63464 15.3204Z"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14.4009 6.58398H13.978"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    opacity="0.63"
                    d="M11.4406 0.905273H7.21167"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={refFileInput}
                onChange={(e: any) => {
                  handleFile(e?.target?.files[0]);
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 p-6 pt-20"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-[400] text-[#656B89]">
                  Name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Name" maxLength={50} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-[400] text-[#656B89]">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Enter Email Address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-[400] text-[#656B89]">
                  Phone Number
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

          <Button
            type="submit"
            className="flex !h-auto w-full items-center gap-2 rounded-[16px] bg-[#7B2199] py-4 text-white hover:bg-purple-700 min-[1024px]:!text-[18px]"
            disabled={isFormEmpty || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <LoaderCircle className="mr-2 animate-spin" />
            )}
            Save
          </Button>
        </form>
      </Form>
    </>
  );
}
