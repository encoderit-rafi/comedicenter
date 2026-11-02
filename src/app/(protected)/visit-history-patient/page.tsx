import { getMyClinic } from "@/actions/clinic-switch.action";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import VisitHistoryContent from "./components/visit-history-content";
export const dynamic = "force-dynamic";

export default async function VisitHistoryPatientPage(props: {
  searchParams?: Promise<{
    search?: string;
    status?: string;
    page?: string;
    fromDate?: string;
    toDate?: string;
    sort?: string;
  }>;
}) {
  const params = (await props.searchParams) || {};
  const MyData = await getMyClinic();
  return (
    <div>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Visit History" }]}
      />
      <VisitHistoryContent params={params} MyData={MyData} />
    </div>
  );
}
