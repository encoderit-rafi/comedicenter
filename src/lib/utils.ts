import { handleFileUpload } from "@/actions/auth.action";
import imageCompression from "browser-image-compression";
import { clsx, type ClassValue } from "clsx";
import moment from "moment-timezone";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function commonErrorHandler(error: any) {
  return {
    error:
      error?.response?.data?.message ||
      error?.message ||
      "something went wrong",
    data: null,
  };
}
export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const formatDateTime = (date: string, _format?: string) => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // console.log(userTimezone, "userTimezone");

  return moment(date)
    .local()
    .tz(userTimezone)
    .format(_format || "MMM D, YYYY h:mma");
};

export const formatDate = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  timeout = 300,
): (...args: Parameters<F>) => void {
  let timer: NodeJS.Timeout | undefined;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
}

export const formatPhone = (phone: string) => {
  let x: any = phone.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  phone = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  return phone;
};

export function formatPrice(Price: number) {
  const formattedPrice = new Intl.NumberFormat("en-US").format(Price);
  return formattedPrice;
}

export function errorToast(error: any) {
  if (!navigator.onLine) return toast.error("Slow or no internet connection");
  toast.error(error?.message || error);
}

export const FileValidation = (
  file: File,
  maxSize: number,
  fileTypes: string[],
) => {
  const maxImageSize = maxSize * 1024 * 1024;
  if (!fileTypes.includes(file.type)) {
    return { error: true, message: "Invalid image format." };
  }
  if (file?.size >= maxImageSize) {
    return {
      error: true,
      message: `Image size is too large! Please upload an image under ${maxSize}MB.`,
    };
  }
  return { error: false, message: "Ok" };
};

export const uploadFile = async (file: File) => {
  try {
    let compressedFile = file;

    if (file.type.startsWith("image/")) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 720,
        useWebWorker: true,
      };
      compressedFile = await imageCompression(file, options);
    }

    const uniqueString = Date.now().toString();
    const modifiedFileName = `${uniqueString}_${compressedFile.name}`;

    const { data: signedUrl, error } = await handleFileUpload(modifiedFileName);

    if (error || !signedUrl?.data) {
      console.error("Error getting signed URL", error);
      throw new Error("Error getting signed URL");
    }
    ({ signedUrl });

    const url = signedUrl.data[modifiedFileName];

    if (!url) throw new Error("Signed URL not found in response.");
    const response = await fetch(url, {
      method: "PUT",
      body: compressedFile,
      // headers: {
      //   "Content-Type": compressedFile.type, // Ensure correct content type
      //   "x-amz-acl": "public-read", // If required for public access
      // },
    });
    if (!response.ok) {
      throw new Error(`Image upload failed with status: ${response.status}`);
    }

    return {
      data: {
        name: modifiedFileName,
        url: `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${modifiedFileName}`,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error uploading Image:", error);
    // toast.error("Error uploading file. Please try again.");
    return { data: null, error: "Error uploading Image" };
  }
};

export function encodeValue(value: string) {
  return btoa(value); // Convert to Base64
}

export function decodeValue(encodedValue: string) {
  return atob(encodedValue); // Convert from Base64
}

export const maskEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  if (!domain) return email;
  const firstTwo = localPart.substring(0, 2);
  const maskedLocal = `${firstTwo}*****`;
  return `${maskedLocal}@${domain}`;
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-GB", {
    // weekday: "short", // e.g. 'Tue'
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export function transformMemberData(memberData: {
  [key: string]: string;
}): { name: string }[] {
  if (Object.keys(memberData).length === 0) {
    return [];
  }
  return Object.values(memberData).map((name) => ({ name }));
}
