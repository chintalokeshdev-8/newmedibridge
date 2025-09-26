
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLogo from '@/components/shared/AppLogo';
import { useToast } from '@/hooks/use-toast';

export default function RegistrationPage() {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
    const [bloodGroup, setBloodGroup] = useState('');
    const [pin, setPin] = useState('');
    const [isRegistered, setRegistered] = useState(false);
    const [patientId, setPatientId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would send this data to your backend
        const newPatientId = `P${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
        setPatientId(newPatientId);
        setRegistered(true);
        toast({
            title: 'Registration Successful!',
            description: 'Your account has been created.',
        });
    };
    
    if (isRegistered) {
        return (
             <div className="flex min-h-screen items-center justify-center bg-background p-4">
                 <Card className="mx-auto w-full max-w-md">
                     <CardHeader className="text-center">
                         <div className="mb-4 flex justify-center">
                            <AppLogo />
                         </div>
                         <CardTitle className="text-2xl font-headline">Registration Complete!</CardTitle>
                         <CardDescription>
                             Thank you for registering. Your Patient ID is{' '}
                             <span className="font-bold text-primary">{patientId}</span>.
                             Please save it for your records.
                         </CardDescription>
                     </CardHeader>
                     <CardContent className="text-center">
                        <p className="text-muted-foreground mb-4">
                            You can now use the Medibridge app for your healthcare needs.
                        </p>
                        <Button asChild>
                            <Link href="/">Return to Login</Link>
                        </Button>
                     </CardContent>
                 </Card>
             </div>
        )
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <AppLogo />
          </div>
          <CardTitle className="text-2xl font-headline">Patient Registration</CardTitle>
          <CardDescription>Create your account to get started with Medibridge.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="45" required value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="gender">Gender</Label>
                     <Select onValueChange={setGender} value={gender}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="blood-group">Blood Group</Label>
                    <Input id="blood-group" placeholder="O+" required value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="pin">4-Digit PIN</Label>
                    <Input id="pin" type="password" required maxLength={4} value={pin} onChange={(e) => setPin(e.target.value)} />
                </div>
            </div>
            <Button type="submit" className="w-full mt-4">Create Account</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
