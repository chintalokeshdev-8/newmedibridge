import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, FlaskConical, CalendarClock, Users } from "lucide-react";

type StatCardsProps = {
  totalDoctors: number;
  totalLabs: number;
  upcomingAppointments: number;
  totalUsers: number;
};

export default function StatCards({ totalDoctors, totalLabs, upcomingAppointments, totalUsers }: StatCardsProps) {
  const stats = [
    { title: "Total Doctors", value: totalDoctors, icon: Stethoscope },
    { title: "Active Labs", value: totalLabs, icon: FlaskConical },
    { title: "Upcoming Appointments", value: upcomingAppointments, icon: CalendarClock },
    { title: "System Users", value: totalUsers, icon: Users },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
