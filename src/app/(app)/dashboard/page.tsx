import PageHeader from '@/components/shared/PageHeader';
import DepartmentStats from '@/components/dashboard/DepartmentStats';
import AppointmentList from '@/components/dashboard/AppointmentList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { doctors, appointments } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function DashboardPage() {
  const upcomingAppointments = appointments.filter(a => a.status === 'Scheduled');

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Dashboard">
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </PageHeader>
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <DepartmentStats doctors={doctors} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AppointmentList appointments={upcomingAppointments} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
