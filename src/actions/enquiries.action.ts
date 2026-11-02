"use server";

import { API, ApiResponse } from "@/lib/fetch";
import { commonErrorHandler } from "@/lib/utils";
import { contactFormchema, supportSchema } from "@/schema/contact.schema";
import { z } from "zod";

export const postEnquiries = async (data: z.infer<typeof contactFormchema>) => {
  try {
    const res: ApiResponse = await API.Post(`enquiries`, {
      ...data,
      phone_code: "+1",
      state_id: +data.state_id,
      zip_code: data.zip,
    });
    if (res?.statusCode !== 201) throw new Error(res?.message);
    return { error: null, data: res.data };
  } catch (error) {
    console.log(error);

    return commonErrorHandler(error);
  }
};

export const postSupport = async (data: z.infer<typeof supportSchema>) => {
  try {
    const res: ApiResponse = await API.Post(`user/contact_us`, data);
    if (res?.statusCode !== 200) throw new Error(res?.message);
    return { error: null, data: res.data };
  } catch (error) {
    console.log(error);

    return commonErrorHandler(error);
  }
};
