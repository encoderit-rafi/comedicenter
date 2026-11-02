"use client";
import { LogOut as LogOUtAction } from "@/actions/auth.action";
import { getSubscriptionStatus } from "@/actions/subscription.action";
import ClickOutside from "@/components/click-outside";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Clock,
  CreditCard,
  History,
  Home,
  LogOut,
  QrCode,
  User,
  Users,
  UserX,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { ClinicSwitch } from "../clinic-switch/clinic-switch";
import { HoursOfOperation } from "../hours-of-operation/hours-of-operation";
import { Button } from "../ui/button";
import DeleteAccountModal from "./delete-account";

interface DropdownUserProps {
  sessionme: any;
  isProfile: boolean;
  MyData?: any;
  isSubscribed?: boolean;
  isAdmin?: boolean;
}

type MenuItemProps = {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
  setDropdownOpen: (open: boolean) => void;
};

const DropdownUser: FC<DropdownUserProps> = ({
  sessionme,
  isProfile,
  MyData,
  isSubscribed,
  isAdmin,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImg, SetProfileImg] = useState<string | null>(null);
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hoursOfOperationModal, setHoursOfOperationModal] =
    useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [isSusbscribed, setIsSubscribed] = useState<boolean>(false);

  const handleDeleteAccount = async (open: boolean) => {
    setDropdownOpen(open);
    if (!isSusbscribed) {
      const data = await getSubscriptionStatus();
      setIsSubscribed(data);
    }
    setShow(true);
  };
  useEffect(() => {
    if (sessionme?.user?.avatar) {
      SetProfileImg(sessionme.user.avatar);
    }
  }, [sessionme, isProfile]);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // setHoursOfOperationModal
  const handleCloseModalHoursOfOperation = () => {
    setHoursOfOperationModal(false);
  };
  const handleLogout = async () => {
    try {
      const sessionId = sessionme?.user?.sessionId;
      let sessionRole = sessionme?.user?.role;
      setLoading(true);

      if (sessionId) {
        if (
          sessionRole &&
          ["Staff", "Doctor", "Clinic", "ClinicAdmin"].includes(sessionRole)
        ) {
          await LogOUtAction(sessionId);
          localStorage.removeItem("modalClosed");
          router.push("/auth/provider-login");
        } else {
          await LogOUtAction(sessionId);
          router.push("/auth/signin");
        }
        toast.success("You have logged out successfully");
        setShowLogoutConfirm(false);
        router.refresh();
      } else {
        throw new Error("Session ID is missing");
      }
    } catch (error) {
      toast.error("An error occurred while logging out.");
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
        <Link
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4"
          href="#"
        >
          <span className="h-8 w-8 rounded-full min-[500px]:h-12 min-[500px]:w-12">
            <Image
              src={
                profileImg?.startsWith("http")
                  ? profileImg
                  : "/img/dummy-new.png"
              }
              alt={sessionme?.user?.name || "Profile Image"}
              width={200}
              height={200}
              className="h-full w-full rounded-full border border-[#ebebeb] bg-white object-cover p-[2px]"
            />
          </span>
        </Link>

        {dropdownOpen && (
          <div className="h-90 w-75 border-stroke shadow-default dark:border-strokedark dark:bg-boxdark absolute right-0 z-[999] mt-4 flex flex-col overflow-hidden rounded-[15px] border bg-white">
            <div className="w-64 rounded-[15px] p-4 px-0 py-0 shadow-md">
              <ul className="drop-menus">
                <div className="border-b !border-[#e0e0e0]">
                  <Link href="/profile">
                    <MenuItem
                      icon={<User className="h-5 w-5" />}
                      label="Profile"
                      setDropdownOpen={setDropdownOpen}
                    />
                  </Link>
                </div>
                {MyData?.user?.role === "Patient" && (
                  <>
                    <div className="border-b !border-[#e0e0e0]">
                      <Link href="/my-visit-history">
                        <MenuItem
                          icon={<History className="h-5 w-5" />}
                          label="Visit History"
                          setDropdownOpen={setDropdownOpen}
                        />
                      </Link>
                    </div>
                    <div className="border-b !border-[#e0e0e0]">
                      <Link href="/subscription?dental">
                        <MenuItem
                          icon={<CreditCard className="h-5 w-5" />}
                          label="Subscription"
                          setDropdownOpen={setDropdownOpen}
                        />
                      </Link>
                    </div>
                    {!!isSubscribed && (
                      <div className="border-b !border-[#e0e0e0]">
                        <Link href="/qr-code">
                          <MenuItem
                            icon={<QrCode className="h-5 w-5" />}
                            label="My QR Code"
                            setDropdownOpen={setDropdownOpen}
                          />
                        </Link>
                      </div>
                    )}

                    <MenuItem
                      icon={<UserX className="h-5 w-5" />}
                      label="Delete account"
                      setDropdownOpen={handleDeleteAccount}
                    />
                  </>
                )}
                {["Staff", "Doctor"].includes(MyData?.user?.role) && (
                  <>
                    {isAdmin && (
                      <div className="border-b !border-[#e0e0e0]">
                        <Link href={"/users"}>
                          <MenuItem
                            icon={<Users className="h-5 w-5" />}
                            label="Users"
                            setDropdownOpen={setDropdownOpen}
                          />
                        </Link>
                      </div>
                    )}
                    <div className="border-b !border-[#e0e0e0]">
                      <Link href="/visit-history-patient">
                        <MenuItem
                          icon={<History className="h-5 w-5" />}
                          label="Visit History"
                          setDropdownOpen={setDropdownOpen}
                        />
                      </Link>
                    </div>
                    <div className="border-b !border-[#e0e0e0]">
                      <Link
                        href={`/all-reviews?uid=${MyData?.user?.clinic?.uid}`}
                      >
                        <MenuItem
                          icon={<CreditCard className="h-5 w-5" />}
                          label="Review and Rating"
                          setDropdownOpen={setDropdownOpen}
                        />
                      </Link>
                    </div>
                    <MenuItem
                      icon={<Clock className="h-5 w-5" />}
                      label="Hours of Operation"
                      onClick={() => setHoursOfOperationModal(true)}
                      setDropdownOpen={setDropdownOpen}
                    />
                    {MyData?.user?.doctor_clinics?.length > 1 && (
                      <MenuItem
                        icon={<Home className="h-5 w-5" />}
                        label="Change Clinic"
                        onClick={() => setIsModalOpen(true)}
                        setDropdownOpen={setDropdownOpen}
                      />
                    )}
                  </>
                )}

                <MenuItem
                  icon={<LogOut className="h-5 w-5" />}
                  label="Logout"
                  onClick={() => setShowLogoutConfirm(true)}
                  setDropdownOpen={setDropdownOpen}
                />
              </ul>
            </div>
          </div>
        )}
      </ClickOutside>
      {show && (
        <DeleteAccountModal
          show={show}
          setShow={setShow}
          isSubscribed={isSusbscribed}
        />
      )}
      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="success-modal max-w-[350px] !overflow-hidden !rounded-[30px]  max-[600px]:w-[calc(100%-20px)]">
          <DialogHeader>
            <DialogTitle className="mb-3 text-center text-[32px] font-semibold text-[#2D2B4E]">
              Logout
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-1 text-center text-gray-600">
                <p className="text-[16px]">
                  Are you sure you want to logout from this account?
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full gap-3">
              <Button
                className="inline-block h-[50px]  w-full flex-1 rounded-[16px] border border-[#AFAFAF]  bg-[#fff] !pb-0 !pt-0 text-center  text-[20px] font-[600] text-black hover:text-white min-[768px]:!text-[22px]"
                onClick={() => setShowLogoutConfirm(false)}
              >
                No
              </Button>
              <Button
                className="inline-block  h-[50px] w-full flex-1 rounded-[16px] border border-[#7B2199] bg-[#7B2199] !pb-0  !pt-0  text-center text-[20px] font-[600] text-white min-[768px]:!text-[22px] "
                onClick={handleLogout}
                disabled={loading}
              >
                Yes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ClinicSwitch
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        MyData={MyData}
      />

      <HoursOfOperation
        isOpen={hoursOfOperationModal}
        onClose={handleCloseModalHoursOfOperation}
        MyData={MyData}
      />
    </>
  );
};

// MenuItem Component
const MenuItem: FC<MenuItemProps> = ({
  icon,
  label,
  onClick,
  setDropdownOpen,
}) => (
  <li
    onClick={() => {
      if (onClick) onClick();
      setDropdownOpen(false);
    }}
    className="flex cursor-pointer items-center justify-between rounded-none p-2 px-[15px] py-[10px] hover:bg-gray-200"
  >
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-medium text-gray-800">{label}</span>
    </div>
    <span className="text-gray-500 opacity-[.7]">
      <ArrowRight />
    </span>
  </li>
);

export default DropdownUser;
