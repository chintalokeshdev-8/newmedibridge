
'use client';
import { useState } from 'react';
import Link from 'next/link';
import PageHeader from "@/components/shared/PageHeader";
import { patients as initialPatients, appointments as allAppointments } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { Patient, Appointment } from '@/lib/types';

const getMostRecentAppointment = (patientName: string): Appointment | undefined => {
  return allAppointments
    .filter(a => a.patientName === patientName)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
};

export default function PatientsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPatients = initialPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.token?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Patient Management" />
      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Patient List</CardTitle>
                    <CardDescription>A list of all patients with their latest appointment status.</CardDescription>
                </div>
                 <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                      type="search"
                      placeholder="Search patients..."
                      className="w-full rounded-lg bg-background pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Patient ID / Token</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Latest Appt. Date</TableHead>
                  <TableHead>Latest Appt. Time</TableHead>
                  <TableHead>Latest Appt. Status</TableHead>
                  <TableHead><span className="sr-only">View</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map(patient => {
                  const mostRecentAppointment = getMostRecentAppointment(patient.name);
                  return (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.id} / {patient.token || 'N/A'}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>{mostRecentAppointment?.date || 'N/A'}</TableCell>
                        <TableCell>{mostRecentAppointment?.time || 'N/A'}</TableCell>
                        <TableCell>
                          {mostRecentAppointment ? (
                             <Badge variant={mostRecentAppointment.status === 'Scheduled' ? 'default' : mostRecentAppointment.status === 'Completed' ? 'secondary' : 'destructive'}
                                className={mostRecentAppointment.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-700 border-blue-500/20' : mostRecentAppointment.status === 'Completed' ? 'bg-green-500/20 text-green-700 border-green-500/20' : 'bg-red-500/20 text-red-700 border-red-500/20'}
                                >{mostRecentAppointment.status}</Badge>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/doctor/patients/${patient.id}`}>
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
