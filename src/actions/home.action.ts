"use server";

import { API, ApiResponse } from "@/lib/fetch";
import { commonErrorHandler } from "@/lib/utils";

// Get all subscription plans
export const getAllPlans = async () => {
  try {
    const res: ApiResponse = await API.GetAll("plans", {
      limit: -1,
      sort: [["price", "asc"]],
    });
    if (res.error) throw new Error(res.message);
    return { data: res.data, error: null };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

// Get current subscriptions
export const getCurrentSubscriptions = async () => {
  try {
    const res: ApiResponse = await API.GetAll("subscriptions/current", {
      limit: -1,
    });
    if (res.error) throw new Error(res.message);
    return { data: res.data, error: null };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

// Get user/me
export const getCurrentUser = async () => {
  try {
    const res: ApiResponse = await API.GetAll("user/me");
    if (res.error) throw new Error(res.message);
    return { data: res.data, error: null };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

// Combined data fetcher for home page
export const getHomePageData = async () => {
  try {
    const [plans, subscriptions, user] = await Promise.all([
      getAllPlans(),
      getCurrentSubscriptions(),
      getCurrentUser(),
    ]);

    // Check for errors in any of the responses
    if (plans.error) throw new Error(plans.error);
    if (subscriptions.error) throw new Error(subscriptions.error);
    if (user.error) throw new Error(user.error);

    return {
      data: {
        allsubdata: plans.data || [],
        allcurrentsubdata: subscriptions.data || [],
        myData: user.data || null,
      },
      error: null,
    };
  } catch (error) {
    return commonErrorHandler(error);
  }
};
