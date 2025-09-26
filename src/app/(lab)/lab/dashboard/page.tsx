'use client';
import { useState } from 'react';
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestTube, FileUp, CheckCircle, Clock, FileText, User } from 'lucide-react';
import { patients as initialPatients } from "@/lib/data";
import type { Patient, LabReport } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function LabDashboardPage() {
    const { toast } = useToast();
    const [patients, setPatients] = useState<Patient[]>(initialPatients);
    const [selectedPatientId, setSelectedPatientId] = useState<string>('');
    const [selectedTestId, setSelectedTestId] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

    const selectedPatient = patients.find(p => p.id === selectedPatientId);
    const pendingReports = selectedPatient?.labReports.filter(r => r.status === 'Pending') || [];

    const handlePatientChange = (patientId: string) => {
        setSelectedPatientId(patientId);
        setSelectedTestId('');
        setFile(null);
    };

    const handleUpload = () => {
        if (!selectedPatientId || !selectedTestId || !file) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please select a patient, a pending test, and a file to upload.',
            });
            return;
        }

        // Simulate upload and update state
        setPatients(prevPatients => 
            prevPatients.map(p => {
                if (p.id === selectedPatientId) {
                    const updatedLabReports = p.labReports.map(report => {
                        if (report.id === selectedTestId) {
                            return { 
                                ...report, 
                                status: 'Completed' as const, 
                                fileUrl: URL.createObjectURL(file) // temporary URL for display
                            };
                        }
                        return report;
                    });
                    return { ...p, labReports: updatedLabReports };
                }
                return p;
            })
        );
        
        toast({
            title: 'Upload Successful',
            description: `Report for ${selectedPatient?.name} has been uploaded and status updated to 'Completed'.`,
        });

        // Reset form
        setSelectedTestId('');
        setFile(null);
        const fileInput = document.getElementById('report-file') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Lab Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tests Today</CardTitle>
              <TestTube className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">24</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Pending</CardTitle>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{patients.flatMap(p => p.labReports).filter(r => r.status === 'Pending').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Completed</CardTitle>
              <CheckCircle className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{patients.flatMap(p => p.labReports).filter(r => r.status === 'Completed').length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <User className="w-6 h-6" /> Patient Report Management
            </CardTitle>
            <CardDescription>Select a patient to view their lab reports and upload new results.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2 max-w-md">
                <Label htmlFor="patient">Select Patient</Label>
                 <Select onValueChange={handlePatientChange} value={selectedPatientId}>
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Select a patient..." />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name} ({p.id})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            
            {selectedPatient && (
                <>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                             <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-primary"/> Pending Reports</h3>
                             <ul className="space-y-2">
                                {pendingReports.length > 0 ? pendingReports.map(report => (
                                    <li key={report.id} className="flex justify-between items-center text-sm p-2 rounded-md border">
                                        <div>
                                            <p className="font-medium">{report.testName}</p>
                                            <p className="text-muted-foreground">Date: {report.date}</p>
                                        </div>
                                        <Badge variant='default' className='bg-yellow-500/20 text-yellow-700 border-yellow-500/20'>Pending</Badge>
                                    </li>
                                )) : <p className='text-sm text-muted-foreground'>No pending reports for this patient.</p>}
                             </ul>
                        </div>
                         <div>
                             <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary"/> Completed Reports</h3>
                             <ul className="space-y-2">
                                {selectedPatient.labReports.filter(r => r.status === 'Completed').map(report => (
                                     <li key={report.id} className="flex justify-between items-center text-sm p-2 rounded-md border">
                                        <div>
                                            <p className="font-medium">{report.testName}</p>
                                            <p className="text-muted-foreground">Date: {report.date}</p>
                                        </div>
                                        <Badge variant='secondary' className='bg-green-500/20 text-green-700 border-green-500/20'>Completed</Badge>
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>
                     <Separator />
                    <div>
                         <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><FileUp className="w-5 h-5 text-primary"/> Upload New Report</h3>
                        <div className="space-y-4 max-w-md">
                            <div className="space-y-2">
                                <Label htmlFor="test-type">Pending Test</Label>
                                <Select onValueChange={setSelectedTestId} value={selectedTestId} disabled={pendingReports.length === 0}>
                                <SelectTrigger id="test-type">
                                    <SelectValue placeholder={pendingReports.length > 0 ? "Select a pending test to upload..." : "No pending tests"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {pendingReports.map(report => (
                                        <SelectItem key={report.id} value={report.id}>{report.testName}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="report-file">Report File</Label>
                                <Input 
                                    id="report-file" 
                                    type="file" 
                                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} 
                                    disabled={!selectedTestId}
                                    className="file:bg-primary file:text-primary-foreground file:hover:bg-primary/90 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handleUpload} disabled={!selectedTestId || !file}>
                                    <FileUp className="mr-2 h-4 w-4" /> Upload
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
