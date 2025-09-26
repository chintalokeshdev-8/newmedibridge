'use client';
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { patients } from "@/lib/data";
import { Clock, CheckCircle, BarChart2 } from 'lucide-react';

export default function LabAnalyticsPage() {
    const today = new Date().toISOString().split('T')[0];

    const completedToday = patients.flatMap(p => p.labReports)
        .filter(r => r.status === 'Completed' && r.date === today).length;

    const totalPending = patients.flatMap(p => p.labReports)
        .filter(r => r.status === 'Pending').length;

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Lab Analytics" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tests Completed Today</CardTitle>
                    <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">{completedToday}</div>
                    <p className="text-xs text-muted-foreground">
                        Number of lab reports completed on {today}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Pending Reports</CardTitle>
                    <Clock className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">{totalPending}</div>
                     <p className="text-xs text-muted-foreground">
                        Total reports awaiting processing
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Coming Soon</CardTitle>
                    <BarChart2 className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">More Analytics</div>
                     <p className="text-xs text-muted-foreground">
                        Detailed charts and trends are on the way.
                    </p>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>More detailed analytics will be displayed here in a future update.</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Analytics charts coming soon...</p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
