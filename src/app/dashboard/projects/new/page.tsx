import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Post a New Project</CardTitle>
          <CardDescription>Fill out the details below to attract the best talent.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" placeholder="e.g., E-commerce Website Redesign" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea id="description" placeholder="Describe your project in detail..." rows={8} />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input id="budget" type="number" placeholder="e.g., 5000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" type="date" />
              </div>
            </div>
             <div className="grid gap-2">
              <Label htmlFor="skills">Required Skills (comma-separated)</Label>
              <Input id="skills" placeholder="e.g., UI/UX Design, Figma, React" />
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
