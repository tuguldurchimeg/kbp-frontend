import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import data from "@/lib/data.json";

export default function WorkspaceDashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <DataTable data={data} />
        </div>
      </div>
    </main>
  );
}
