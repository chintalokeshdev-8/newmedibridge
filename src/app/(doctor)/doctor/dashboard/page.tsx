'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import { patients, doctors } from '@/lib/data';
import type { Patient, Doctor } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Share, Award, Stethoscope, Pencil, MapPin, Phone, Globe, Share2, Map } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';


const DoctorProfileCard = ({ doctor }: { doctor: Doctor }) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-primary/20">
                        <AvatarImage src={doctor.avatarUrl} alt={doctor.name} data-ai-hint="doctor person" />
                        <AvatarFallback>{doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center md:text-left">
                        <div className='flex items-center justify-center md:justify-between'>
                            <div>
                                <h2 className="text-2xl font-bold">{doctor.name}</h2>
                                <p className="text-primary font-medium">{doctor.department}</p>
                            </div>
                            <Button variant="outline" size="sm">
                                <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                            </Button>
                        </div>

                        <Separator className="my-3" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-primary" />
                                <span className='font-semibold text-foreground'>Successful Surgeries:</span> {doctor.successfulSurgeries}+
                            </div>
                            <div className="flex items-center gap-2">
                                <Stethoscope className="w-4 h-4 text-primary" />
                                 <span className='font-semibold text-foreground'>Main Focus:</span> {doctor.mainFocus}
                            </div>
                        </div>
                    </div>
                </div>
                 <Separator className="my-4" />
                 <div>
                    <h3 className="text-lg font-bold">{doctor.hospitalName}</h3>
                    <div className="space-y-2 mt-2 text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4" />
                            <span>Kothapet, Guntur, Andhra Pradesh 522001</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4" />
                            <span>{doctor.phoneNumber || '8008334948'}</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4" />
                            <a href="#" className="text-primary hover:underline">Visit Website</a>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 mt-4'>
                        <Button variant="outline" size="sm">
                            <Share2 className="mr-2 h-4 w-4" /> Share Directions
                        </Button>
                        <Button variant="outline" size="sm">
                            <Map className="mr-2 h-4 w-4" /> View Location
                        </Button>
                    </div>
                 </div>
            </CardContent>
        </Card>
    );
};


const PatientRegistrationForm = ({ onSave, open, onOpenChange }: { onSave: (patient: Omit<Patient, 'id' | 'primaryDoctorId' | 'appointments' | 'prescriptions' | 'labReports'>) => void, open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
    const [bloodGroup, setBloodGroup] = useState('');
    const [pin, setPin] = useState('');
    const [lastVisit, setLastVisit] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = () => {
        const newPatient = {
            name,
            age: parseInt(age, 10),
            gender,
            bloodGroup,
            pin,
            lastVisit,
            activeConditions: [],
            currentMedications: [],
        };
        onSave(newPatient);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Register New Patient</DialogTitle>
                    <DialogDescription>Fill in the details for the new patient.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                        <Select onValueChange={setGender} value={gender}>
                            <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="blood-group" className="text-right">Blood Group</Label>
                        <Input id="blood-group" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="pin" className="text-right">Security PIN</Label>
                        <Input id="pin" type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="col-span-3" maxLength={4} />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Register Patient</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default function DoctorDashboardPage() {
    const [allPatients, setAllPatients] = useState<Patient[]>(patients);
    const [searchTerm, setSearchTerm] = useState('');
    const [isRegistering, setRegistering] = useState(false);
    const { toast } = useToast();

    // Assuming Dr. Emily Carter is the logged in doctor
    const loggedInDoctor = doctors.find(d => d.id === 'D001');

    const filteredPatients = allPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleShareLink = () => {
        const url = `${window.location.origin}/register`;
        navigator.clipboard.writeText(url);
        toast({
            title: 'Registration Link Copied!',
            description: 'You can now share this link with patients to allow them to register.',
        });
    };

    const handleSavePatient = (newPatientData: Omit<Patient, 'id' | 'primaryDoctorId' | 'appointments' | 'prescriptions' | 'labReports'>) => {
        const newPatient: Patient = {
            ...newPatientData,
            id: `P${String(allPatients.length + 1).padStart(3, '0')}`,
            primaryDoctorId: 'D001', // Assuming Dr. Carter is referring
            appointments: [],
            prescriptions: [],
            labReports: [],
        };
        setAllPatients(prev => [newPatient, ...prev]);
        setRegistering(false);
        toast({
            title: "Patient Registered",
            description: `${newPatient.name} has been successfully registered with ID ${newPatient.id}.`,
        });
    };

    if (!loggedInDoctor) {
        return <div>Doctor not found.</div>;
    }

    return (
        <div className="flex flex-1 flex-col">
            <PageHeader title="Referral Patients" />
            <main className="flex-1 space-y-6 p-4 md:p-6">

                <DoctorProfileCard doctor={loggedInDoctor} />

                <Card>
                    <CardHeader>
                        <CardTitle>Patient Directory & Registration</CardTitle>
                        <CardDescription>Search for existing patients, register a new one, or share a registration link.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search by patient name or ID..."
                                    className="w-full rounded-lg bg-background pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" onClick={handleShareLink}>
                                <Share className="mr-2 h-4 w-4" /> Share Link
                            </Button>
                            <Button onClick={() => setRegistering(true)}>
                                <UserPlus className="mr-2 h-4 w-4" /> Register Patient
                            </Button>
                        </div>

                        {searchTerm && (
                             <div className="space-y-4">
                                {filteredPatients.length > 0 ? (
                                    filteredPatients.map(patient => (
                                        <div key={patient.id} className="flex items-center justify-between rounded-lg border p-4">
                                            <div>
                                                <div className="font-medium">{patient.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    ID: {patient.id} &bull; Age: {patient.age} &bull; Gender: {patient.gender}
                                                </div>
                                            </div>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/doctor/patients/${patient.id}`}>
                                                    View Details
                                                </Link>
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground">No patients found matching your search.</p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
                 <PatientRegistrationForm
                    open={isRegistering}
                    onOpenChange={setRegistering}
                    onSave={handleSavePatient}
                />
            </main>
        </div>
    );
}
