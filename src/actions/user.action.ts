"use server";

import { signOut } from "@/auth";
import { API, ApiResponse } from "@/lib/fetch";
import { commonErrorHandler } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const getUserMe = async () => {
  const res = await API.Me();
  if (res.statusCode === 401) {
    await signOut({ redirect: false });
  }
  return res;
};

export const GetUser = async (uid: string) => {
  try {
    const res: ApiResponse = await API.Get(`user/${uid}`, {
      populate: [
        "practice.specialty",
        "practice.service",
        "practice.service_category",
      ],
    });
    // if (!!res?.error) throw new Error(res?.message);
    if (res.error) {
      return {
        data: null,
        error: res.error,
        message: res.message,
        statusCode: res.statusCode,
      };
    }
    if (res.statusCode === 401) {
      await signOut({ redirect: false });
    }
    revalidatePath("users");
    return {
      error: null,
      data: res.data,
      message: null,
      statusCode: res.statusCode,
    };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

export const putClinicHours = async (uid: number, payload: any) => {
  try {
    const res: ApiResponse = await API.Put(`user/${uid}`, payload);
    // console.log(res, "res");

    if (!!res?.error) throw new Error(res?.message);
    return { error: null, data: res.data };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

export const putMe = async () => {
  await API.UpdateMe({ is_reviewe_needed: null });
};

export const deleteMe = async (uid: string) => {
  try {
    const res: ApiResponse = await API.DeleteByUid("user", uid);
    if (!!res?.error) throw new Error(res?.message);
    await signOut({ redirect: false });
    return { error: null, data: res?.data };
  } catch (error: any) {
    return commonErrorHandler(error);
  }
};

export const deleteUser = async (uid: string) => {
  try {
    const res: ApiResponse = await API.DeleteByUid("doctor_clinic", uid);
    if (!!res?.error) throw new Error(res?.message);
    return { error: null, data: res?.data };
  } catch (error: any) {
    return commonErrorHandler(error);
  }
};
