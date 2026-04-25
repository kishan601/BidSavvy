'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { Briefcase, LayoutGrid } from 'lucide-react';
import { useAppContext } from '@/context/app-context';

export default function Header() {
  const { currentUser } = useAppContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/projects"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              <Briefcase className="inline-block h-4 w-4 mr-1" />
              Projects
            </Link>
            {currentUser && (
              <Link
                href="/dashboard"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                <LayoutGrid className="inline-block h-4 w-4 mr-1" />
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          {!currentUser ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
             <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
          )}
        </div>
      </div>
    </header>
  );
}
