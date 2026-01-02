import type { NextApiRequest, NextApiResponse } from 'next';
import { db, debates, debateArguments } from '../../../db';
import { eq, desc } from 'drizzle-orm';
import { filterValidArguments, transformArgumentsForInsert, formatErrorResponse } from '../../../lib/debate-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const allDebates = await db
        .select()
        .from(debates)
        .orderBy(desc(debates.createdAt));
      
      // Fetch arguments for each debate
      const debatesWithArguments = await Promise.all(
        allDebates.map(async (debate) => {
          const args = await db
            .select()
            .from(debateArguments)
            .where(eq(debateArguments.debateId, debate.id));
          
          return {
            ...debate,
            arguments: {
              idubu: args.filter(a => a.faction === 'idubu'),
              akagara: args.filter(a => a.faction === 'akagara'),
            },
          };
        })
      );

      return res.status(200).json(debatesWithArguments);
    } catch (error) {
      console.error('Error fetching debates:', error);
      return res.status(500).json(formatErrorResponse(error, 'Failed to fetch debates'));
    }
  }

  if (req.method === 'POST') {
    try {
      console.log('Received request to create a new debate.');
      const { 
        title, 
        slug, 
        topic, 
        summary, 
        verdict, 
        youtubeVideoId, 
        youtubeVideoTitle,
        mainImageUrl,
        authorName,
        status,
        idubuArguments,
        akagaraArguments 
      } = req.body;
      console.log('Request body:', req.body);

      // Validate required fields
      if (!title || !slug || !topic || !verdict) {
        console.log('Validation failed: Missing required fields.');
        return res.status(400).json({ 
          error: 'Missing required fields: title, slug, topic, and verdict are required' 
        });
      }
      console.log('Validation passed.');

      // Insert the debate
      console.log('Inserting debate into the database...');
      const [newDebate] = await db
        .insert(debates)
        .values({
          title,
          slug,
          topic,
          summary,
          verdict,
          youtubeVideoId,
          youtubeVideoTitle,
          mainImageUrl,
          authorName: authorName || 'Imuhira Staff',
          status: status || 'draft',
          publishedAt: status === 'published' ? new Date() : null,
        })
        .returning();
      console.log('Debate inserted successfully:', newDebate);

      // Insert Idubu arguments (filter out empty arguments)
      const validIdubuArgs = filterValidArguments(idubuArguments);
      if (validIdubuArgs.length > 0) {
        await db.insert(debateArguments).values(
          transformArgumentsForInsert(validIdubuArgs, newDebate.id, 'idubu')
        );
      }

      // Insert Akagara arguments (filter out empty arguments)
      const validAkagaraArgs = filterValidArguments(akagaraArguments);
      if (validAkagaraArgs.length > 0) {
        await db.insert(debateArguments).values(
          transformArgumentsForInsert(validAkagaraArgs, newDebate.id, 'akagara')
        );
      }

      // Fetch the complete debate with arguments
      console.log('Fetching the complete debate with arguments...');
      const args = await db
        .select()
        .from(debateArguments)
        .where(eq(debateArguments.debateId, newDebate.id));
      console.log('Arguments fetched successfully:', args);

      console.log('Debate created successfully.');
      return res.status(201).json({
        ...newDebate,
        arguments: {
          idubu: args.filter(a => a.faction === 'idubu'),
          akagara: args.filter(a => a.faction === 'akagara'),
        },
      });
    } catch (error) {
      console.error('Error creating debate:', error);
      return res.status(500).json(formatErrorResponse(error, 'Failed to create debate'));
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
