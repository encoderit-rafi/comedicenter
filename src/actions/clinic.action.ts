"use server";

import { API, ApiResponse } from "@/lib/fetch";
import { commonErrorHandler } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const getClinics = async (options: any) => {
  const { error, data } = await API.GetAll("user/search", options);
  return { error, data };
};
export const getPublicClinics = async (options: any) => {
  console.log(options);

  const { error, data } = await API.GetAll("user/search-public", options);

  return { error, data };
};
export const getSpecialties = async () => {
  return await API.GetAll("specialties", { limit: -1 });
};
export const getService = async () => {
  const { error, data } = await API.GetAll("service", {
    limit: -1,
    populate: ["service_categories"],
    sort: [["created_at", "desc"]],
  });
  return { error, data };
};

export const postDoctorClinic = async (item: any) => {
  try {
    // const payload = { clinic_id: clinicId };
    const res: ApiResponse = await API.Post("doctor_clinic", item);
    if (!!res?.error) throw new Error(res?.message);
    revalidatePath("users");
    return { error: null, data: res.data };
  } catch (error) {
    return commonErrorHandler(error);
  }
};
export const postEditDoctorClinic = async (item: any, uid: string) => {
  try {
    const res: ApiResponse = await API.Post(`doctor_clinic/${uid}`, item);
    if (!!res?.error) throw new Error(res?.message);
    revalidatePath("users");
    return { error: null, data: res.data };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

export const fetchDoctorClinic = async (myData: any) => {
  if (!myData?.user?.id || !myData?.user?.clinic?.id) return null;
  try {
    const { data: doctorClinic, error } = await API.Get("doctor_clinic/find", {
      where: {
        user_id: myData.user.id,
        clinic_id: myData.user.clinic.id,
      },
    });
    if (error) throw new Error(JSON.stringify(error));
    return doctorClinic?.doctor_clinic;
  } catch (err) {
    console.error("Error fetching doctor clinic data:", err);
    return null;
  }
};
