import PageHeader from "@/components/shared/PageHeader";
import DoctorsTable from "@/components/doctors/DoctorsTable";
import { doctors } from "@/lib/data";

export default function DoctorsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Doctor Management" />
      <main className="flex-1 p-4 md:p-6">
        <DoctorsTable initialDoctors={doctors} />
      </main>
    </div>
  );
}
