
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import PageHeader from "@/components/shared/PageHeader";
import { patients, doctors } from "@/lib/data";
import type { LabReport, Patient, Prescription } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { FilePlus, User, Heart, Droplet, Calendar, Pill, Lock, FileText, Download, Activity, Pencil, History } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PinVerification = ({ onVerify }: { onVerify: (pin: string) => void }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d{0,4}$/.test(value)) {
            setPin(value);
            setError('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin.length === 4) {
            onVerify(pin);
        } else {
            setError('PIN must be 4 digits.');
        }
    };

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>PIN Verification Required</CardTitle>
                <CardDescription>Enter the patient's 4-digit security PIN to access their details.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2 text-center">
                        <Label htmlFor="pin">Patient Security PIN</Label>
                        <Input
                            id="pin"
                            type="password"
                            value={pin}
                            onChange={handlePinChange}
                            maxLength={4}
                            className="text-2xl tracking-[1em] text-center w-48 mx-auto"
                            placeholder="----"
                        />
                        {error && <p className="text-destructive text-sm">{error}</p>}
                    </div>
                    <Button type="submit" className="w-full">
                        <Lock className="mr-2" /> Unlock Details
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

const EditPatientDialog = ({ patient, onSave, onOpenChange, open }: { patient: Patient, onSave: (updatedPatient: Patient) => void, open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [name, setName] = useState(patient.name);
    const [age, setAge] = useState(patient.age.toString());
    const [gender, setGender] = useState<Patient['gender']>(patient.gender);
    const [bloodGroup, setBloodGroup] = useState(patient.bloodGroup);
    const [activeConditions, setActiveConditions] = useState(patient.activeConditions.join('\n'));
    const [currentMedications, setCurrentMedications] = useState(patient.currentMedications.join('\n'));

    const handleSave = () => {
        const updatedPatient: Patient = {
            ...patient,
            name,
            age: parseInt(age, 10),
            gender,
            bloodGroup,
            activeConditions: activeConditions.split('\n').filter(c => c.trim() !== ''),
            currentMedications: currentMedications.split('\n').filter(m => m.trim() !== ''),
        };
        onSave(updatedPatient);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Patient Details: {patient.name}</DialogTitle>
                    <DialogDescription>
                        Update the patient's information below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="age" className="text-right">Age</Label>
                        <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="gender" className="text-right">Gender</Label>
                        <Select onValueChange={(value: Patient['gender']) => setGender(value)} value={gender}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bloodGroup" className="text-right">Blood Group</Label>
                        <Input id="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="conditions" className="text-right pt-2">Active Conditions</Label>
                        <Textarea
                            id="conditions"
                            value={activeConditions}
                            onChange={(e) => setActiveConditions(e.target.value)}
                            placeholder="One condition per line..."
                            className="col-span-3 h-24"
                        />
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="medications" className="text-right pt-2">Current Medications</Label>
                        <Textarea
                            id="medications"
                            value={currentMedications}
                            onChange={(e) => setCurrentMedications(e.target.value)}
                            placeholder="One medication per line..."
                            className="col-span-3 h-24"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default function PatientDetailPage() {
    const params = useParams();
    const initialPatient = patients.find(p => p.id === params.id);
    const { toast } = useToast();
    
    const [patient, setPatient] = useState(initialPatient);
    const [isUnlocked, setUnlocked] = useState(false);
    const [medication, setMedication] = useState('');
    const [dosage, setDosage] = useState('');
    const [notes, setNotes] = useState('');

    const [selectedReport, setSelectedReport] = useState<LabReport | null>(null);
    const [isReportOpen, setReportOpen] = useState(false);
    const [isEditPatientOpen, setEditPatientOpen] = useState(false);

    const doctor = doctors.find(d => d.id === patient?.primaryDoctorId);
    
    const patientDoctorAppointments = patient?.appointments.filter(appt => appt.doctor.name === doctor?.name) || [];

    const handlePinVerify = (pin: string) => {
        if (patient && patient.pin === pin) {
            setUnlocked(true);
            toast({
                title: 'Access Granted',
                description: `Viewing details for ${patient.name}.`,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Incorrect PIN',
                description: 'The PIN you entered is incorrect. Please try again.',
            });
        }
    };

    const handleAddPrescription = () => {
        if (!patient || !medication || !dosage) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill out Medication and Dosage fields.',
            });
            return;
        }

        const newPrescription: Prescription = {
            date: new Date().toISOString().split('T')[0],
            medication,
            dosage,
            notes,
        };

        const updatedPatient = {
            ...patient,
            prescriptions: [newPrescription, ...patient.prescriptions],
        };

        setPatient(updatedPatient);

        toast({
            title: 'Prescription Added',
            description: `${medication} has been prescribed.`,
        });
        setMedication('');
        setDosage('');
        setNotes('');
    }

    const viewReport = (report: LabReport) => {
        setSelectedReport(report);
        setReportOpen(true);
    };

    const handleSavePatient = (updatedPatient: Patient) => {
        if (patient) {
            setPatient(updatedPatient);
            toast({
                title: 'Patient Details Updated',
                description: `Information for ${updatedPatient.name} has been saved.`,
            });
        }
    };

    if (!patient || !doctor) {
        return (
            <div className="flex flex-1 flex-col">
                <PageHeader title="Patient Not Found" />
                <main className="flex-1 p-4 md:p-6">
                    <p>The requested patient could not be found.</p>
                </main>
            </div>
        );
    }
    
    if (!isUnlocked) {
        return (
            <div className="flex flex-1 flex-col">
                <PageHeader title="Patient Details" />
                <main className="flex-1 p-4 md:p-6">
                    <PinVerification onVerify={handlePinVerify} />
                </main>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col">
            <PageHeader title="Patient Details" />
            <main className="flex-1 space-y-6 p-4 md:p-6">
                <Card>
                    <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={`https://picsum.photos/seed/${patient.id}/200/200`} data-ai-hint="person face" />
                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-3xl">{patient.name}</CardTitle>
                                <CardDescription>ID: {patient.id} &bull; Last Visit: {patient.lastVisit}</CardDescription>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                             <div className="flex gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5 rounded-md border p-2">
                                    <User className="w-4 h-4" /> {patient.age} years, {patient.gender}
                                </div>
                                 <div className="flex items-center gap-1.5 rounded-md border p-2">
                                    <Droplet className="w-4 h-4" /> {patient.bloodGroup}
                                </div>
                            </div>
                             <Button onClick={() => setEditPatientOpen(true)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit Patient
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Separator className="my-4" />
                        <div className="grid gap-6 md:grid-cols-3 mb-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{patientDoctorAppointments.filter(a => a.status === 'Scheduled').length}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Follow-ups / Past Visits</CardTitle>
                                    <History className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{patientDoctorAppointments.filter(a => a.status === 'Completed').length}</div>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
                                    <Pill className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{patient.currentMedications.length}</div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-4">
                               <h3 className="font-semibold text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-primary"/> Vitals</h3>
                                <div className="flex flex-wrap gap-2">
                                   <Badge variant="secondary">Height: 175cm</Badge>
                                   <Badge variant="secondary">Weight: 78kg</Badge>
                                   <Badge variant="secondary">BP: 120/80 mmHg</Badge>
                               </div>
                               <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg flex items-center gap-2"><Heart className="w-5 h-5 text-primary"/> Active Conditions</h3>
                               </div>
                               <div className="flex flex-wrap gap-2">
                                   {patient.activeConditions.map(condition => (
                                       <Badge key={condition} variant="secondary">{condition}</Badge>
                                   ))}
                               </div>
                               <h3 className="font-semibold text-lg flex items-center gap-2"><Pill className="w-5 h-5 text-primary"/> Current Medications</h3>
                               <div className="flex flex-wrap gap-2">
                                   {patient.currentMedications.map(med => (
                                       <Badge key={med} variant="outline">{med}</Badge>
                                   ))}
                               </div>
                            </div>
                             <div className="space-y-4 lg:col-span-2">
                               <h3 className="font-semibold text-lg flex items-center gap-2"><Calendar className="w-5 h-5 text-primary"/> Recent Appointments (with {doctor.name})</h3>
                                <ul className="space-y-2">
                                    {patientDoctorAppointments.slice(0,3).map(appt => (
                                        <li key={appt.id} className="flex justify-between items-center text-sm p-2 rounded-md border">
                                            <div>
                                                <p className="font-medium">{appt.date} at {appt.time}</p>
                                                <p className="text-muted-foreground">with {appt.doctor.name} ({appt.doctor.department})</p>
                                            </div>
                                            <Badge variant={appt.status === 'Scheduled' ? 'default' : appt.status === 'Completed' ? 'secondary' : 'destructive'}
                                            className={appt.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-700 border-blue-500/20' : appt.status === 'Completed' ? 'bg-green-500/20 text-green-700 border-green-500/20' : 'bg-red-500/20 text-red-700 border-red-500/20'}
                                            >{appt.status}</Badge>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <Separator className="my-6" />
                         <div>
                             <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-primary"/> Prescriptions</h3>
                            <ul className="space-y-2">
                                {patient.prescriptions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((prescription, index) => (
                                    <li key={index} className="flex flex-col text-sm p-3 rounded-md border bg-muted/50">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="font-medium text-base">{prescription.medication}</p>
                                            <p className="text-muted-foreground text-xs">{prescription.date}</p>
                                        </div>
                                        <p><span className="font-medium">Dosage:</span> {prescription.dosage}</p>
                                        {prescription.notes && <p className="text-muted-foreground mt-1"><span className="font-medium">Notes:</span> {prescription.notes}</p>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Separator className="my-6" />
                         <div>
                             <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-primary"/> Lab Reports</h3>
                             <ul className="space-y-2">
                                {patient.labReports.map(report => (
                                    <li key={report.id} className="flex justify-between items-center text-sm p-2 rounded-md border">
                                        <div>
                                            <p className="font-medium">{report.testName}</p>
                                            <p className="text-muted-foreground">Date: {report.date}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant={report.status === 'Completed' ? 'secondary' : 'default'}
                                            className={report.status === 'Completed' ? 'bg-green-500/20 text-green-700 border-green-500/20' : 'bg-yellow-500/20 text-yellow-700 border-yellow-500/20' }
                                            >{report.status}</Badge>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => viewReport(report)}
                                                disabled={report.status !== 'Completed' || !report.fileUrl}
                                            >
                                                <Download className="mr-2 h-3 w-3" />
                                                View
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                             </ul>
                        </div>
                        <Separator className="my-6" />
                        <div>
                             <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><FilePlus className="w-5 h-5 text-primary"/> Write New Prescription</h3>
                             <div className="grid gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="medication">Medication</Label>
                                        <Input id="medication" placeholder="e.g., Paracetamol 500mg" value={medication} onChange={e => setMedication(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="dosage">Dosage</Label>
                                        <Input id="dosage" placeholder="e.g., 1 tablet twice a day" value={dosage} onChange={e => setDosage(e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="notes">Notes (Optional)</Label>
                                    <Textarea id="notes" placeholder="e.g., After meals for 3 days" value={notes} onChange={e => setNotes(e.target.value)} />
                                </div>
                                <div className="flex justify-end">
                                    <Button onClick={handleAddPrescription}>Add Prescription</Button>
                                </div>
                             </div>
                        </div>
                    </CardContent>
                </Card>
                 <Dialog open={isReportOpen} onOpenChange={setReportOpen}>
                    <DialogContent className="max-w-4xl h-[90vh]">
                        <DialogHeader>
                        <DialogTitle>{selectedReport?.testName}</DialogTitle>
                        <DialogDescription>Date: {selectedReport?.date}</DialogDescription>
                        </DialogHeader>
                        {selectedReport?.fileUrl && (
                             <div className="relative h-full">
                                <Image src={selectedReport.fileUrl} layout="fill" objectFit="contain" alt="Lab Report" />
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
                {patient && (
                    <EditPatientDialog
                        patient={patient}
                        open={isEditPatientOpen}
                        onOpenChange={setEditPatientOpen}
                        onSave={handleSavePatient}
                    />
                )}
            </main>
        </div>
    );
}

