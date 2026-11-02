import { auth } from "@/auth";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { Metadata } from "next";
import { EditForm } from "./components/edit-form";
export const metadata: Metadata = {
  title: "Edit profile",
  description: "Edit profile",
};
export const dynamic = "force-dynamic";
export default async function EditProfile() {
  const session = await auth();
  // (session,"session222222222")
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "My Profile", href: "/profile" },
          { label: "Edit Profile" },
        ]}
      />

      <div className="mx-auto flex min-h-[calc(100vh-300px)] max-w-xl flex-col justify-center p-4">
        <div className="overflow-hidden rounded-[12px]  bg-white shadow ">
          <EditForm
            session_name={session?.user?.name ?? ""}
            session_email={session?.user?.email ?? ""}
            session_phone={session?.user?.phone ?? ""}
            session_avatar={session?.user?.avatar ?? ""}
          />
        </div>
      </div>
    </>
  );
}
