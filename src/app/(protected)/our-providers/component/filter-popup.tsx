import {
  getAddressFromCoordinates,
  getCoordinatesFromPlaceId,
  getPlaceSuggestions,
  postLocation,
} from "@/actions/location.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { commonErrorHandler, debounce, errorToast } from "@/lib/utils";
import { Address } from "@/types";
import { LoaderCircle, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface filterProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  isLoggedIn: boolean;
}

const FilterPopup = ({ modalOpen, setModalOpen, isLoggedIn }: filterProps) => {
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [render, setRender] = useState(false);
  const [data, setData] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const [showAniamtion, setShowAnimation] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [address, setAddress] = useState<Address | null>(null);
  const { replace, refresh } = useRouter();
  const handleSearch = debounce(async (e: any) => {
    setSearch(e.target.value.trim());
    setMessage("");
    setIsSelected(false);
    const { data, error } = await getPlaceSuggestions(e.target.value.trim());
    if (error) {
      setData([]);
      throw new Error(data);
    }
    setData(data);
  });
  const handleSelect = async (placeId: string, description: string) => {
    try {
      setLoading(true);
      setMessage("");
      setSearch(description);
      setRender(!render);
      setData([]);
      const addressDetails: any = await getCoordinatesFromPlaceId(placeId);
      setAddress({ ...addressDetails, address: description });
      setIsSelected(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      commonErrorHandler(error);
    }
  };
  const handleSubmit = async () => {
    try {
      if (!address && !search) {
        setMessage("Please select location");
        return;
      }
      if (!address && isSelected) {
        setMessage("Please select a valid location");
        return;
      }
      if (!isSelected) {
        setMessage("Please select a valid location");
        return;
      }
      setLoading(true);
      const url = `/our-providers?slc=${String(address?.state_long_code)}&ssc=${String(address?.state_short_code)}&address=${String(address?.address)}`;
      if (isLoggedIn) {
        const { error, data } = await postLocation(address as Address);
        setLoading(false);
        if (error) throw new Error(error);
        replace("/our-providers");
        refresh();
        setTimeout(() => setModalOpen(false), 500);
      } else {
        setLoading(false);
        replace(url);
        refresh();
        setTimeout(() => setModalOpen(false), 500);
      }
    } catch (error) {
      setLoading(false);
      errorToast(error);
    }
  };

  const handleCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setShowAnimation(true);
          setMessage("");
          try {
            const { latitude, longitude } = position.coords;
            const addressDetails: any = await getAddressFromCoordinates(
              latitude,
              longitude,
            );
            // console.log("addressDetails", addressDetails);
            // const url = `/our-providers?latitude=${latitude}&longitude=${longitude}`;
            const url = `/our-providers?slc=${String(addressDetails?.state_long_code)}&ssc=${String(addressDetails?.state_short_code)}&address=${String(addressDetails?.address)}`;
            if (isLoggedIn) {
              if (!!addressDetails) {
                const { error, data } = await postLocation(
                  addressDetails as Address,
                );
                if (!!data) {
                  replace("/our-providers");
                  refresh();
                  setTimeout(() => setModalOpen(false), 500);
                }
              }
            } else {
              replace(url);
              refresh();
              setTimeout(() => setModalOpen(false), 500);
            }
          } catch (error) {
            toast.error("Failed to get current location");
          }
          setShowAnimation(false);
        },
        (error) => {
          console.error("Error retrieving location:", error.message);
          toast.error(
            "Please enable location access for personalized features.",
            {
              style: {
                background: "#ececec",
                color: "black",
                fontSize: "16px",
                borderRadius: "8px",
                padding: "12px",
              },
            },
          );
        },
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };
  return (
    <>
      <Dialog
        open={modalOpen}
        onOpenChange={(e) => {
          setMessage("");
          setModalOpen(e);
          setIsSelected(false);
        }}
      >
        <DialogContent className={"  rounded-lg p-6"}>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Enter Location
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-2">
            <div className="relative">
              <Input
                defaultValue={search}
                type="text"
                key={render === true ? 1 : 0}
                onChange={handleSearch}
                placeholder="233 Lafayette St, Newark, NJ 07105"
                className="rounded-md border-gray-300 pl-10"
              />
              {message && (
                <span className="text-sm text-red-500">{message}</span>
              )}
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4002 11.6759L16.7373 16M14.2373 7.25C14.2373 10.7018 11.4391 13.5 7.98731 13.5C4.53552 13.5 1.7373 10.7018 1.7373 7.25C1.7373 3.79822 4.53552 1 7.98731 1C11.4391 1 14.2373 3.79822 14.2373 7.25Z"
                    stroke="#4F4F78"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div className="rounded-lg bg-gray-100 ">
              {data.map((item: any, index: number) => (
                <p
                  key={index}
                  className="flex cursor-pointer gap-2 rounded-lg bg-gray-100 p-2 text-sm hover:bg-gray-200"
                  onClick={() => handleSelect(item.place_id, item?.description)}
                >
                  <MapPin className="h-4 w-4" />
                  {item?.description}
                </p>
              ))}
            </div>
            <button
              autoFocus
              className="mt-2 flex items-center text-[16px] text-sm text-[#1C75BC] hover:underline"
              onClick={handleCurrentLocation}
            >
              <span className="mr-2">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.451842 6.62457L15.9715 0.0584829C16.1558 -0.0194943 16.3638 -0.0194943 16.5481 0.0584829C16.9245 0.217723 17.1006 0.65193 16.9413 1.02831L10.3753 16.5482C10.2848 16.7623 10.0988 16.9214 9.87325 16.9777C9.47678 17.0768 9.07504 16.8358 8.97596 16.4393L7.29289 9.70704L0.560695 8.02395C0.335171 7.96757 0.149251 7.80847 0.0586733 7.59439C-0.100563 7.21804 0.075464 6.78382 0.451842 6.62457Z"
                    fill="#1C75BC"
                  />
                </svg>
              </span>
              Use my current location
            </button>
          </div>
          {showAniamtion && (
            <div className="  absolute  flex h-full w-full items-center justify-center bg-white/60 pb-5">
              <div className="loader "></div>
            </div>
          )}
          <DialogFooter>
            <Button
              disabled={loading || !!message}
              className="w-full rounded-md bg-[#7B2199] text-white hover:bg-purple-700"
              onClick={handleSubmit}
            >
              {loading && <LoaderCircle className="mr-2 animate-spin" />}Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterPopup;
