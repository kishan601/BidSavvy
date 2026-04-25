import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser, projects, bids, users } from '@/lib/data';
import { Briefcase, DollarSign, Gavel, Users } from 'lucide-react';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const user: User = getCurrentUser();

  const buyerStats = [
    {
      title: 'Active Projects',
      value: projects.filter(p => p.buyerId === user.id && p.status === 'open').length,
      icon: Briefcase,
    },
    {
      title: 'Total Bids Received',
      value: bids.filter(b => projects.some(p => p.id === b.projectId && p.buyerId === user.id)).length,
      icon: Gavel,
    },
    {
      title: 'Completed Projects',
      value: projects.filter(p => p.buyerId === user.id && p.status === 'completed').length,
      icon: Briefcase,
    },
     {
      title: 'Total Spent',
      value: `$${bids.filter(b => b.status === 'accepted' && projects.find(p => p.id === b.projectId)?.buyerId === user.id).reduce((sum, b) => sum + b.amount, 0)}`,
      icon: DollarSign,
    },
  ];
  
  const sellerStats = [
    {
      title: 'Active Bids',
      value: bids.filter(b => b.sellerId === user.id && b.status === 'pending').length,
      icon: Gavel,
    },
    {
      title: 'Projects Won',
      value: bids.filter(b => b.sellerId === user.id && b.status === 'accepted').length,
      icon: Briefcase,
    },
    {
      title: 'Total Earnings',
      value: `$${bids.filter(b => b.sellerId === user.id && b.status === 'accepted').reduce((sum, b) => sum + b.amount, 0)}`,
      icon: DollarSign,
    },
    {
      title: 'Open Projects',
      value: projects.filter(p => p.status === 'open').length,
      icon: Users,
    },
  ];

  const stats = user.role === 'buyer' ? buyerStats : sellerStats;
  const recentBids = bids
    .filter(b => projects.some(p => p.id === b.projectId && p.buyerId === user.id))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Welcome back, {user.name.split(' ')[0]}!</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {user.role === 'buyer' && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Bids on Your Projects</CardTitle>
            <CardDescription>The latest offers from talented sellers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBids.map(bid => {
                  const project = projects.find(p => p.id === bid.projectId);
                  const seller = users.find(s => s.id === bid.sellerId);
                  return (
                    <TableRow key={bid.id}>
                      <TableCell className="font-medium">{project?.title}</TableCell>
                      <TableCell>{seller?.name}</TableCell>
                      <TableCell>${bid.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={bid.status === 'pending' ? 'secondary' : 'default'}>{bid.status}</Badge>
                      </TableCell>
                       <TableCell>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/dashboard/projects/${project?.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {user.role === 'seller' && (
         <Card>
          <CardHeader>
            <CardTitle>Find Your Next Opportunity</CardTitle>
            <CardDescription>Check out the latest projects or get AI-powered recommendations.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
             <Button asChild>
                <Link href="/projects">Browse All Projects</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/dashboard/recommendations">Get AI Recommendations</Link>
              </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
