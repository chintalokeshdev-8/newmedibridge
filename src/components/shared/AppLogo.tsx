import { HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';

type AppLogoProps = {
  className?: string;
  iconSize?: number;
};

export default function AppLogo({ className, iconSize = 40 }: AppLogoProps) {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <HeartPulse size={iconSize} />
      <h1 className="text-xl font-bold tracking-wider font-headline text-inherit">Medibridge</h1>
    </div>
  );
}
