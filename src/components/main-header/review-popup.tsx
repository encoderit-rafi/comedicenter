import { putMe } from "@/actions/user.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

const ReviewPopup = ({
  reviewNeeded,
  setReviewNeeded,
}: {
  reviewNeeded: string;
  setReviewNeeded: Dispatch<SetStateAction<string>>;
}) => {
  const data = JSON.parse(reviewNeeded);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleReview = async () => {
    setLoading(true);
    putMe();
    router.push(`/my-visit-history?uid=${data?.visit_uid}`);
    setLoading(false);
    setReviewNeeded("");
  };
  const handleClose = () => {
    putMe();
    setReviewNeeded("");
  };
  return (
    <Dialog open={!!reviewNeeded} onOpenChange={handleClose}>
      <DialogContent className="success-modal max-w-[350px] !overflow-hidden !rounded-[30px]  max-[600px]:w-[calc(100%-20px)]">
        <DialogHeader>
          <DialogTitle className="mb-3 text-center  font-semibold text-[#2D2B4E]">
            Rating and Review for
            <span className="mt-1 block">{data?.clinic}</span>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex w-full items-center justify-center space-x-1 pb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  <svg
                    width="34"
                    height="35"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                      fill={"#E1E1F3"}
                    />
                  </svg>
                </span>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <button
            disabled={loading}
            onClick={handleReview}
            className="inline-block w-full cursor-pointer rounded-[16px] bg-[#7B2199] py-3 text-center text-[20px] font-[600] text-white min-[768px]:!text-[22px]"
          >
            Write Review
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewPopup;
