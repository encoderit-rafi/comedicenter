import {
  getDoctorClinic,
  getMyData,
  getServiceData,
  getSpecialtiesServer,
  getUsers,
} from "@/actions/admin.clinic.action";
import { auth } from "@/auth";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { Metadata } from "next";
import UsersList from "./components/users-list";

export const metadata: Metadata = {
  title: "Users",
  description: "Users",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  let session;
  try {
    session = await auth();
  } catch (error) {
    console.error("Error authenticating user:", error);
    session = null;
  }

  const { data: myData } = await getMyData();

  const [specialties, services, doctorClinic, users] = await Promise.all([
    getSpecialtiesServer(),
    getServiceData("service"),
    // getServiceCat("service_category"),
    getDoctorClinic(myData?.user?.id, myData?.user?.clinic?.id),
    getUsers(myData?.user?.clinic?.uid),
  ]);

  if (
    !users?.data ||
    !specialties?.data ||
    !services?.data ||
    // !serviceCategories?.data ||
    !myData ||
    !doctorClinic?.data
  ) {
    throw new Error("Something went wrong while fetching data.");
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Users" }]} />
      <div className="container mx-auto min-h-[calc(100vh-300px)] py-8">
        <UsersList
          users={users.data?.doctor_clinics}
          specialties={specialties.data?.data}
          services_data={services.data}
          // serviceCategory={serviceCategories.data}
          session={session}
          doctorClinic={doctorClinic.data}
          myData={myData}
        />
      </div>
    </>
  );
}
