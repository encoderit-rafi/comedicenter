"use client";
import { useRouter } from "next/navigation";

function ClinicRedirect({ error, doctors, data }: any) {
  const router = useRouter();
  console.log(data);

  if (
    (error?.code === "DOCTOR_NOT_FOUND" ||
      data?.doctor?.doctor_clinic.role === "Staff") &&
    doctors?.data?.users?.length !== 0
  ) {
    router.push("/our-providers");
  }
  return null;
}

export default ClinicRedirect;
