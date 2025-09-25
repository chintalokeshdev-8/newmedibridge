import { SidebarTrigger } from "@/components/ui/sidebar";

type PageHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="flex-1 text-lg font-semibold md:text-2xl font-headline">{title}</h1>
      <div className="flex items-center gap-2">
        {children}
      </div>
    </header>
  );
}
