'use client';
import { useState } from 'react';
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { patients } from "@/lib/data";
import { Clock, CheckCircle, BarChart2, DollarSign, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isWithinInterval, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import type { LabReport } from '@/lib/types';

type TimeFilter = 'today' | 'weekly' | 'monthly';

type AnalyticsData = {
    completed: number;
    pending: number;
    revenue: number;
    patientsServed: number;
};

const filterReports = (reports: { report: LabReport, patientId: string }[], filter: TimeFilter): { report: LabReport, patientId: string }[] => {
    const now = new Date();
    let interval: Interval;

    switch (filter) {
        case 'today':
            const todayStart = new Date(now.setHours(0, 0, 0, 0));
            const todayEnd = new Date(now.setHours(23, 59, 59, 999));
            interval = { start: todayStart, end: todayEnd };
            break;
        case 'weekly':
            interval = { start: startOfWeek(now), end: endOfWeek(now) };
            break;
        case 'monthly':
            interval = { start: startOfMonth(now), end: endOfMonth(now) };
            break;
        default:
            return reports;
    }

    return reports.filter(({ report }) => {
        try {
            const reportDate = parseISO(report.date);
            return isWithinInterval(reportDate, interval);
        } catch (e) {
            return false;
        }
    });
};

const calculateAnalytics = (reports: { report: LabReport, patientId: string }[]): AnalyticsData => {
    const completed = reports.filter(r => r.report.status === 'Completed').length;
    const pending = reports.filter(r => r.report.status === 'Pending').length;
    const revenue = reports
        .filter(r => r.report.paymentStatus === 'Paid' && r.report.amountPaid && r.report.status === 'Completed')
        .reduce((sum, item) => sum + (item.report.amountPaid || 0), 0);
    const patientsServed = new Set(reports.map(r => r.patientId)).size;

    return { completed, pending, revenue, patientsServed };
};


export default function LabAnalyticsPage() {
    const [filter, setFilter] = useState<TimeFilter>('today');
    
    const allReports = patients.flatMap(p => p.labReports.map(report => ({ report, patientId: p.id })));
    const filtered = filterReports(allReports, filter);
    const analytics = calculateAnalytics(filtered);

    const filterLabels = {
        today: "Today's",
        weekly: "This Week's",
        monthly: "This Month's"
    };

    const periodLabels = {
        today: "today",
        weekly: "this week",
        monthly: "this month"
    }


  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Lab Analytics" />
      <main className="flex-1 space-y-6 p-4 md:p-6">

        <Tabs defaultValue="today" onValueChange={(value) => setFilter(value as TimeFilter)} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="weekly">This Week</TabsTrigger>
              <TabsTrigger value="monthly">This Month</TabsTrigger>
            </TabsList>
            <TabsContent value="today" />
            <TabsContent value="weekly" />
            <TabsContent value="monthly" />
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{filterLabels[filter]} Completed Reports</CardTitle>
                    <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">{analytics.completed}</div>
                    <p className="text-xs text-muted-foreground">
                        Reports completed {periodLabels[filter]}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{filterLabels[filter]} Patients Served</CardTitle>
                    <Users className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">{analytics.patientsServed}</div>
                     <p className="text-xs text-muted-foreground">
                        Unique patients {periodLabels[filter]}
                    </p>
                </CardContent>
            </Card>
             <Card className="bg-primary text-primary-foreground">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{filterLabels[filter]} Revenue</CardTitle>
                    <DollarSign className="h-5 w-5 text-primary-foreground/80" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-extrabold">${analytics.revenue.toLocaleString()}</div>
                     <p className="text-xs text-primary-foreground/80">
                        From paid tests {periodLabels[filter]}
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{filterLabels[filter]} Pending Reports</CardTitle>
                    <Clock className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">{analytics.pending}</div>
                     <p className="text-xs text-muted-foreground">
                        New reports registered {periodLabels[filter]}
                    </p>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
                <CardDescription>More detailed charts and breakdowns will be displayed here in a future update.</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Analytics charts coming soon...</p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
