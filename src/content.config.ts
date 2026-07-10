import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const commands = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/commands' }),
  schema: z.object({
    label: z.string(),
    updatedAt: z.string(),
    default: z.boolean().optional(),
    pools: z.array(
      z.object({
        name: z.string(),
        pool: z.string(),
      })
    ).optional(),
    commands: z.array(
      z.object({
        keyword: z.string(),
        category: z.enum(['negative', 'positive', 'spawn', 'funny']),
        effect: z.string(),
        cost: z.number(),
        target: z.enum(['self', 'player', 'all']),
        superChatMin: z.number().optional(),
        notes: z.string().optional(),
        baseCount: z.number().optional(),
        extraZombieThreshold: z.number().optional(),
      })
    ),
  }),
});

export const collections = { commands };
