'use client';
import { useState, useMemo } from 'react';
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { patients as initialPatients } from "@/lib/data";
import type { LabReport, Patient } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { FileUp, Download } from 'lucide-react';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type OnlineBooking = {
  patient: Patient;
  report: LabReport;
};

const UploadReportDialog = ({ booking, open, onOpenChange, onUploadSuccess }: { booking: OnlineBooking, open: boolean, onOpenChange: (open: boolean) => void, onUploadSuccess: (patientId: string, reportId: string, fileUrl: string) => void }) => {
    const { toast } = useToast();
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = () => {
        if (!file) {
            toast({ variant: 'destructive', title: 'No file selected', description: 'Please choose a file to upload.' });
            return;
        }
        
        const fileUrl = URL.createObjectURL(file);
        onUploadSuccess(booking.patient.id, booking.report.id, fileUrl);
        toast({ title: 'Upload Successful', description: `Report for ${booking.report.testName} has been uploaded.` });
        onOpenChange(false);
        setFile(null);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Report: {booking.report.testName}</DialogTitle>
                    <DialogDescription>
                        For patient: {booking.patient.name} ({booking.patient.id})
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Input 
                        id="report-file" 
                        type="file" 
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} 
                        className="file:bg-primary file:text-primary-foreground file:hover:bg-primary/90 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleUpload} disabled={!file}>
                        <FileUp className="mr-2 h-4 w-4" /> Upload
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


const ViewReportDialog = ({ report, open, onOpenChange }: { report: LabReport | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh]">
                <DialogHeader>
                    <DialogTitle>{report?.testName}</DialogTitle>
                    <DialogDescription>Date: {report?.date}</DialogDescription>
                </DialogHeader>
                {report?.fileUrl && (
                    <div className="relative h-full">
                        <Image src={report.fileUrl} layout="fill" objectFit="contain" alt="Lab Report" />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default function OnlineBookingsPage() {
  const [patients, setPatients] = useState(initialPatients);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<OnlineBooking | null>(null);
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedReportToView, setSelectedReportToView] = useState<LabReport | null>(null);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);

  const patientsWithOnlineBookings = useMemo(() => {
    return patients.filter(p => p.labReports.some(r => r.bookingSource === 'Online'));
  }, [patients]);
  
  const onlineBookedReports: OnlineBooking[] = useMemo(() => {
    if (!selectedPatientId) return [];
    
    const patient = patients.find(p => p.id === selectedPatientId);
    if (!patient) return [];

    return patient.labReports
      .filter(report => report.bookingSource === 'Online')
      .map(report => ({ patient, report }));
  }, [patients, selectedPatientId]);

  const handleUploadClick = (booking: OnlineBooking) => {
    setSelectedBooking(booking);
    setUploadDialogOpen(true);
  };
  
  const handleViewClick = (report: LabReport) => {
      setSelectedReportToView(report);
      setViewDialogOpen(true);
  };

  const handleUploadSuccess = (patientId: string, reportId: string, fileUrl: string) => {
    setPatients(prevPatients =>
      prevPatients.map(p => {
        if (p.id === patientId) {
          return {
            ...p,
            labReports: p.labReports.map(r =>
              r.id === reportId ? { ...r, status: 'Completed', fileUrl } : r
            ),
          };
        }
        return p;
      })
    );
  };


  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Online Test Bookings" />
      <main className="flex-1 p-4 md:p-6">
        <Card>
            <CardHeader>
                <CardTitle>Patient-Booked Tests</CardTitle>
                <CardDescription>Select a patient to view tests booked directly via the portal and manage their reports.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6 max-w-sm space-y-2">
                    <Label htmlFor="patient-filter">Filter by Patient</Label>
                    <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                        <SelectTrigger id="patient-filter">
                            <SelectValue placeholder="Select a patient..." />
                        </SelectTrigger>
                        <SelectContent>
                            {patientsWithOnlineBookings.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.name} ({p.id})</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient</TableHead>
                            <TableHead>Test Name</TableHead>
                            <TableHead>Booking Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedPatientId ? (
                            onlineBookedReports.length > 0 ? (
                                onlineBookedReports.map((booking) => (
                                    <TableRow key={booking.report.id}>
                                        <TableCell className="font-medium">{booking.patient.name} ({booking.patient.id})</TableCell>
                                        <TableCell>{booking.report.testName}</TableCell>
                                        <TableCell>{booking.report.date}</TableCell>
                                        <TableCell>
                                             <Badge variant={booking.report.status === 'Pending' ? 'default' : 'secondary'}
                                                className={booking.report.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500/20' : 'bg-green-500/20 text-green-700 border-green-500/20'}
                                                >{booking.report.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {booking.report.status === 'Pending' ? (
                                                <Button size="sm" onClick={() => handleUploadClick(booking)}>
                                                    <FileUp className="mr-2 h-4 w-4" /> Upload
                                                </Button>
                                            ) : (
                                                <Button variant="outline" size="sm" onClick={() => handleViewClick(booking.report)}>
                                                    <Download className="mr-2 h-4 w-4" /> View
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No online bookings found for this patient.
                                    </TableCell>
                                </TableRow>
                            )
                        ) : (
                             <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    Please select a patient to view their online bookings.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        {selectedBooking && (
            <UploadReportDialog 
                booking={selectedBooking} 
                open={isUploadDialogOpen} 
                onOpenChange={setUploadDialogOpen}
                onUploadSuccess={handleUploadSuccess} 
            />
        )}
         <ViewReportDialog 
            report={selectedReportToView}
            open={isViewDialogOpen}
            onOpenChange={setViewDialogOpen}
        />
      </main>
    </div>
  );
}
