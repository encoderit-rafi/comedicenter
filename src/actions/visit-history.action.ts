"use server";

import { API, QueryParams } from "@/lib/fetch";
import { revalidatePath } from "next/cache";

export const getVisitHisory = async (queryParams: QueryParams) => {
  return await API.GetAll("visit_history", queryParams);
};

export const getVisitHistoryPaginate = async (
  queryParams: QueryParams,
  pagesLoaded: number,
) => {
  const response = await API.GetAll("visit_history", {
    limit: 10,
    offset: (pagesLoaded - 1) * 10,
    where: queryParams.where,
    sort: [["created_at", "desc"]],
  });
  revalidatePath("visit-history-patient");
  return response;
};
