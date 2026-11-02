import { deleteUser } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteModalProps {
  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  message: string;
  hasButton?: boolean;
  desc: string;
  selectedUser: any;
}

const DeleteUser: React.FC<DeleteModalProps> = ({
  deleteOpen,
  setDeleteOpen,
  message,
  hasButton,
  desc,
  selectedUser,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  async function statusUpdate() {
    setLoading(true);
    const { error, data } = await deleteUser(selectedUser?.uid);
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }
    toast.success("User deleted successfully");
    setDeleteOpen(false);
    setLoading(false);
    router.refresh();
  }
  const handleClose = () => {
    setDeleteOpen(false);
  };
  return (
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <DialogContent className="success-modal max-w-[350px] !overflow-hidden !rounded-[30px]  max-[600px]:w-[calc(100%-20px)]">
        <DialogHeader>
          <DialogTitle className="mb-3 text-center text-[32px] font-semibold text-[#2D2B4E]">
            {message}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-1 text-center text-gray-600">
              <p className="text-[16px]">{desc}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
        {hasButton && (
          <DialogFooter>
            <Button
              className="inline-block !h-auto w-full rounded-[16px] border border-[#AFAFAF] bg-[#fff] py-5 text-center text-[20px] text-black hover:!text-white min-[1024px]:!text-[20px]"
              onClick={handleClose}
            >
              No
            </Button>
            <Button
              className="flex !h-auto w-full items-center gap-1 rounded-[16px] border border-[#7B2199] bg-[#7B2199] py-5 text-center text-[20px] text-white min-[1024px]:!text-[20px]"
              onClick={statusUpdate}
              disabled={loading}
            >
              {loading && <LoaderCircle className="mr-2 animate-spin" />}
              Yes
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
