import PageHeader from '@/components/shared/PageHeader';
import StatCards from '@/components/dashboard/StatCards';
import AppointmentList from '@/components/dashboard/AppointmentList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { users, doctors, labs, appointments } from '@/lib/data';

export default function DashboardPage() {
  const upcomingAppointments = appointments.filter(a => a.status === 'Scheduled');

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <StatCards 
          totalDoctors={doctors.length}
          totalLabs={labs.length}
          upcomingAppointments={upcomingAppointments.length}
          totalUsers={users.length}
        />
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
