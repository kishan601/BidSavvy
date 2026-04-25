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
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/context/app-context';
import { Calendar, DollarSign, Search } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/header';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

export default function ProjectsPage() {
  const { projects, users, bids } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const openProjects = projects.filter(p => p.status === 'open');

  const filteredProjects = openProjects.filter(project => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchTermLower) ||
      project.description.toLowerCase().includes(searchTermLower) ||
      project.requiredSkills.some(skill => skill.toLowerCase().includes(searchTermLower))
    );
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="space-y-4 mb-8">
              <h1 className="text-4xl font-bold font-headline">Find Your Next Project</h1>
              <p className="text-muted-foreground text-lg">Browse through hundreds of projects and find the one that fits your skills.</p>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search projects by keyword, skill..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map(project => {
              const projectBids = bids.filter(b => b.projectId === project.id);
              const buyer = users.find(u => u.id === project.buyerId);
              return (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>by {buyer?.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.requiredSkills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-4">
                      <div className="flex justify-between w-full text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4"/>
                              <span>Up to ${project.budget.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4"/>
                              <span>Due {formatDistanceToNow(new Date(project.deadline), { addSuffix: true })}</span>
                          </div>
                      </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="text-sm font-medium">{projectBids.length} Bids</div>
                      <Button asChild>
                        <Link href={`/projects/${project.id}`}>View & Bid</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
