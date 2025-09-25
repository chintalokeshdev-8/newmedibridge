import PageHeader from "@/components/shared/PageHeader";
import { appointments } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function DoctorAppointmentsPage() {
    const doctorAppointments = appointments.filter(a => a.doctor.name === 'Dr. Emily Carter');

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Your Appointments" />
      <main className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle>Appointment Schedule</CardTitle>
                <CardDescription>A list of all your scheduled, completed, and canceled appointments.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctorAppointments.length > 0 ? (
                            doctorAppointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell className="font-medium">{appointment.patientName}</TableCell>
                                    <TableCell>{appointment.date}</TableCell>
                                    <TableCell>{appointment.time}</TableCell>
                                    <TableCell>
                                         <Badge variant={appointment.status === 'Scheduled' ? 'default' : appointment.status === 'Completed' ? 'secondary' : 'destructive'}
                                            className={appointment.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-700 border-blue-500/20' : appointment.status === 'Completed' ? 'bg-green-500/20 text-green-700 border-green-500/20' : 'bg-red-500/20 text-red-700 border-red-500/20'}
                                            >{appointment.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                No appointments found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
