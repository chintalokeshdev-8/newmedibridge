import PageHeader from "@/components/shared/PageHeader";
import UsersTable from "@/components/settings/UsersTable";
import { users } from "@/lib/data";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Settings & User Management" />
      <main className="flex-1 p-4 md:p-6">
        <UsersTable initialUsers={users} />
      </main>
    </div>
  );
}
