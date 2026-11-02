"use server";

import { API, ApiResponse } from "@/lib/fetch";
import { commonErrorHandler } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const postReview = async (data: any, uid: string) => {
  try {
    const res: ApiResponse = await API.Post(`ratings/${uid}`, data);
    if (!!res?.error) throw new Error(res?.message);
    revalidatePath("my-visit-history");
    return { error: null, data: res.data };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

export const putReview = async (data: any, uid: string) => {
  try {
    // console.log(data);

    const res: ApiResponse = await API.Put(`ratings/${uid}`, data);
    if (!!res?.error) throw new Error(res?.message);
    revalidatePath("my-visit-history");
    return { error: null, data: res.data };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

export const deleteReview = async (uid: number) => {
  try {
    const res: ApiResponse = await API.Delete(`ratings/${uid}`);

    if (!!res?.error) throw new Error(res?.message);
    revalidatePath("my-visit-history");
    return { error: null, data: res.data };
  } catch (error) {
    return commonErrorHandler(error);
  }
};
