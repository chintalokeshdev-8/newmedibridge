'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import PageHeader from "@/components/shared/PageHeader";
import { patients, doctors } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { FilePlus, User, Heart, Droplet, Calendar, Pill } from 'lucide-react';

export default function PatientDetailPage() {
    const params = useParams();
    const patient = patients.find(p => p.id === params.id);
    const doctor = doctors.find(d => d.id === patient?.primaryDoctorId);
    const { toast } = useToast();

    const [medication, setMedication] = useState('');
    const [dosage, setDosage] = useState('');
    const [notes, setNotes] = useState('');

    const handleAddPrescription = () => {
        if (!medication || !dosage) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill out Medication and Dosage fields.',
            });
            return;
        }
        // In a real app, you'd save this to the backend.
        console.log({ medication, dosage, notes });
        toast({
            title: 'Prescription Added',
            description: `${medication} has been prescribed.`,
        });
        setMedication('');
        setDosage('');
        setNotes('');
    }

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
                        <div className="flex gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5 rounded-md border p-2">
                                <User className="w-4 h-4" /> {patient.age} years, {patient.gender}
                            </div>
                             <div className="flex items-center gap-1.5 rounded-md border p-2">
                                <Droplet className="w-4 h-4" /> {patient.bloodGroup}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Separator className="my-4" />
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-4">
                               <h3 className="font-semibold text-lg flex items-center gap-2"><Heart className="w-5 h-5 text-primary"/> Active Conditions</h3>
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
                               <h3 className="font-semibold text-lg flex items-center gap-2"><Calendar className="w-5 h-5 text-primary"/> Recent Appointments</h3>
                                <ul className="space-y-2">
                                    {patient.appointments.slice(0,3).map(appt => (
                                        <li key={appt.id} className="flex justify-between items-center text-sm p-2 rounded-md border">
                                            <div>
                                                <p className="font-medium">{appt.date} at {appt.time}</p>
                                                <p className="text-muted-foreground">with {appt.doctor.name} ({appt.doctor.department})</p>
                                            </div>
                                            <Badge variant={appt.status === 'Scheduled' ? 'default' : appt.status === 'Completed' ? 'secondary' : 'destructive'}
                                            className={appt.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-700' : ''}
                                            >{appt.status}</Badge>
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
            </main>
        </div>
    );
}
