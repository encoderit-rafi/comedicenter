"use client";
import { useAppContext } from "@/components/context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { errorToast } from "@/lib/utils";
import { MemberSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface PlanFormProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  OffPopup: () => void;
  selectedUid: string;
  selectedPrice: string;
  selectedSlide: any;
  plans: any;
  selectedPlaname?: string;
  myData: any;
}

const PlanForm = ({
  modalOpen,
  setModalOpen,
  OffPopup,
  selectedUid,
  selectedSlide,
  selectedPlaname,
  myData,
}: PlanFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  // const { data } = useSession();

  // (myData, "session?.user?.myData");

  const [profileImg, SetProfileImg] = useState<string | null>(
    myData?.user?.avatar || "",
  );

  const router = useRouter();
  const { setPlanMemberData } = useAppContext();

  const getMaxMembers = () => {
    switch (selectedPlaname) {
      case "Executive Business Plan":
        return 25;
      case "Business Smile Plan":
        return 10;
      default:
        return 3;
    }
  };

  const [memberFields, setMemberFields] = useState<string[]>(
    selectedPlaname === "Family Smile Plan"
      ? Array.from({ length: 3 }, (_, i) => `name_${i + 1}`)
      : Array.from({ length: 4 }, (_, i) => `name_${i + 1}`),
  );
  // const startIndex = selectedPlaname === "Family Smile Plan" ? 2 : 1;

  const form = useForm<z.infer<typeof MemberSchema>>({
    resolver: zodResolver(MemberSchema),
    defaultValues: Object.fromEntries(memberFields.map((field) => [field, ""])),
  });
  // (memberFields, "MemberFields");

  const addMemberField = () => {
    if (memberFields.length < getMaxMembers()) {
      const existingNumbers = memberFields.map((field) =>
        parseInt(field.split("_")[1]),
      );
      const newNumber = Math.max(...existingNumbers, 0) + 1;
      const newFieldName = `name_${newNumber}`;

      setMemberFields((prev) => [...prev, newFieldName]);
      form.setValue(newFieldName as keyof z.infer<typeof MemberSchema>, "");
    }
  };

  const removeMemberField = (fieldName: string) => {
    form.unregister(fieldName as keyof z.infer<typeof MemberSchema>);
    setMemberFields((prev) => prev.filter((name) => name !== fieldName));
  };
  const { watch, reset, formState } = form;
  const allFields = watch();
  const isFormEmpty = Object.values(allFields).every((val) =>
    typeof val === "string" ? val.trim() === "" : val === false,
  );
  async function handleSubmit(formData: z.infer<typeof MemberSchema>) {
    setLoading(true);
    try {
      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(
          ([_, value]) => typeof value === "string" && value.trim() !== "",
        ),
      );

      const payload = {
        ...(selectedPlaname === "Family Smile Plan"
          ? { name: myData?.user?.name }
          : ""),
        ...(Object.keys(filteredData).length ? filteredData : ""),
      };
      localStorage.setItem("planMemberData", JSON.stringify(payload));
      setPlanMemberData(payload);

      if (!!myData) {
        router.push(`/payment/${selectedUid}`);
      } else {
        toast.error("Please sign in before making a payment");
        router.replace(`/auth/signin`);
      }
    } catch (error) {
      errorToast(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (myData?.user?.avatar) {
      SetProfileImg(myData?.user?.avatar);
    }
  }, [myData?.user?.avatar]);

  const watchedFields = form.watch() as Record<string, string>;
  const lastField = memberFields[memberFields.length - 1];
  // const isLastFieldFilled = watchedFields?.[lastField]?.trim();
  const isAddMemberDisabled = memberFields.some(
    (field) => !watchedFields[field]?.trim(),
  );

  return (
    <Dialog open={modalOpen} onOpenChange={OffPopup} modal>
      {/* scrollbar-custom max-h-[calc(100vh-150px)] space-y-3 overflow-y-auto pr-4 min-[992px]:h-auto min-[992px]:max-h-[550px] */}
      <DialogContent className="plan-form !rounded-[30px] max-[600px]:w-[calc(100%-20px)] max-[425px]:px-[15px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-left text-[18px] font-[600] md:text-[22px]">
            Family Member
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          {/* scrollbar-custom max-h-[calc(100vh-150px)] space-y-4 overflow-hidden overflow-y-auto min-[992px]:h-auto min-[992px]:max-h-[550px] p-0 px-3*/}
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="scrollbar-custom max-h-[calc(100vh-200px)] space-y-4 overflow-hidden overflow-y-auto p-0 px-3 min-[992px]:h-auto min-[992px]:max-h-[550px]"
          >
            <div>
              <div className="flex items-center space-x-3">
                {selectedPlaname === "Family Smile Plan" && (
                  <>
                    <div className="relative block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={profileImg ? profileImg : "/img/dummy-new.png"}
                        alt="Profile"
                        width={800}
                        height={800}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[16px] font-[400] text-[#405168]">
                        Primary Member
                      </p>
                      <p className="text-limit4 text-[20px] font-[600] text-[#3B4552]">
                        {myData?.user?.name ? myData?.user?.name : "NA"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            {memberFields.map((field, index) => (
              <div key={field} className="relative flex items-center space-x-2">
                <FormField
                  name={field as keyof z.infer<typeof MemberSchema>}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-[16px] font-[400] text-[#656B89]">
                        {selectedPlaname === "Family Smile Plan"
                          ? `Add Member ${index + 2}`
                          : `Add Member ${index + 1}`}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Member Name"
                          maxLength={50}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {index >= 4 && (
                  <button
                    type="button"
                    className="absolute right-0 top-[25px] rounded-[50%] bg-[#7B2199] p-[3px] text-white"
                    onClick={() => removeMemberField(field)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
            {memberFields.length < getMaxMembers() && (
              <Button
                type="button"
                className="!h-auto w-full rounded-[16px] bg-gray-200 py-4 text-gray-700 hover:bg-gray-300"
                onClick={addMemberField}
                disabled={isAddMemberDisabled}
              >
                + Add New Member
              </Button>
            )}

            <Button
              type="submit"
              className="!h-auto w-full bg-purple-600 py-3 hover:bg-purple-700"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Continue"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PlanForm;
