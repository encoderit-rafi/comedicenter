import { getService, getSpecialties } from "@/actions/clinic.action";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { decodeValue, encodeValue } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Zod Schema Validation
const formSchema = z.object({
  specialty_id: z.string().optional(),
  service_categories: z.array(z.number()).optional(),
});
const SlidingFilter = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [service, setService] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [render, setRender] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialty_id: searchParams.get("speciality")
        ? decodeValue(searchParams.get("speciality") as string)
        : "",
      service_categories: searchParams.get("service")
        ? decodeValue(searchParams.get("service") as string)
            .split(",")
            .map(Number)
        : [],
    },
  });

  const fetchData = async () => {
    setRender(render);
    if (!!service.length && !!specialties.length) return;
    setLoading(true);
    const [specialtiesData, serviceData] = await Promise.all([
      getSpecialties(),
      getService(),
    ]);
    if (specialtiesData.error) {
    }
    setSpecialties(specialtiesData.data?.specialties);
    setService(serviceData.data?.services);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const { control, handleSubmit, setValue, watch, reset } = form;
  const selectedCategories: number[] = watch("service_categories");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { specialty_id, service_categories } = values;
    const params = new URLSearchParams(searchParams);
    params.delete("uid");
    if (specialty_id) {
      params.set("speciality", encodeValue(specialty_id));
    } else {
      params.delete("speciality");
    }
    if (service_categories?.length) {
      params.set("service", encodeValue(service_categories.join(",")));
    } else {
      params.delete("service");
    }
    replace(`${pathname}?${params.toString()}`);
    setShow(false);
  };
  const allFields = form.watch();

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    form.reset({
      specialty_id: "",
      service_categories: [],
    });
    setRender((prev) => !prev);
    params.delete("service");
    params.delete("speciality");
    replace(`${pathname}?${params.toString()}`);
    setShow(false);
  };
  return (
    <Sheet
      open={show}
      onOpenChange={(e) => {
        setShow(e), handleClear();
      }}
    >
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent
        side="left"
        className=" scrollbar-custom max-h-screen overflow-y-scroll bg-white "
      >
        <SheetHeader>
          <div className="mr-5 flex  justify-between">
            <h2 className="font-[600] text-[#40406F] min-[992px]:text-[22px]">
              Filter
            </h2>
            <span
              className="cursor-pointer text-sm text-[#92278F] underline"
              onClick={handleClear}
            >
              Clear all
            </span>
          </div>
        </SheetHeader>

        {loading ? (
          <div className="flex h-[80%] flex-col justify-between space-y-4">
            <div>
              <div className=" mt-4 h-3.5 w-32 animate-pulse rounded-full bg-gray-200"></div>
              <div className="mb-5 mt-4 h-5 w-full animate-pulse rounded-full bg-gray-200"></div>

              <div className="!mt-8 mb-5 h-3.5 w-32 animate-pulse rounded-full bg-gray-200"></div>
              {Array.from({ length: 5 }).map((value, index: number) => (
                <div
                  key={index}
                  className="  mb-5 h-5 w-full animate-pulse rounded-full bg-gray-200"
                ></div>
              ))}
            </div>
            <Button
              disabled
              className="w-full animate-pulse rounded-full bg-gray-200"
            ></Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <h2 className="pt-4 font-[600] text-[#92278F] min-[992px]:text-[18px]">
                Specialty
              </h2>
              <FormField
                control={control}
                name="specialty_id"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      key={render ? 1 : 0}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent className="z-50 ">
                        {specialties.map((speciality) => (
                          <SelectItem
                            key={speciality?.id}
                            value={speciality?.id.toString()}
                          >
                            {speciality?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h2 className="pt-4  font-[600] text-[#92278F] min-[992px]:text-[18px]">
                Services
              </h2>
              <Accordion type="single" className="mb-6" collapsible>
                {service.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="!border-b-0"
                  >
                    <AccordionTrigger className="mb-3 rounded-[5px] !border-none bg-[#F2F4F7] p-2 px-[15px] text-left text-[14px] font-[600] text-[#4B4B4B] !no-underline">
                      {item.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-2 space-y-3 px-2">
                        {item.service_categories.map((category: any) => (
                          <FormField
                            key={category?.id}
                            control={control}
                            name="service_categories"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    className="h-[23px] w-[23px] cursor-pointer rounded-[6px] border border-[#e2e8f0]"
                                    id={category.id.toString()}
                                    checked={selectedCategories.includes(
                                      category?.id,
                                    )}
                                    onCheckedChange={(checked) => {
                                      const updatedCategories: any = checked
                                        ? [...field.value, category.id]
                                        : field.value.filter(
                                            (id: number) => id !== category.id,
                                          );
                                      setValue(
                                        "service_categories",
                                        updatedCategories,
                                      );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor={category.id.toString()}
                                  className="!mt-0 cursor-pointer text-[13px] font-[400] text-[#4B4B4B]"
                                >
                                  {category.name}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Button
                type="submit"
                disabled={
                  !allFields?.specialty_id &&
                  !allFields?.service_categories?.length
                }
                className="w-full rounded-lg bg-[#7B2199] py-3 text-white"
              >
                Apply
              </Button>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SlidingFilter;
