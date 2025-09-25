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

const DoctorForm = ({ onSave }: { onSave: (doctor: Omit<Doctor, 'id' | 'avatarUrl'>) => void }) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, specialty, status });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="Dr. John Doe" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialty" className="text-right">Specialty</Label>
          <Input id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="col-span-3" placeholder="Cardiology" required />
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
      <DialogFooter>
        <Button type="submit">Save Doctor</Button>
      </DialogFooter>
    </form>
  )
}

export default function DoctorsTable({ initialDoctors }: { initialDoctors: Doctor[] }) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveDoctor = (newDoctorData: Omit<Doctor, 'id' | 'avatarUrl'>) => {
    const newDoctor: Doctor = {
      ...newDoctorData,
      id: `D${String(doctors.length + 1).padStart(3, '0')}`,
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
            <DialogContent className="sm:max-w-[425px]">
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
              <TableHead>Specialty</TableHead>
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
                <TableCell>{doctor.specialty}</TableCell>
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
