import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projects, users, bids } from '@/lib/data';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function BuyerProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id);
  
  if (!project) {
    notFound();
  }

  const projectBids = bids.filter(b => b.projectId === project.id);
  const acceptedBid = projectBids.find(b => b.status === 'accepted');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">{project.title}</h1>
        <p className="text-muted-foreground">Review bids and manage your project.</p>
      </div>

      <div className="grid gap-6">
        {projectBids.length > 0 ? projectBids.map(bid => {
          const seller = users.find(u => u.id === bid.sellerId);
          if (!seller) return null;
          
          return (
            <Card key={bid.id} className={bid.status === 'accepted' ? 'border-primary' : ''}>
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={seller.avatarUrl} alt={seller.name} />
                      <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{seller.name}</CardTitle>
                      <CardDescription>
                        Bid Amount: <span className="font-bold text-foreground">${bid.amount.toLocaleString()}</span>
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <Badge variant={bid.status === 'accepted' ? 'default' : bid.status === 'rejected' ? 'destructive' : 'secondary'}>{bid.status}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{bid.proposal}</p>
              </CardContent>
              <CardContent className="flex gap-2">
                {!acceptedBid && (
                   <Button>
                    <CheckCircle className="mr-2 h-4 w-4" /> Accept Bid
                  </Button>
                )}
                 <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" /> Message Seller
                </Button>
              </CardContent>
            </Card>
          )
        }) : (
            <Card className="text-center py-12">
                <CardContent>
                    <h3 className="text-xl font-semibold">No Bids Yet</h3>
                    <p className="text-muted-foreground mt-2">Your project is live. Check back soon to see bids from talented sellers.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
