// app/api/register/route.ts
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { ok, bad } from '@/lib/response';
import { AuthSchema } from 's';
import { parseBody } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const { username, password } = await parseBody(AuthSchema, req);
    if (await prisma.user.findUnique({ where: { username } }))
      return bad('USERNAME_TAKEN', 409);

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { username, passwordHash } });
    const token = signToken({ sub: user.id, username: user.username });
    return ok({ token, userId: user.id, username: user.username });
  } catch (err) {
    if (err.message === 'INVALID_PAYLOAD') return bad('BAD_REQUEST', 400);
    return bad('SERVER_ERROR', 500);
  }
}