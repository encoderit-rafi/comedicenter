"use server";

import { API } from "@/lib/fetch";
import { commonErrorHandler } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const getSubscriptionStatus = async () => {
  const { error, data } = await API.Get("subscriptions/current");
  if (data && Object.keys(data?.subscriptions || {}).length !== 0) {
    return true;
  } else {
    return false;
  }
};

export const putSubscriptionMembers = async (uid: string, payload: any) => {
  try {
    const { error, data } = await API.Put(
      `subscriptions/members/${uid}`,
      payload,
    );

    if (!!error) throw new Error(error);
    revalidatePath("qr-code");
    return { error, data };
  } catch (error) {
    commonErrorHandler(error);
  }
};
