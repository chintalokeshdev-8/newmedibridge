'use client';
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { patients } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function OnlineBookingsPage() {
  // Simulating online bookings by filtering for a specific patient for now
  const onlineBookedReports = patients.find(p => p.id === 'P007')?.labReports || [];

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Online Test Bookings" />
      <main className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle>Patient-Booked Tests</CardTitle>
                <CardDescription>A list of tests booked directly by patients via the portal.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient</TableHead>
                            <TableHead>Test Name</TableHead>
                            <TableHead>Booking Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {onlineBookedReports.length > 0 ? (
                            onlineBookedReports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-medium">Mahesh (P007)</TableCell>
                                    <TableCell>{report.testName}</TableCell>
                                    <TableCell>{report.date}</TableCell>
                                    <TableCell>
                                         <Badge variant={report.status === 'Pending' ? 'default' : 'secondary'}
                                            className={report.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500/20' : 'bg-green-500/20 text-green-700 border-green-500/20'}
                                            >{report.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                No online bookings found.
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
