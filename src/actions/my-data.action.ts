"use server";

import { API } from "@/lib/fetch";

async function fetchData(endpoint: string, options = {}) {
  try {
    const { data = [], error } = await API.GetAll(endpoint, options);
    if (error) throw new Error(error);
    return data;
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return [];
  }
}

export async function getUserData() {
  return await fetchData("user/me", {
    populate: [
      "clinic.location",
      "doctor_clinics",
      "doctor_clinics.clinic",
      "doctor_clinics.clinic.location",
    ],
  });
}

export async function getVisitHistory(clinicId: string) {
  if (!clinicId) return [];

  return await fetchData("visit_history", {
    limit: 5,
    sort: [["created_at", "desc"]],
    where: { clinic_id: clinicId },
  });
}
