'use client';
import { useState } from 'react';
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestTube, FileUp, CheckCircle, Clock } from 'lucide-react';
import { patients } from "@/lib/data";
import { useToast } from '@/hooks/use-toast';

export default function LabDashboardPage() {
    const { toast } = useToast();
    const [testType, setTestType] = useState('');
    const [patientId, setPatientId] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = () => {
        if (!testType || !patientId || !file) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please select a test type, patient, and file to upload.',
            });
            return;
        }

        // Simulate upload
        console.log('Uploading report:', { testType, patientId, fileName: file.name });

        toast({
            title: 'Upload Successful',
            description: `Report for ${patients.find(p => p.id === patientId)?.name} has been uploaded.`,
        });

        // Reset form
        setTestType('');
        setPatientId('');
        setFile(null);
        // This is a bit of a hack to clear the file input visually
        const fileInput = document.getElementById('report-file') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Lab Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Today</CardTitle>
              <TestTube className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">24</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">5</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">19</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileUp className="w-6 h-6" /> Upload Reports
            </CardTitle>
            <CardDescription>Upload a patient's test results to their record.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="test-type">Test Type</Label>
                <Select onValueChange={setTestType} value={testType}>
                  <SelectTrigger id="test-type">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbc">CBC Report</SelectItem>
                    <SelectItem value="lipid">Lipid Panel</SelectItem>
                    <SelectItem value="hba1c">HbA1c</SelectItem>
                    <SelectItem value="mri">MRI Scan</SelectItem>
                    <SelectItem value="xray">X-Ray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                 <Select onValueChange={setPatientId} value={patientId}>
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name} ({p.id})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-file">Upload Report</Label>
              <Input id="report-file" type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            <div className="flex justify-end">
                <Button onClick={handleUpload}>
                    <FileUp className="mr-2 h-4 w-4" /> Upload
                </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
    