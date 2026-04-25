'use client';
import { useState } from 'react';
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
import { useAppContext } from '@/context/app-context';
import { Calendar, DollarSign, User as UserIcon } from 'lucide-react';
import Header from '@/components/header';
import { notFound, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { projects, users, bids, addBid, currentUser } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  const [bidAmount, setBidAmount] = useState('');
  const [proposal, setProposal] = useState('');

  const project = projects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  const buyer = users.find(u => u.id === project.buyerId);
  const projectBids = bids.filter(b => b.projectId === project.id);
  
  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to place a bid.' });
        router.push('/login');
        return;
    }
    if (currentUser.role !== 'seller') {
        toast({ variant: 'destructive', title: 'Error', description: 'Only sellers can place bids.' });
        return;
    }

    addBid({
        projectId: project.id,
        sellerId: currentUser.id,
        amount: parseInt(bidAmount, 10),
        proposal,
    });

    toast({ title: 'Success!', description: 'Your bid has been submitted.' });
    setBidAmount('');
    setProposal('');
  }

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
                <form onSubmit={handleSubmitBid}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bid-amount">Your Bid Amount ($)</Label>
                      <Input id="bid-amount" type="number" placeholder="e.g., 4500" value={bidAmount} onChange={e => setBidAmount(e.target.value)} required />
                    </div>
                  </div>
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="proposal">Your Proposal</Label>
                    <Textarea id="proposal" placeholder="Explain why you're the best fit for this project..." rows={6} value={proposal} onChange={e => setProposal(e.target.value)} required />
                  </div>
                  <Button size="lg" type="submit" className="mt-4">Submit Bid</Button>
                </form>
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
