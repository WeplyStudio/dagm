'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing aspirations.
 *
 * It includes:
 * - `summarizeAspiration`: A function to summarize a given aspiration text.
 * - `SummarizeAspirationInput`: The input type for the `summarizeAspiration` function, which is a string.
 * - `SummarizeAspirationOutput`: The output type, which is also a string containing the summary.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAspirationInputSchema = z
  .string()
  .describe('The aspiration text to be summarized.');
export type SummarizeAspirationInput = z.infer<typeof SummarizeAspirationInputSchema>;

const SummarizeAspirationOutputSchema = z
  .string()
  .describe('The summarized aspiration text.');
export type SummarizeAspirationOutput = z.infer<typeof SummarizeAspirationOutputSchema>;

export async function summarizeAspiration(
  input: SummarizeAspirationInput
): Promise<SummarizeAspirationOutput> {
  return summarizeAspirationFlow(input);
}

const summarizeAspirationPrompt = ai.definePrompt({
  name: 'summarizeAspirationPrompt',
  input: {schema: SummarizeAspirationInputSchema},
  output: {schema: SummarizeAspirationOutputSchema},
  prompt: `Summarize the following aspiration in one short sentence:\n\n{{input}}`,
});

const summarizeAspirationFlow = ai.defineFlow(
  {
    name: 'summarizeAspirationFlow',
    inputSchema: SummarizeAspirationInputSchema,
    outputSchema: SummarizeAspirationOutputSchema,
  },
  async input => {
    const {output} = await summarizeAspirationPrompt(input);
    return output!;
  }
);
