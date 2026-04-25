'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { Briefcase, LayoutGrid, Menu } from 'lucide-react';
import { useAppContext } from '@/context/app-context';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';

export default function Header() {
  const { currentUser } = useAppContext();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
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

        {/* Desktop Buttons */}
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

        {/* Mobile Menu */}
        <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Logo />
                  <Link href="/projects" onClick={() => setOpen(false)} className="flex items-center gap-2 text-lg font-semibold">
                    Projects
                  </Link>
                  {currentUser && (
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-lg font-semibold text-muted-foreground"
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="fixed bottom-4 grid gap-2 w-[calc(100%-3rem)]">
                    {!currentUser ? (
                        <>
                            <Button asChild variant="outline" onClick={() => setOpen(false)}>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild onClick={() => setOpen(false)}>
                                <Link href="/register">Register</Link>
                            </Button>
                        </>
                    ) : (
                        <Button asChild onClick={() => setOpen(false)}>
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
      </div>
    </header>
  );
}
