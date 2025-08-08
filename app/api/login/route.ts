// app/api/login/route.ts
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { ok, bad } from '@/lib/response';
import { parseBody } from '@/lib/validation';
import { AuthSchema } from '@/📄 schemas/auth';

export async function POST(req: Request) {
  try {
    const { username, password } = await parseBody(AuthSchema, req);
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash)))
      return bad('INVALID_CREDENTIALS', 401);

    const token = signToken({ sub: user.id, username });
    return ok({ token, userId: user.id, username });
  } 
  catch (err:unknown ) {
    if ((err as Error).message === 'INVALID_PAYLOAD') return bad('BAD_REQUEST', 400);
    return bad('SERVER_ERROR', 500);
  }
}