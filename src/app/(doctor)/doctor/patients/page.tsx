import Link from 'next/link';
import PageHeader from "@/components/shared/PageHeader";
import { patients } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

export default function PatientsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Your Patients" />
      <main className="flex-1 p-4 md:p-6">
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
      </main>
    </div>
  );
}
