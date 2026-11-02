import { postSignedURLs } from "@/actions/auth.action";
import { deleteReview, postReview, putReview } from "@/actions/review.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { errorToast } from "@/lib/utils";
import { reviewSchema } from "@/schema/review.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AddPhotoSection from "./upload-image";

// import AddPhotoSection from "./upload-image";
interface AddReviewProps {
  selectedCenter?: any;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

function AddReview({
  selectedCenter,
  modalOpen,
  setModalOpen,
}: AddReviewProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [photoError, setPhotoError] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const parsedImaes: string[] = [];
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: "",
      description: "",
      rating: 0,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const imageData: { url: string }[] = edit
        ? imageUrls
            .filter((url) => !url.startsWith("blob"))
            .map((url) => ({ url }))
        : [];

      if (photos?.length) {
        const newNames = photos.map(
          (photo) => `uploads/${Date.now()}_${photo.name}`,
        );
        const { error, data: signedData } = await postSignedURLs(newNames);
        if (error || !signedData)
          throw new Error("An error occurred while uploading images.");

        await Promise.all(
          newNames.map((name, index) => {
            const url = signedData.data[name];
            imageData.push({ url: url.split("?")[0] });
            return fetch(url, { method: "PUT", body: photos[index] });
          }),
        );
      }

      const reviewFunction = edit ? putReview : postReview;
      const reviewUid = edit
        ? selectedCenter?.rating?.uid
        : selectedCenter?.uid;

      data.photos = imageData;
      const { error } = await reviewFunction(data, reviewUid);
      if (error) throw new Error(error);

      setPhotos([]);
      setImageUrls([]);
      toast.success(
        edit ? "Review updated successfully" : "Review added successfully",
      );
      form.reset();
      setSelectedRating(0);
      router.refresh();
    } catch (error) {
      errorToast(error);
    } finally {
      setLoading(false);
      setEdit(false);
      setModalOpen(false);
    }
  };

  const handleEdit = () => {
    setEdit(true),
      form.reset({
        title: selectedCenter?.rating?.title || "",
        description: selectedCenter?.rating?.description || "",
        rating: selectedCenter?.rating?.rating || 0,
      });
    setSelectedRating(selectedCenter?.rating?.rating || 0);
    setImageUrls(parsedImaes);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await deleteReview(selectedCenter?.rating?.uid);

      if (error) throw new Error(error);
      toast.success("Review deleted successfully");
      form.reset();
      router.refresh();
      setLoading(false);
      setShow(false);
      setSelectedRating(0);
      form.reset({
        title: "",
        description: "",
        rating: 0,
      });
      setImageUrls([]);
    } catch (error) {
      setLoading(false);
      errorToast(error);
    }
    setIsDeleting(false);
  };

  const handleModalClose = () => {
    setModalOpen(false), setEdit(false), setShow(false);
    setSelectedRating(0);
    form.reset({
      title: "",
      description: "",
      rating: 0,
    });
    setImageUrls([]);
    setPhotoError("");
    if (!!searchParams?.has("uid")) router.replace("/my-visit-history");
  };
  return (
    <div>
      <Dialog open={modalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="review_modal overflow-hidden !rounded-[16px] max-[600px]:w-[calc(100%-20px)]">
          <DialogHeader>
            <DialogTitle className="text-[22px] text-[#000000]">
              {edit
                ? "Edit review"
                : !!selectedCenter && selectedCenter?.rating
                  ? "View Review"
                  : "Write Review"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="scrollbar-custom max-h-[550px] space-y-4 overflow-y-auto pr-4">
              <div className="flex items-center space-x-4 rounded-[11px] bg-[#DAEFFFBD] p-3">
                <Image
                  src={
                    selectedCenter?.clinic?.avatar ||
                    "/img/default-image-new.png"
                  }
                  alt={selectedCenter?.clinic?.name}
                  width={200}
                  height={200}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div>
                  <h3 className="mb-1 text-[18px] font-semibold text-[#34373C]">
                    {selectedCenter?.clinic?.name}
                  </h3>
                  <p className="text-[16px] text-[#80809D]">
                    {selectedCenter?.clinic?.location?.address}
                  </p>
                </div>
              </div>
              <div className="rate ">
                {selectedCenter?.rating !== null && !edit && (
                  <div>
                    <div className="flex justify-between pt-[10px]">
                      <div
                        className={`flex items-center justify-start space-x-1`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                                fill={
                                  i < selectedCenter?.rating?.rating
                                    ? "#FFBE19"
                                    : "#E1E1F3"
                                }
                              />
                            </svg>
                          </span>
                        ))}
                        <span className="pl-[10px] font-bold ">
                          {selectedCenter?.rating?.rating &&
                            `${selectedCenter?.rating?.rating}.0`}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical className="h-5 w-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-10">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={handleEdit}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setModalOpen(false);
                              setShow(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>{" "}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )}
              </div>

              {selectedCenter && selectedCenter?.rating && !edit ? (
                <>
                  <div>
                    <h3 className="text-[20px] font-[600] text-[#3D3D3D]">
                      {selectedCenter?.rating?.title || ""}
                    </h3>
                    <p className="mt-2 text-[16px] leading-normal text-[#4F4F78]">
                      {selectedCenter?.rating?.description || ""}
                    </p>
                  </div>
                  <div>
                    {!!selectedCenter?.rating?.photos?.length && (
                      <span className="text-[14px] text-[#405168]">Photos</span>
                    )}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {selectedCenter?.rating?.photos?.map(
                        (_item: any, index: number) => {
                          const item = JSON.parse(_item);
                          parsedImaes.push(item?.url);
                          return (
                            <span key={index}>
                              <Image
                                src={item?.url}
                                alt="affordable"
                                width={500}
                                height={500}
                                className="h-[120px] w-[110px] rounded-lg object-cover"
                                priority={index === 0}
                                loading={index === 0 ? "eager" : "lazy"}
                                placeholder="blur"
                                blurDataURL="/img/default-image-new.png"
                              />
                            </span>
                          );
                        },
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-center text-center">
                            <FormLabel className="block text-center text-[#656B89]">
                              Rate Clinic
                            </FormLabel>
                            <div className="flex justify-center space-x-2">
                              {[1, 2, 3, 4, 5].map((star: number) => (
                                <span
                                  key={star}
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setSelectedRating(star);
                                    field.onChange(star);
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                                      fill={`${selectedRating >= star ? "#FFBE19" : "#E1E1F3"}`}
                                    />
                                  </svg>
                                </span>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[14px] font-[400] text-[#656B89]">
                              Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="py-2 text-black placeholder:text-sm"
                                placeholder="Review Title"
                                {...field}
                                maxLength={50}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[14px] font-[400] text-[#656B89]">
                              Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="py-2 text-black"
                                {...field}
                                maxLength={250}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <AddPhotoSection
                        // photos={photos}
                        setPhotos={setPhotos}
                        setPhotoError={setPhotoError}
                        imageUrls={imageUrls}
                        setImageUrls={setImageUrls}
                      />
                      <span className="text-sm text-red-500">{photoError}</span>
                      <Button
                        type="submit"
                        autoFocus
                        disabled={loading}
                        className=" !mt-[20px] w-full bg-[#7B2199] !p-0 !px-0 !py-0 !text-[18px] font-[600] hover:bg-purple-700"
                      >
                        {loading && (
                          <LoaderCircle className="mr-2 animate-spin" />
                        )}{" "}
                        {edit ? "Save Changes" : " Submit"}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <AlertDialog open={show}>
        <AlertDialogContent className="border-white bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShow(false), setModalOpen(true);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-700"
              onClick={handleDelete}
            >
              {isDeleting && <LoaderCircle className="mr-2 animate-spin" />}{" "}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AddReview;
