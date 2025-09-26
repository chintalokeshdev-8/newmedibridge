import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLogo from '@/components/shared/AppLogo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <AppLogo />
          </div>
          <CardTitle className="text-2xl font-headline">Welcome to Medibridge</CardTitle>
          <CardDescription>Select your role and enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
              <TabsTrigger value="lab">Lab Staff</TabsTrigger>
            </TabsList>
            <TabsContent value="admin">
                <div className="grid gap-4 pt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input id="admin-email" type="email" placeholder="admin@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input id="admin-password" type="password" required defaultValue="password" />
                  </div>
                  <Button type="submit" className="w-full" asChild>
                    <Link href="/dashboard">Login as Admin</Link>
                  </Button>
                </div>
            </TabsContent>
            <TabsContent value="doctor">
               <div className="grid gap-4 pt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="doctor-email">Email</Label>
                    <Input id="doctor-email" type="email" placeholder="doctor@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="doctor-password">Password</Label>
                    <Input id="doctor-password" type="password" required defaultValue="password" />
                  </div>
                  <Button type="submit" className="w-full" asChild>
                    <Link href="/doctor/dashboard">Login as Doctor</Link>
                  </Button>
                </div>
            </TabsContent>
             <TabsContent value="lab">
               <div className="grid gap-4 pt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lab-email">Email</Label>
                    <Input id="lab-email" type="email" placeholder="lab@example.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lab-password">Password</Label>
                    <Input id="lab-password" type="password" required defaultValue="password" />
                  </div>
                  <Button type="submit" className="w-full" asChild>
                    <Link href="/lab/dashboard">Login as Lab Staff</Link>
                  </Button>
                </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
