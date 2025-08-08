import { prisma } from '@/lib/db';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { username, password } = await req.json();
    if (!username || !password) return NextResponse.json({ error: 'نام کاربری/رمز لازم است' }, { status: 400 });

    const exists = await prisma.user.findUnique({ where: { username } });
    if (exists) return NextResponse.json({ error: 'نام کاربری موجود است' }, { status: 409 });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { username, passwordHash } });
    const token = signToken(user.id  as Omit< , user.username);

    return NextResponse.json({ token, userId: user.id, username: user.username });
}