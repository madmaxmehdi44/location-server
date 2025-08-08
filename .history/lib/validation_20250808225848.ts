// lib/validation.ts
import { ZodSchema } from 'zod';

export async function parseBody<T>(schema: ZodSchema<T>, req: Request): Promise<T> {
  const body = await req.json();
  const result = schema.safeParse(body);
  if (!result.success) throw new Error('INVALID_PAYLOAD');
  return result.data;
}