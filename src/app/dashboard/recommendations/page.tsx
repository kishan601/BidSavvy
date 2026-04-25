'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/context/app-context';
import { recommendProjectsToSeller, type SellerProjectRecommendationOutput } from '@/ai/flows/seller-project-recommendation';
import { Loader2, Lightbulb, Gavel } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function RecommendationsPage() {
  const { currentUser, projects } = useAppContext();
  const [recommendations, setRecommendations] = useState<SellerProjectRecommendationOutput['recommendedProjects']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!currentUser) return null;

  const getRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const availableProjectsForAI = projects.filter(p => p.status === 'open').map(p => ({
        projectId: p.id,
        projectDescription: p.description,
        requiredSkills: p.requiredSkills,
      }));
      
      const result = await recommendProjectsToSeller({
        sellerSkills: currentUser.skills || [],
        sellerProfileDescription: currentUser.profileDescription || '',
        availableProjects: availableProjectsForAI,
      });

      setRecommendations(result.recommendedProjects);
    } catch (e) {
      setError('Failed to get recommendations. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <Lightbulb className="text-primary" /> AI Project Recommendations
          </h1>
          <p className="text-muted-foreground">Let our AI find the best projects for you based on your skills and profile.</p>
        </div>
        <Button onClick={getRecommendations} disabled={isLoading} size="lg">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="mr-2 h-4 w-4" />
          )}
          Find Projects for Me
        </Button>
      </div>

      {error && <p className="text-destructive">{error}</p>}
      
      {recommendations.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map(rec => {
                  const project = projects.find(p => p.id === rec.projectId);
                  if (!project) return null;
                  
                  return (
                      <Card key={rec.projectId}>
                          <CardHeader>
                              <CardTitle>{project.title}</CardTitle>
                              <CardDescription>Budget: ${project.budget.toLocaleString()}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                              <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                              <div>
                                  <h4 className="font-semibold text-sm mb-2">Why it's a good match:</h4>
                                  <p className="text-sm text-primary/80 italic border-l-2 border-primary pl-2">{rec.reason}</p>
                              </div>
                               <div className="flex flex-wrap gap-2">
                                {project.requiredSkills.map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                            </div>
                          </CardContent>
                          <CardFooter>
                              <Button asChild className="w-full">
                                  <Link href={`/projects/${project.id}`}>
                                      <Gavel className="mr-2 h-4 w-4"/>
                                      View & Bid
                                  </Link>
                              </Button>
                          </CardFooter>
                      </Card>
                  )
              })}
          </div>
      )}

      {!isLoading && recommendations.length === 0 && !error && (
        <Card className="text-center py-12">
            <CardContent>
                <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold mt-4">Ready to find your next project?</h3>
                <p className="text-muted-foreground mt-2 mb-4">Click the button to get personalized project recommendations.</p>
            </CardContent>
        </Card>
      )}

    </div>
  );
}
