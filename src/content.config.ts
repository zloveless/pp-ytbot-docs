import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const commands = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/commands' }),
  schema: z.array(
    z.object({
      keyword: z.string(),
      category: z.enum(['negative', 'positive', 'spawn']),
      effect: z.string(),
      cost: z.number(),
      target: z.enum(['self', 'player', 'all']),
      version: z.string(),
      stage: z.string(),
      superChatMin: z.number().optional(),
      notes: z.string().optional(),
      baseCount: z.number().optional(),
      extraZombieThreshold: z.number().optional(),
    })
  ),
});

export const collections = { commands };
