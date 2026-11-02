"use server";

import { API, ApiResponse } from "@/lib/fetch";
import { commonErrorHandler } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const putMyClinic = async (clinicId: string) => {
  try {
    const payload = { clinic_id: clinicId };
    const res: ApiResponse = await API.Put("user/me", payload);
    if (!!res?.error) throw new Error(res?.message);
    revalidatePath("clinic");
    return { error: null, data: res.data };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

export const getMyClinic = async () => {
  return await API.GetAll("user/me");
};
