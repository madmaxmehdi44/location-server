import { prisma } from '@/lib/db';
import { JwtPayload, signToken } from '@/lib/auth';
import { error, success } from '@/lib/response';
import { AuthSchema } from '@/schemas/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const body = await req.json();
  const result = AuthSchema.safeParse(body);
  if (!result.success) return error('اطلاعات نامعتبر');

  const { username, password } = result.data;
  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) return error('نام کاربری موجود است', 409);

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { username, passwordHash } });
  const token = signToken(user.id as unknown as Omit<JwtPayload, "iat" | "exp">, username);

  return success({ token, userId: user.id, username });
}