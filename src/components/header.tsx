import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { Briefcase, LayoutGrid } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/projects"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            <Briefcase className="inline-block h-4 w-4 mr-1" />
            Projects
          </Link>
          <Link
            href="/dashboard"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            <LayoutGrid className="inline-block h-4 w-4 mr-1" />
            Dashboard
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
