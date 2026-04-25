'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/context/app-context';
import { useToast } from '@/hooks/use-toast';

export default function NewProjectPage() {
  const { addProject, currentUser } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
        toast({ variant: "destructive", title: "Error", description: "You must be logged in to post a project." });
        return;
    }
    
    addProject({
      title,
      description,
      budget: parseInt(budget, 10),
      deadline,
      requiredSkills: skills.split(',').map(s => s.trim()),
      buyerId: currentUser.id,
    });
    
    toast({ title: "Success!", description: "Your project has been posted." });
    router.push('/dashboard/projects');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Post a New Project</CardTitle>
          <CardDescription>Fill out the details below to attract the best talent.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" placeholder="e.g., E-commerce Website Redesign" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea id="description" placeholder="Describe your project in detail..." rows={8} value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input id="budget" type="number" placeholder="e.g., 5000" value={budget} onChange={(e) => setBudget(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
              </div>
            </div>
             <div className="grid gap-2">
              <Label htmlFor="skills">Required Skills (comma-separated)</Label>
              <Input id="skills" placeholder="e.g., UI/UX Design, Figma, React" value={skills} onChange={(e) => setSkills(e.target.value)} required />
              <p className="text-xs text-muted-foreground">
                Listing relevant skills helps attract the right sellers.
              </p>
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg">Publish Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
