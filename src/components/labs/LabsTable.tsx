"use client";

import { useState } from "react";
import type { Lab } from "@/lib/types";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "@/hooks/use-toast";

const LabForm = ({ onSave }: { onSave: (lab: Omit<Lab, 'id'>) => void }) => {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'Open' | 'Closed'>('Open');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, service, location, status });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Lab Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="Central Pathology" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="service" className="text-right">Services</Label>
          <Input id="service" value={service} onChange={(e) => setService(e.target.value)} className="col-span-3" placeholder="Blood Tests, etc." required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="location" className="text-right">Location</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" placeholder="Wing A, Floor 2" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">Status</Label>
          <Select onValueChange={(value: 'Open' | 'Closed') => setStatus(value)} defaultValue={status}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save Lab</Button>
      </DialogFooter>
    </form>
  )
}

export default function LabsTable({ initialLabs }: { initialLabs: Lab[] }) {
  const [labs, setLabs] = useState<Lab[]>(initialLabs);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveLab = (newLabData: Omit<Lab, 'id'>) => {
    const newLab: Lab = {
      ...newLabData,
      id: `L${String(labs.length + 1).padStart(3, '0')}`,
    };
    setLabs(prev => [newLab, ...prev]);
    setDialogOpen(false);
    toast({
      title: "Lab Added",
      description: `${newLab.name} has been successfully added.`,
    })
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Available Labs</CardTitle>
            <CardDescription>Manage your hospital's laboratory services.</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Lab
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Lab</DialogTitle>
                <DialogDescription>Fill in the details to add a new lab to the system.</DialogDescription>
              </DialogHeader>
              <LabForm onSave={handleSaveLab} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labs.map((lab) => (
              <TableRow key={lab.id}>
                <TableCell className="font-medium">{lab.name}</TableCell>
                <TableCell>{lab.service}</TableCell>
                <TableCell>{lab.location}</TableCell>
                <TableCell>
                  <Badge variant={lab.status === "Open" ? "default" : "secondary"} className={lab.status === "Open" ? "bg-green-500/20 text-green-700 border-green-500/20" : ""}>
                    {lab.status}
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
