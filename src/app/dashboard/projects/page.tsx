'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app-context';
import { Gavel, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function BuyerProjectsPage() {
  const { currentUser, projects, bids } = useAppContext();
  
  if (!currentUser) {
    return null;
  }
  const myProjects = projects.filter(p => p.buyerId === currentUser.id);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold font-headline">My Projects</h1>
                <p className="text-muted-foreground">Manage your projects and review bids.</p>
            </div>
            <Button asChild>
                <Link href="/dashboard/projects/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Post New Project
                </Link>
            </Button>
       </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myProjects.length > 0 ? myProjects.map(project => {
          const projectBidsCount = bids.filter(b => b.projectId === project.id).length;
          return (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>Budget: ${project.budget.toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <Badge variant={project.status === 'open' ? 'default' : 'secondary'} className="capitalize">{project.status}</Badge>
                <p className="mt-4 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Gavel className="h-4 w-4 text-muted-foreground" />
                  <span>{projectBidsCount} Bid{projectBidsCount !== 1 && 's'}</span>
                </div>
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/dashboard/projects/${project.id}`}>Review Bids</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        }) : (
             <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold">No projects yet!</h3>
                <p className="text-muted-foreground mt-2 mb-4">Click the button below to post your first project and start receiving bids.</p>
                <Button asChild>
                    <Link href="/dashboard/projects/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post a Project
                    </Link>
                </Button>
             </div>
        )}
      </div>
    </div>
  );
}
