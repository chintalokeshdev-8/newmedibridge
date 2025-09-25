import PageHeader from "@/components/shared/PageHeader";
import UsersTable from "@/components/settings/UsersTable";
import { users } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/settings/ThemeToggle";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Settings & User Management" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeToggle />
          </CardContent>
        </Card>
        <UsersTable initialUsers={users} />
      </main>
    </div>
  );
}
