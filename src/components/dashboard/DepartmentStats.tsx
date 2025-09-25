"use client";
import { useState } from 'react';
import type { Doctor } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Users, BriefcaseMedical } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type DepartmentStatsProps = {
  doctors: Doctor[];
};

export default function DepartmentStats({ doctors }: DepartmentStatsProps) {
  const departments = [...new Set(doctors.map(d => d.department))];
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredDoctors = selectedDepartment === 'All' 
    ? doctors 
    : doctors.filter(d => d.department === selectedDepartment);

  const totalDoctors = filteredDoctors.length;
  const activeDoctors = filteredDoctors.filter(d => d.status === 'Active').length;

  const departmentStats = departments.map(dept => ({
    name: dept,
    total: doctors.filter(d => d.department === dept).length,
  }));

  return (
    <div>
        <div className="mb-4 flex items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Department Overview</h2>
            <Select onValueChange={setSelectedDepartment} defaultValue="All">
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Departments</SelectItem>
                    {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-primary text-primary-foreground">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
                    <Users className="h-5 w-5 text-primary-foreground/80" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-extrabold">{totalDoctors}</div>
                    <p className="text-xs text-primary-foreground/80">
                        {selectedDepartment === 'All' ? 'Across all departments' : `In ${selectedDepartment}`}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
                    <Stethoscope className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">{activeDoctors}</div>
                     <p className="text-xs text-muted-foreground">
                        Currently available staff
                    </p>
                </CardContent>
            </Card>
            {departmentStats.slice(0, 2).map(dept => (
                 <Card key={dept.name}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{dept.name}</CardTitle>
                        <BriefcaseMedical className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{dept.total}</div>
                         <p className="text-xs text-muted-foreground">
                            Doctors in department
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
