import { getUserData, getVisitHistory } from "@/actions/my-data.action";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import ClinicDetail from "./components/clinic-detail";

export const dynamic = "force-dynamic";

export default async function Home() {
  const MyData = await getUserData();
  const VisitedHistory = await getVisitHistory(MyData?.user?.clinic_id);

  return (
    <main>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Clinic" }]} />
      <ClinicDetail VisitedHistory={VisitedHistory} MyData={MyData} />
    </main>
  );
}
