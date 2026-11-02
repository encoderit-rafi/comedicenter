"use server";
import { signIn, signOut } from "@/auth";
import { API, ApiResponse } from "@/lib/fetch";
import { commonErrorHandler, transformMemberData } from "@/lib/utils";
import {
  createUserSchema,
  editProfileSchema,
  emailSchema,
  formSchema,
  resetPasswordSchema,
  signUpSchema,
  subscriptionSchema,
} from "@/schema/auth.schema";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const Login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    // await signOut();
    const res = await signIn("credentials", {
      username,
      password,
      info: JSON.stringify({ type: "Patient" }),
      redirect: false,
    });
    // ('res',res);

    if (!!res) {
      return { error: null, data: "Login success" };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return {
            error: "Invalid credentials.",
            data: null,
          };
        default:
          return { error: "Something went wrong", data: null };
      }
    }
  }
};

export const LoginAsProvider = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const res = await signIn("credentials", {
      username,
      password,
      info: JSON.stringify({ type: "ClinicAdmin" }),
      redirect: false,
    });

    if (!!res) {
      return { error: null, data: "Login success" };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return {
            error: "Invalid credentials.",
            data: null,
          };
        default:
          return { error: "Something went wrong", data: null };
      }
    }
  }
};

export const LogOut = async (session_id: any) => {
  try {
    // ('alaaaaaaaaa');

    await signOut();
    //  ("sdfbdskf alan");

    await API.Post("auth/logout", {
      session_id: session_id,
    });
  } catch (error) {
    return commonErrorHandler(error);
  }
};

export const postForgotPasswordEmail = async (
  data: Pick<z.infer<typeof formSchema>, "email">,
  role: string,
) => {
  try {
    const res: ApiResponse = await API.Post(
      "auth/password/forgot",
      { email: data?.email, role },
      undefined,
      { auth: false },
    );
    if (!!res?.error) throw new Error(res?.message);
    return { error: null, data: res.data };
  } catch (error: any) {
    return commonErrorHandler(error);
  }
};

export const postChangeEmail = async (
  data: Pick<z.infer<typeof formSchema>, "email">,
) => {
  try {
    const res: ApiResponse = await API.Post("user/changeEmail", {
      email: data?.email,
    });
    if (!!res?.error) throw new Error(res?.message);
    return { error: null, data: res.data };
  } catch (error: any) {
    if (error.message === "Record not found") {
      return commonErrorHandler({
        message: "This email is not registered",
      });
    }
    return commonErrorHandler(error);
  }
};

export const postCode = async (otp: string, session_id: string | null) => {
  const res = await API.Post(
    "auth/otp/verify",
    { otp, session_id },
    undefined,
    { auth: false },
  );
  return res;
};

export const postResendCode = async (session_id: string | null) => {
  try {
    if (!session_id) {
      throw new Error("Session ID is required to resend the code.");
    }
    const res = await API.Post("auth/otp/send", { session_id }, undefined, {
      auth: false,
    });

    // Check if the API returned an error
    if (!res || res.error) {
      throw new Error(res?.error || "Failed to send code. Please try again.");
    }

    return res; // Return successful response
  } catch (error: any) {
    console.error("Error in postResendCode:", error.message);
    return {
      error: error.message || "An unexpected error occurred",
      statusCode: 500,
    };
  }
};

export const postResetPassword = async (
  data: z.infer<typeof resetPasswordSchema>,
  session_id: string | null,
) => {
  const { newPassword } = data;

  const res = await API.Post(
    "auth/password/reset",
    { password: newPassword, session_id },
    undefined,
    { auth: false },
  );
  return res;
};

export const postRegister = async (data: z.infer<typeof signUpSchema>) => {
  const { name, email, phoneNumber, password } = data;
  const res = await API.Post("user", {
    role: "Patient",
    name: name,
    email: email,
    phone: phoneNumber.replace(/\D/g, "") || "",
    // phone: phoneNumber,
    password: password,
  });
  return res;
};

export const postEditProfile = async (
  data: z.infer<typeof editProfileSchema>,
) => {
  const { name, email, phone, avatar } = data;
  const res = await API.Put("user/me", {
    name: name,
    email: email,
    phone: phone,
    avatar: avatar,
  });
  // (res,"resresresres");
  if (res.statusCode === 401) {
    await signOut({ redirect: false });
  }
  return res;
};

export const handleFileUpload = async (fileName: string) => {
  try {
    const signedUrl = await API.Post("user/getSignedURL", {
      keys: [fileName],
    });

    signedUrl;
    if (signedUrl.statusCode === 401) {
      await signOut({ redirect: false });
    }
    return { data: signedUrl, error: false };
  } catch (error) {
    return { error: true, data: null };
  }
};

export const postSignedURLs = async (fileNames: string[]) => {
  try {
    const signedUrl = await API.Post("user/getSignedURL", {
      keys: fileNames,
    });

    signedUrl;
    if (signedUrl.statusCode === 401) {
      await signOut({ redirect: false });
    }
    return { data: signedUrl, error: false };
  } catch (error) {
    return { error: true, data: null };
  }
};

export const postProfileEmailUpdate = async (
  data: z.infer<typeof emailSchema>,
) => {
  const { email } = data;
  const res = await API.Post("auth/send", {
    email: email,
  });
  if (res.statusCode === 401) {
    await signOut({ redirect: false });
  }
  return res;
};

export const postSubscription = async (
  data: z.infer<typeof subscriptionSchema>,
) => {
  const { stripe_token, plan_uid, members_data, is_renew } = data;
  const res = await API.Post("subscriptions", {
    stripe_token: stripe_token,
    plan_uid: plan_uid,
    members_data: transformMemberData(members_data as any),
    is_renew: is_renew,
  });
  // (res,"res-sub");
  if (res.statusCode === 401) {
    await signOut({ redirect: false });
  }
  return res;
};

export const postCreateUser = async (
  data: z.infer<typeof createUserSchema>,
  selectedServiceUid: string,
) => {
  const {
    name,
    email,
    phone,
    role,
    speciality_uid,
    service_uid,
    service_category_uid,
    license,
    avatar,
  } = data;
  const res = await API.Post("user/add", {
    name: name,
    email: email,
    phone: phone.replace(/\D/g, "") || "",
    role: role,
    speciality_uid: speciality_uid,
    service_uid: selectedServiceUid,
    service_category_uid: service_category_uid,
    license: license,
    avatar: avatar,
  });
  if (res.statusCode === 401) {
    await signOut({ redirect: false });
  }
  return res;
};

export const postUpdateUser = async (
  data: z.infer<typeof createUserSchema>,
  uid: string,
  selectedServiceUid: string,
) => {
  const {
    name,
    email,
    phone,
    role,
    speciality_uid,
    service_uid,
    service_category_uid,
    license,
    avatar,
  } = data;

  const res = await API.Put(`user/${uid}`, {
    name: name,
    email: email,
    phone: phone.replace(/\D/g, "") || "",
    role: role,
    speciality_uid: speciality_uid,
    service_uid: selectedServiceUid,
    service_category_uid: service_category_uid,
    license: license,
    avatar: avatar,
  });
  if (res.statusCode === 401) {
    await signOut({ redirect: false });
  }
  return res;
};

export const revalidatePageFromClient = async (entity: string) => {
  await revalidatePath(entity);
};
