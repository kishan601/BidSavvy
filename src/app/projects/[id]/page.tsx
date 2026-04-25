import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { projects, users, bids } from '@/lib/data';
import { Calendar, DollarSign, User as UserIcon } from 'lucide-react';
import Header from '@/components/header';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  const buyer = users.find(u => u.id === project.buyerId);
  const projectBids = bids.filter(b => b.projectId === project.id);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-headline">{project.title}</CardTitle>
                <CardDescription>
                  Posted by {buyer?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submit Your Bid</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bid-amount">Your Bid Amount ($)</Label>
                    <Input id="bid-amount" type="number" placeholder="e.g., 4500" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="proposal">Your Proposal</Label>
                  <Textarea id="proposal" placeholder="Explain why you're the best fit for this project..." rows={6} />
                </div>
                <Button size="lg">Submit Bid</Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Budget</p>
                    <p className="text-muted-foreground">Up to ${project.budget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Deadline</p>
                    <p className="text-muted-foreground">{format(new Date(project.deadline), 'MMMM d, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                   <div>
                    <p className="font-medium">Buyer</p>
                    <p className="text-muted-foreground">{buyer?.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {project.requiredSkills.map(skill => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{projectBids.length} Bids So Far</CardTitle>
                </CardHeader>
                 <CardContent>
                    {projectBids.length > 0 ? (
                        <p className="text-sm text-muted-foreground">Join others in bidding for this project. Place your bid to get started!</p>
                    ) : (
                        <p className="text-sm text-muted-foreground">Be the first to bid on this project!</p>
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
