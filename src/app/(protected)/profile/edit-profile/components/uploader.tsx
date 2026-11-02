import React, { forwardRef, useRef, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { toBase64 } from "@/lib/utils";

export interface UploaderRef {
  upload: () => Promise<{
    error: any;
    message?: string;
    validationErrors?: any[];
    files?: any[];
  }>;
}

export interface UploadFile {
  uploaded: boolean;
  data: {
    file: any;
    dataUrl: string;
  };
}

const Uploader = forwardRef(
  (
    {
      extensions,
      field,
      customer_image,
    }: {
      extensions?: string[];
      field?: ControllerRenderProps<any, any>;
      customer_image?: string;
    },
    ref
  ) => {
    const { toast } = useToast();
    const inputRef = useRef<any>(null);
    const [files, setFiles] = useState<UploadFile[]>(
      customer_image
        ? [
            {
              uploaded: true,
              data: {
                file: null,
                dataUrl: customer_image,
              },
            },
          ]
        : []
    );

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file.size > maxSize) {
          toast({ description: "Image size exceeds 5MB. Please select a smaller file." });
          return;
        }

        const dataUrl = await toBase64(file);
        const newFile = [
          {
            uploaded: false,
            data: {
              file,
              dataUrl,
            },
          },
        ];

        setFiles(newFile);
        if (field) field.onChange(newFile);

        inputRef.current.value = null; // Reset the file input
      }
    }

    return (
      <div className="rounded flex justify-center">
        <div style={{ position: "relative", borderRadius: "50%" }}>
          <input
            type="file"
            ref={inputRef}
            onChange={handleChange}
            accept={extensions?.join(",")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
          <div style={{ position: "relative" }}>
            <img
              src={files[0]?.data?.dataUrl || customer_image || ""}
              alt="gallery-photo"
              className="object-center border rounded-full mb-3 h-[100px] w-[100px]"
            />
          </div>
        </div>
      </div>
    );
  }
);

Uploader.displayName = "Uploader";
export default Uploader;
