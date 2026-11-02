"use client";
import { FileValidation } from "@/lib/utils";
import imageCompression from "browser-image-compression";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { toast } from "sonner";

interface AddPhotoSectionProps {
  setPhotos: Dispatch<SetStateAction<File[]>>;
  setPhotoError: Dispatch<SetStateAction<string>>;
  imageUrls: string[];
  setImageUrls: Dispatch<SetStateAction<string[]>>;
}

const AddPhotoSection: React.FC<AddPhotoSectionProps> = ({
  setPhotos,
  setPhotoError,

  imageUrls,
  setImageUrls,
}) => {
  const refFileInput = useRef<HTMLInputElement>(null);
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  const handleDeletePhoto = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };
  const handleFileChange = async (file: File) => {
    const { error, message } = FileValidation(file, 2, [
      "image/jpeg",
      "image/png",
    ]);
    if (error) {
      setPhotoError(message);
      return;
    }
    setPhotoError("");
    try {
      const options = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      const imageUrl = URL.createObjectURL(compressedFile);

      setImageUrls((prev) => [...prev, imageUrl]);
      setPhotos((prev) => [...prev, compressedFile]);
    } catch (err: any) {
      toast.error("An unexpected error occured");
    }

    if (refFileInput.current) {
      refFileInput.current.value = "";
    }
  };

  const triggerFileInput = () => {
    setPhotoError("");
    refFileInput.current?.click();
  };

  return (
    <div className="my-2 w-full space-y-2">
      <h4 className="block text-[14px] font-[400] text-[#656B89]">Add Photo</h4>
      <div className="flex flex-wrap gap-4">
        {imageUrls.map((photo, index) => (
          <div
            key={index}
            className="relative h-16  w-16 overflow-hidden rounded-[11px] border border-gray-200"
          >
            <Image
              src={photo}
              alt={`Photo ${index + 1}`}
              width={95}
              height={95}
              className=" object-cover"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="/img/default-image-new.png"
            />
            <button
              type="button"
              onClick={() => handleDeletePhoto(index)}
              className="absolute bottom-1 right-1 flex !min-h-[30px] w-[30px] items-center justify-center rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-75"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
        {/* Hidden File Input */}
        <input
          type="file"
          ref={refFileInput}
          accept="image/jpeg, image/png"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFileChange(e.target.files[0]);
          }}
        />
        {imageUrls.length < 3 && (
          <div
            onClick={triggerFileInput}
            className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-[11px] border border-gray-300 bg-[#EAEDEF] hover:bg-gray-100"
          >
            <Plus />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPhotoSection;
