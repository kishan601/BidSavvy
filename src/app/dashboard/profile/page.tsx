'use client';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/context/app-context';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { currentUser, updateUserProfile, addSkillToUser, removeSkillFromUser } = useAppContext();
  const { toast } = useToast();
  
  const [name, setName] = useState(currentUser?.name ?? '');
  const [email, setEmail] = useState(currentUser?.email ?? '');
  const [profileDescription, setProfileDescription] = useState(currentUser?.profileDescription ?? '');
  const [newSkill, setNewSkill] = useState('');

  if (!currentUser) {
    return null;
  }
  
  const handleSaveChanges = () => {
    updateUserProfile({ name, email, profileDescription });
    toast({ title: "Success", description: "Your profile has been updated." });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !currentUser.skills?.includes(newSkill.trim())) {
      addSkillToUser(newSkill.trim());
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    removeSkillFromUser(skill);
  }

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
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Avatar</Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {currentUser.role === 'seller' && (
        <Card>
          <CardHeader>
            <CardTitle>Seller Profile</CardTitle>
            <CardDescription>This information will be visible to buyers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="profile-description">Profile Description</Label>
              <Textarea id="profile-description" rows={5} value={profileDescription} onChange={e => setProfileDescription(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Your Skills</Label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-20">
                {currentUser.skills?.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-sm py-1 pl-3 pr-2">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="add-skill">Add a new skill</Label>
                <div className="flex gap-2">
                    <Input id="add-skill" placeholder="e.g. JavaScript" value={newSkill} onChange={e => setNewSkill(e.target.value)} />
                    <Button variant="outline" onClick={handleAddSkill}>Add Skill</Button>
                </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button size="lg" onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  );
}
