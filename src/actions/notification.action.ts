"use server";

import { auth } from "@/auth";
import { API } from "@/lib/fetch";

export const getNotifications = async (offset: number) => {
  const session = await auth();
  return await API.GetAll("user_notification", {
    where: { user_id: session?.user?.id },
    offset,
    populate: ["responsibleUser"],
    sort: [["created_at", "desc"]],
    limit: 10,
  });
};

export const putNotification = async () => {
  return await API.Put("user_notification", {});
};
