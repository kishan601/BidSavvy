import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Gavel, Users } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    The Smart Way to Hire & Get Hired.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    BidSavvy is the ultimate reverse bidding platform connecting talented sellers with exciting projects.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/projects">Find Work</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/dashboard/projects/new">Post a Project</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                 <Gavel className="h-48 w-48 text-primary/10" strokeWidth={0.5}/>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How it Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A New Bidding Paradigm</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform flips the script. Buyers post their needs, and sellers compete with their best offers, ensuring fair prices and high-quality outcomes.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>1. Buyers Post Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Detail your project requirements, set your budget, and define your timeline. It’s simple and free.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Gavel className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>2. Sellers Place Bids</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Skilled sellers browse projects and submit competitive bids, showcasing their expertise and value.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>3. Connect & Collaborate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Buyers review offers, select the best fit, and kick off the project with their chosen professional.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center w-full h-16 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} BidSavvy. All rights reserved.</p>
      </footer>
    </div>
  );
}
