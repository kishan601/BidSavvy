'use server';
/**
 * @fileOverview An AI tool that suggests relevant project listings to sellers
 * based on their specified skills, profile, and past project categories.
 *
 * - recommendProjectsToSeller - A function that handles the project recommendation process.
 * - SellerProjectRecommendationInput - The input type for the recommendProjectsToSeller function.
 * - SellerProjectRecommendationOutput - The return type for the recommendProjectsToSeller function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SellerProjectRecommendationInputSchema = z.object({
  sellerSkills: z
    .array(z.string())
    .describe("A list of the seller's skills (e.g., 'Web Development', 'UI/UX Design')."),
  sellerProfileDescription: z
    .string()
    .describe("A detailed description of the seller's profile, including experience and past project categories."),
  availableProjects: z
    .array(
      z.object({
        projectId: z.string().describe('The unique identifier for the project.'),
        projectDescription: z.string().describe('A detailed description of the project.'),
        requiredSkills: z
          .array(z.string())
          .describe("A list of skills required for the project (e.g., 'React', 'Node.js')."),
      })
    )
    .describe('A list of projects currently available for bidding.'),
});
export type SellerProjectRecommendationInput = z.infer<typeof SellerProjectRecommendationInputSchema>;

const SellerProjectRecommendationOutputSchema = z.object({
  recommendedProjects: z
    .array(
      z.object({
        projectId: z.string().describe('The ID of the recommended project.'),
        reason: z.string().describe('A brief explanation of why this project is a good fit for the seller.'),
      })
    )
    .describe('A list of projects recommended for the seller, including a reason for each recommendation.'),
});
export type SellerProjectRecommendationOutput = z.infer<typeof SellerProjectRecommendationOutputSchema>;

export async function recommendProjectsToSeller(
  input: SellerProjectRecommendationInput
): Promise<SellerProjectRecommendationOutput> {
  return sellerProjectRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sellerProjectRecommendationPrompt',
  input: {schema: SellerProjectRecommendationInputSchema},
  output: {schema: SellerProjectRecommendationOutputSchema},
  prompt: `You are an expert project matching assistant. Your goal is to recommend the most relevant projects to a seller based on their skills and profile.

Here is the seller's information:
Seller Skills: {{#each sellerSkills}}- {{{this}}}
{{/each}}
Seller Profile Description: {{{sellerProfileDescription}}}

Here are the available projects:
{{#each availableProjects}}
---
Project ID: {{{projectId}}}
Project Description: {{{projectDescription}}}
Required Skills: {{#each requiredSkills}}- {{{this}}}
{{/each}}
---
{{/each}}

Please analyze the seller's information against each available project. Identify projects that are a strong match for the seller's skills and profile. For each recommended project, provide a brief reason why it's a good fit.

Output only a JSON object containing an array of recommended projects, adhering to the specified schema. Ensure the response is valid JSON.`,
});

const sellerProjectRecommendationFlow = ai.defineFlow(
  {
    name: 'sellerProjectRecommendationFlow',
    inputSchema: SellerProjectRecommendationInputSchema,
    outputSchema: SellerProjectRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
