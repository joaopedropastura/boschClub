import DataTableSchedules from "@/components/admin/schedules/schedules-table";

export default function AdminSchedulesPage() {
  return (
    <div className="h-full flex flex-row w-full">
      <div className="flex flex-col w-full">
        <div className="w-full">
          <h1>vai toma</h1>
          <DataTableSchedules />
        </div>
      </div>
    </div>
  );
}