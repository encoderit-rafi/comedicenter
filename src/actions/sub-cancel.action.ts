"use server";

import { API } from "@/lib/fetch";
import { commonErrorHandler } from "@/lib/utils";

export const subCancel = async (subscriptionUid: string) => {
  try {
    const { error, data } = await API.DeleteByUid(
      "subscriptions",
      subscriptionUid,
    );
    if (!!error) throw new Error(error);
    return { error, data };
  } catch (error) {
    return commonErrorHandler(error);
  }
};
