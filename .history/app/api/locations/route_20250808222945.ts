import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ثبت موقعیت
export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

    const { lat, lng, accuracy } = await req.json();
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return NextResponse.json({ error: 'lat/lng required' }, { status: 400 });
    }

    await prisma.location.create({
      data: {
        userId: user.sub,
        lat,
        lng,
        accuracy: typeof accuracy === 'number' ? accuracy : null
      }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}

// دریافت موقعیت‌ها
export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const sinceParam = searchParams.get('since');
    const limitParam = searchParams.get('limit');

    const since = sinceParam ? new Date(parseInt(sinceParam, 10) * 1000) : null;
    const limit = limitParam ? Math.min(parseInt(limitParam, 10), 500) : 200;

    // آخرین n رکورد اخیر را بگیر و در حافظه dedupe کن تا هر کاربر یک آیتم آخر داشته باشد
    const rows = await prisma.location.findMany({
      where: since ? { createdAt: { gt: since } } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: { select: { username: true } } }
    });

    const latestByUser = new Map<string, typeof rows[number]>();
    for (const r of rows) {
      if (!latestByUser.has(r.userId)) latestByUser.set(r.userId, r);
    }

    const items = Array.from(latestByUser.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map(r => ({
        userId: r.userId,
        username: r.user.username,
        lat: r.lat,
        lng: r.lng,
        accuracy: r.accuracy,
        ts: r.createdAt.toISOString()
      }));

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}