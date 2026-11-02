"use server";

import { API } from "@/lib/fetch";
import { commonErrorHandler } from "@/lib/utils";

export const postVerifyCode = async (payload: any) => {
  try {
    const { error, data } = await API.Post("auth/otp/verify", {
      session_id: payload?.session_id,
      otp: payload.otp,
    });
    if (!!error) throw new Error(error);
    return { error, data };
  } catch (error) {
    return commonErrorHandler(error);
  }
};
