import PageHeader from '@/components/shared/PageHeader';
import AppointmentList from '@/components/dashboard/AppointmentList';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { appointments, patients } from '@/lib/data';
import { Users, Calendar, Stethoscope } from 'lucide-react';

export default function DoctorDashboardPage() {
  const upcomingAppointments = appointments.filter(a => a.status === 'Scheduled' && a.doctor.name === 'Dr. Emily Carter');

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Doctor Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    <Users className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">{patients.length}</div>
                    <p className="text-xs text-muted-foreground">
                        Patients under your care
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">{upcomingAppointments.length}</div>
                     <p className="text-xs text-muted-foreground">
                        Scheduled for today & tomorrow
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Department</CardTitle>
                    <Stethoscope className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Cardiology</div>
                     <p className="text-xs text-muted-foreground">
                        Your primary specialization
                    </p>
                </CardContent>
            </Card>
        </div>
        <AppointmentList appointments={upcomingAppointments} />
      </main>
    </div>
  );
}
