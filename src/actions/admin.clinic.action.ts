"use server";

import { getSpecialties } from "@/actions/clinic.action";
import { signOut } from "@/auth";
import { API, ApiResponse } from "@/lib/fetch";
import { commonErrorHandler } from "@/lib/utils";
import { revalidatePath } from "next/cache";
// Get My Info

export const getMyData = async () => {
  try {
    const res = await API.GetAll("user/me", {
      populate: [
        "clinic.location",
        "doctor_clinics",
        "doctor_clinics.clinic",
        "doctor_clinics.clinic.location",
      ],
    });
    if (res.error) throw new Error(res.message);
    if (res.statusCode === 401) {
      await signOut({ redirect: false });
    }
    return { data: res.data, error: null };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

export const getDoctorClinic = async (userId: string, clinicId: string) => {
  try {
    const res = await API.Get("doctor_clinic/find", {
      where: {
        user_id: userId,
        clinic_id: clinicId,
      },
    });
    if (res.statusCode === 401) {
      await signOut({ redirect: false });
    }
    if (res.error) throw new Error(res.message);
    return { data: res.data, error: null };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

// Get Service
export const getServiceData = async (endpoint: string) => {
  try {
    const res = await API.GetAll(endpoint, { limit: 50 });
    if (res.statusCode === 401) {
      await signOut({ redirect: false });
    }
    if (res.error) throw new Error(res.message);
    return { data: res.data, error: null };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

export const getServiceCat = async (endpoint: string, servce_id: string) => {
  try {
    const res = await API.GetAll(endpoint, {
      limit: 50,
      where: {
        service_id: servce_id,
      },
    });
    if (res.statusCode === 401) {
      await signOut({ redirect: false });
    }
    if (res.error) throw new Error(res.message);
    return { data: res.data, error: null };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

// Get Users List
export const getUsers = async (clinicUid: string) => {
  try {
    const res = await API.GetAll(`doctor_clinic/${clinicUid}`, {
      limit: 50,
      sort: [["created_at", "asc"]],
    });
    if (res.statusCode === 401) {
      await signOut({ redirect: false });
    }
    if (res.error) throw new Error(res.message);
    return { data: res.data, error: null };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

// Get Specialties
export const getSpecialtiesServer = async () => {
  try {
    const data = await getSpecialties();
    if (data.statusCode === 401) {
      await signOut({ redirect: false });
    }
    return { data, error: null };
  } catch (error) {
    return commonErrorHandler(error);
  }
};

export const GetClinicUser = async (id: string) => {
  try {
    const res: ApiResponse = await API.Get(`doctor_clinic/${id}`);
    if (res.statusCode === 401) {
      await signOut({ redirect: false });
    }
    if (!!res?.error) throw new Error(res?.message);
    revalidatePath("users");
    return { error: null, data: res.data };
  } catch (error) {
    return commonErrorHandler(error);
  }
};
