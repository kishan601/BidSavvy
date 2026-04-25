import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getSellerUser } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export default function ProfilePage() {
  const user = getSellerUser();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Profile</h1>
        <p className="text-muted-foreground">View and edit your personal information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your name, email, and avatar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Avatar</Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
          </div>
        </CardContent>
      </Card>

      {user.role === 'seller' && (
        <Card>
          <CardHeader>
            <CardTitle>Seller Profile</CardTitle>
            <CardDescription>This information will be visible to buyers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="profile-description">Profile Description</Label>
              <Textarea id="profile-description" rows={5} defaultValue={user.profileDescription} />
            </div>
            <div className="grid gap-2">
              <Label>Your Skills</Label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-20">
                {user.skills?.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-sm py-1 pl-3 pr-2">
                    {skill}
                    <button className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="add-skill">Add a new skill</Label>
                <div className="flex gap-2">
                    <Input id="add-skill" placeholder="e.g. JavaScript"/>
                    <Button variant="outline">Add Skill</Button>
                </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button size="lg">Save Changes</Button>
      </div>
    </div>
  );
}
