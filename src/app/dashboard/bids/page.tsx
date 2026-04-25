'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/context/app-context';
import { format } from 'date-fns';
import Link from 'next/link';

export default function MyBidsPage() {
  const { currentUser, bids, projects } = useAppContext();
  
  if (!currentUser || currentUser.role !== 'seller') {
    return null;
  }

  const myBids = bids.filter(b => b.sellerId === currentUser.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">My Bids</CardTitle>
        <CardDescription>Track the status of all your submitted bids.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Title</TableHead>
              <TableHead>Your Bid</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myBids.map(bid => {
              const project = projects.find(p => p.id === bid.projectId);
              if (!project) return null;

              return (
                <TableRow key={bid.id}>
                  <TableCell className="font-medium">
                    <Link href={`/projects/${project.id}`} className="hover:underline">
                        {project.title}
                    </Link>
                  </TableCell>
                  <TableCell>${bid.amount.toLocaleString()}</TableCell>
                  <TableCell>{format(new Date(bid.timestamp), 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={bid.status === 'accepted' ? 'default' : bid.status === 'rejected' ? 'destructive' : 'secondary'} className="capitalize">
                      {bid.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
