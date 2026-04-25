'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { Briefcase, LayoutGrid, Menu } from 'lucide-react';
import { useAppContext } from '@/context/app-context';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const { currentUser } = useAppContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo and Desktop Nav */}
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/projects"
              className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4" />
              Projects
            </Link>
            {currentUser && (
              <Link
                href="/dashboard"
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2"
              >
                <LayoutGrid className="h-4 w-4" />
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        {/* Desktop Auth Buttons */}
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 pt-6 h-full">
                <Logo />
                <nav className="flex flex-col gap-4 text-base font-medium">
                   <Link
                      href="/projects"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Projects
                    </Link>
                    {currentUser && (
                      <Link
                        href="/dashboard"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                      >
                        Dashboard
                      </Link>
                    )}
                </nav>
                <div className="flex flex-col gap-2 mt-auto">
                    {!currentUser ? (
                        <>
                          <Button asChild variant="outline" className="w-full">
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button asChild className="w-full">
                            <Link href="/register">Register</Link>
                          </Button>
                        </>
                      ) : (
                         <Button asChild className="w-full">
                            <Link href="/dashboard">Go to Dashboard</Link>
                          </Button>
                      )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
