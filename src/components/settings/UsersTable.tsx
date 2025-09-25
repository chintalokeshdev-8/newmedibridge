"use client";

import { useState } from "react";
import type { User } from "@/lib/types";
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
import { MoreHorizontal, PlusCircle, UserPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "@/hooks/use-toast";

const UserForm = ({ onSave }: { onSave: (user: Omit<User, 'id'>) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Admin' | 'Doctor' | 'Lab Staff'>('Doctor');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, role, status });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="John Doe" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" placeholder="john.doe@medibridge.app" required />
        </div>
         <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">Role</Label>
          <Select onValueChange={(value: 'Admin' | 'Doctor' | 'Lab Staff') => setRole(value)} defaultValue={role}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Doctor">Doctor</SelectItem>
              <SelectItem value="Lab Staff">Lab Staff</SelectItem>
            </SelectContent>
          </Select>
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
        <Button type="submit">Save User</Button>
      </DialogFooter>
    </form>
  )
}

export default function UsersTable({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveUser = (newUserData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...newUserData,
      id: `U${String(users.length + 1).padStart(3, '0')}`,
    };
    setUsers(prev => [newUser, ...prev]);
    setDialogOpen(false);
    toast({
      title: "User Created",
      description: `Account for ${newUser.name} has been successfully created.`,
    })
  };

  const generateDummies = () => {
    const dummyUsers: User[] = [
        { id: `U${String(users.length + 1).padStart(3, '0')}`, name: 'Dummy Doctor One', role: 'Doctor', email: 'dummy.doc1@medibridge.app', status: 'Active' },
        { id: `U${String(users.length + 2).padStart(3, '0')}`, name: 'Dummy Lab Staff', role: 'Lab Staff', email: 'dummy.lab1@medibridge.app', status: 'Active' },
    ];
    setUsers(prev => [...dummyUsers, ...prev]);
    toast({
        title: "Dummy Users Generated",
        description: "2 new dummy user accounts have been created.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
          <div>
            <CardTitle>User Logins</CardTitle>
            <CardDescription>Manage login credentials for all hospital staff.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1" onClick={generateDummies}>
                <UserPlus className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Generate Dummies
                </span>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Create User
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>Fill in the details to create a new user account.</DialogDescription>
                </DialogHeader>
                <UserForm onSave={handleSaveUser} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "default" : "secondary"} className={user.status === "Active" ? "bg-green-500/20 text-green-700 border-green-500/20" : ""}>
                    {user.status}
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
                      <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
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
