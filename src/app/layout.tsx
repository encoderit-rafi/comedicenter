import { fetchDoctorClinic } from "@/actions/clinic.action";
import { getUserData } from "@/actions/my-data.action";
import { auth } from "@/auth";
import Appwrapper from "@/components/context";
import DefaultLayout from "@/components/layouts/default-layout";
import "@/css/satoshi.css";
import "@/css/style.css";
import { API } from "@/lib/fetch";
import "flatpickr/dist/flatpickr.min.css";
import { SessionProvider } from "next-auth/react";
import type React from "react";
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  let session;
  try {
    session = await auth();
  } catch (error) {
    console.error("Error fetching session:", error);
    session = null;
  }
  const MyData = await getUserData();
  const DoctorClinic = await fetchDoctorClinic(MyData);
  const { error, data } = await API.Get("subscriptions/current");
  const isSubscribed = Object.keys(data?.subscriptions || {}).length !== 0;

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-[#f6f8fb]">
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <SessionProvider session={session}>
            <Appwrapper>
              <DefaultLayout
                session={session}
                MyData={MyData}
                DoctorClinic={DoctorClinic}
                isSubscribed={isSubscribed}
              >
                <div className="min-h-[calc(100vh-316px)]">{children}</div>
              </DefaultLayout>
            </Appwrapper>
          </SessionProvider>
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
