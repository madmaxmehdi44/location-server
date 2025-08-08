// app/api/locations/route.ts
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { ok, bad } from '@/lib/response';
import { parseBody } from '@/lib/validation';
import { LocationSchema } from '@/📄 schemas/location';

export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);
    const { lat, lng, accuracy } = await parseBody(LocationSchema, req);
    await prisma.location.create({
      data: { userId: user.sub, lat, lng, accuracy },
    });
    return ok({ ok: true });
  } catch (err:unknown ) {
    if ((err as Error).message === 'INVALID_PAYLOAD') return bad('BAD_REQUEST', 400);
    if ((err as Error).message === 'INVALID_PAYLOAD') return bad('BAD_REQUEST', 400);

    if (err.message === 'UNAUTHORIZED') return bad('UNAUTHORIZED', 401);
    // if (err.message === 'INVALID_PAYLOAD') return bad('BAD_REQUEST', 400);
    return bad('SERVER_ERROR', 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    requireAuth(req);
    const limit = Math.min(Number(req.nextUrl.searchParams.get('limit') ?? 200), 500);

    const items = await prisma.location.findMany({
      distinct: ['userId'],
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: { select: { username: true } } },
    });

    return ok(
      items.map(r => ({
        userId: r.userId,
        username: r.user.username,
        lat: r.lat,
        lng: r.lng,
        accuracy: r.accuracy,
        ts: r.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    if (err.message === 'UNAUTHORIZED') return bad('UNAUTHORIZED', 401);
    return bad('SERVER_ERROR', 500);
  }
}