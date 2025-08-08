import { z } from 'zod';

export const AuthSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6)
});