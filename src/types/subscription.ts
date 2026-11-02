export type Plan = {
  id: number;
  uid: string;
  planName: string;
  interval: string;
  interval_count: number;
  type: string;
};

export type Subscription = {
  subscriptions: any;
  Cosmetic: any;
  Wellness: any;
  Dental: any;
  plan: Plan;
  id: number;
  active: boolean;
  created_by: number;
  updated_by: number;
  deleted_by: number | null;
  uid: string;
  stripeSubscriptionId: string;
  user_id: number;
  planId: number;
  status: boolean;
  subscription_amount: number;
  nextBillingDate: string;
  startDate: string;
  endDate: string;
  members_data: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export enum SubscriptionType {
  Dental = "Dental",
  Cosmetic = "Cosmetic",
  Wellness = "Wellness",
  All = "All",
}
export enum TabType {
  DENTAL = "dental",
  COSMETIC = "cosmetic",
  WELLNESS = "wellness",
  All = "all",
}
