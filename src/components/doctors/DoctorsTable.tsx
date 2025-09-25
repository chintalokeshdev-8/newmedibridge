"use client";

import { useState } from "react";
import type { Doctor } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";

const DoctorForm = ({ onSave }: { onSave: (doctor: Omit<Doctor, 'id' | 'avatarUrl' | 'name'>) => void }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [medicalCouncilNumber, setMedicalCouncilNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [successfulSurgeries, setSuccessfulSurgeries] = useState(0);
  const [mainFocus, setMainFocus] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ 
      firstName, 
      lastName, 
      email, 
      phoneNumber,
      medicalCouncilNumber,
      department,
      successfulSurgeries,
      mainFocus,
      hospitalName,
      status 
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <ScrollArea className="h-[60vh]">
      <div className="grid gap-4 p-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="firstName" className="text-right">First Name</Label>
          <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="col-span-3" placeholder="John" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lastName" className="text-right">Last Name</Label>
          <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="col-span-3" placeholder="Doe" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" placeholder="john.doe@example.com" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phoneNumber" className="text-right">Phone (Optional)</Label>
          <Input id="phoneNumber" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="col-span-3" placeholder="+1 234 567 890" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="medicalCouncilNumber" className="text-right">Medical Council No.</Label>
          <Input id="medicalCouncilNumber" value={medicalCouncilNumber} onChange={(e) => setMedicalCouncilNumber(e.target.value)} className="col-span-3" placeholder="MCI12345" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="department" className="text-right">Department</Label>
          <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="col-span-3" placeholder="Cardiology" required />
        </div>
         <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="hospitalName" className="text-right">Hospital</Label>
          <Input id="hospitalName" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} className="col-span-3" placeholder="City General Hospital" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="successfulSurgeries" className="text-right">Successful Surgeries</Label>
          <Input id="successfulSurgeries" type="number" value={successfulSurgeries} onChange={(e) => setSuccessfulSurgeries(parseInt(e.target.value, 10))} className="col-span-3" placeholder="50" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="mainFocus" className="text-right">Main Focus</Label>
          <Input id="mainFocus" value={mainFocus} onChange={(e) => setMainFocus(e.target.value)} className="col-span-3" placeholder="Minimally Invasive Surgery" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">Status</Label>
          <Select onValueChange={(value: 'Active' | 'Inactive') => setStatus(value)} defaultValue={status}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      </ScrollArea>
      <DialogFooter className="mt-4">
        <Button type="submit">Save Doctor</Button>
      </DialogFooter>
    </form>
  )
}

export default function DoctorsTable({ initialDoctors }: { initialDoctors: Doctor[] }) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveDoctor = (newDoctorData: Omit<Doctor, 'id' | 'avatarUrl' | 'name'>) => {
    const fullName = `${newDoctorData.firstName} ${newDoctorData.lastName}`;
    const newDoctor: Doctor = {
      ...newDoctorData,
      id: `D${String(doctors.length + 1).padStart(3, '0')}`,
      name: fullName,
      avatarUrl: `https://picsum.photos/seed/new-doc-${doctors.length + 1}/200/200`
    };
    setDoctors(prev => [newDoctor, ...prev]);
    setDialogOpen(false);
    toast({
      title: "Doctor Registered",
      description: `${newDoctor.name} has been successfully added.`,
    })
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Registered Doctors</CardTitle>
            <CardDescription>Manage your hospital's medical staff.</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Register Doctor
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Register New Doctor</DialogTitle>
                <DialogDescription>Fill in the details to add a new doctor to the system.</DialogDescription>
              </DialogHeader>
              <DoctorForm onSave={handleSaveDoctor} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Avatar</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Doctor avatar"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src={doctor.avatarUrl}
                    width="64"
                    data-ai-hint="doctor person"
                  />
                </TableCell>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.department}</TableCell>
                <TableCell>
                  <Badge variant={doctor.status === "Active" ? "default" : "secondary"} className={doctor.status === "Active" ? "bg-green-500/20 text-green-700 border-green-500/20" : ""}>
                    {doctor.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
