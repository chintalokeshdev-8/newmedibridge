'use client';
import { useState } from 'react';
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestTube, FileUp, CheckCircle, Clock, User, BookMarked, PlusCircle, X } from 'lucide-react';
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

    // State for booking new tests
    const [testNames, setTestNames] = useState<string[]>(['']);

    const selectedPatient = patients.find(p => p.id === selectedPatientId);
    const pendingReports = selectedPatient?.labReports.filter(r => r.status === 'Pending') || [];

    const handlePatientChange = (patientId: string) => {
        setSelectedPatientId(patientId);
        setSelectedTestId('');
        setFile(null);
        setTestNames(['']);
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

    const handleTestNameChange = (index: number, value: string) => {
        const newTestNames = [...testNames];
        newTestNames[index] = value;
        setTestNames(newTestNames);
    };

    const addTestNameInput = () => {
        setTestNames([...testNames, '']);
    };

    const removeTestNameInput = (index: number) => {
        const newTestNames = testNames.filter((_, i) => i !== index);
        setTestNames(newTestNames);
    };

    const handleBookTests = () => {
        const validTestNames = testNames.map(t => t.trim()).filter(t => t !== '');
        
        if (!selectedPatient) {
            toast({ variant: 'destructive', title: 'No Patient Selected', description: 'Please select a patient first.' });
            return;
        }
        if (validTestNames.length === 0) {
            toast({ variant: 'destructive', title: 'Missing Test Names', description: 'Please enter at least one test name.' });
            return;
        }
        
        const newReports: LabReport[] = validTestNames.map((testName, index) => ({
            id: `R${String(Date.now() + index)}`,
            testName,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            amount: 500, // Dummy data
            amountPaid: 0,
            paymentStatus: 'Pending'
        }));

        setPatients(prevPatients =>
            prevPatients.map(p =>
                p.id === selectedPatientId
                    ? { ...p, labReports: [...p.labReports, ...newReports] }
                    : p
            )
        );

        toast({
            title: 'Tests Booked Successfully',
            description: `${validTestNames.length} test(s) have been booked for ${selectedPatient.name}.`,
        });

        // Reset booking form
        setTestNames(['']);
    };


  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Lab Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <User className="w-6 h-6" /> Patient Report Management
            </CardTitle>
            <CardDescription>Select a patient to view their lab reports, upload results, or book new tests.</CardDescription>
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Column 1: Reports and Upload */}
                        <div className='space-y-6'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-primary"/> Pending Reports</h3>
                                    <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                        {pendingReports.length > 0 ? pendingReports.map(report => (
                                            <li key={report.id} className="flex justify-between items-center text-sm p-2 rounded-md border">
                                                <div>
                                                    <p className="font-medium">{report.testName}</p>
                                                    <p className="text-muted-foreground">Date: {report.date}</p>
                                                </div>
                                                <Badge variant='default' className='bg-yellow-500/20 text-yellow-700 border-yellow-500/20'>Pending</Badge>
                                            </li>
                                        )) : <p className='text-sm text-muted-foreground'>No pending reports.</p>}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary"/> Completed Reports</h3>
                                    <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
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
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><FileUp className="w-5 h-5 text-primary"/> Upload Report</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="test-type">Pending Test</Label>
                                        <Select onValueChange={setSelectedTestId} value={selectedTestId} disabled={pendingReports.length === 0}>
                                        <SelectTrigger id="test-type">
                                            <SelectValue placeholder={pendingReports.length > 0 ? "Select a test to upload..." : "No pending tests"} />
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
                        </div>

                        {/* Column 2: Book New Test */}
                        <div>
                             <Card className="bg-muted/30">
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <BookMarked className="w-5 h-5" /> Book New Tests
                                    </CardTitle>
                                    <CardDescription>Register new lab tests for {selectedPatient.name}.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {testNames.map((testName, index) => (
                                        <div key={index} className="space-y-2">
                                            <Label htmlFor={`testName-${index}`} className="text-xs">Test Name {index + 1}</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    id={`testName-${index}`}
                                                    placeholder="e.g., Complete Blood Count"
                                                    value={testName}
                                                    onChange={(e) => handleTestNameChange(index, e.target.value)}
                                                />
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => removeTestNameInput(index)}
                                                    disabled={testNames.length === 1}
                                                    className="text-muted-foreground hover:text-destructive shrink-0"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='flex justify-between items-center pt-2'>
                                        <Button variant="outline" size="sm" onClick={addTestNameInput}>
                                            <PlusCircle className="mr-2 h-4 w-4" /> Add Test
                                        </Button>
                                        <Button onClick={handleBookTests}>
                                            <BookMarked className="mr-2 h-4 w-4" /> Book All Tests
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
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
