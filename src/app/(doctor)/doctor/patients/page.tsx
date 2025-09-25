
import Link from 'next/link';
import PageHeader from "@/components/shared/PageHeader";
import { patients, appointments } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PatientsPage() {
  const doctorAppointments = appointments.filter(a => a.doctor.name === 'Dr. Emily Carter' && a.status === 'Scheduled');

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Patient Management" />
      <main className="flex-1 p-4 md:p-6">
        <Tabs defaultValue="patients">
          <TabsList className="mb-4">
            <TabsTrigger value="patients">All Patients</TabsTrigger>
            <TabsTrigger value="appointments">Upcoming Appointments</TabsTrigger>
          </TabsList>
          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Patient List</CardTitle>
                <CardDescription>A list of all patients assigned to you.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead><span className="sr-only">View</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map(patient => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/doctor/patients/${patient.id}`}>
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appointments">
             <Card>
              <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>A list of all your scheduled appointments.</CardDescription>
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
                                              className="bg-blue-500/20 text-blue-700 border-blue-500/20"
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
