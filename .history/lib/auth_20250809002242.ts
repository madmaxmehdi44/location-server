// lib/auth.ts

import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error('JWT_SECRET is not set');

export type JwtPayload = { sub: string; username: string; };

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload | null {
  try { return jwt.verify(token, JWT_SECRET) as JwtPayload; }
  catch { return null; }
}

export function requireAuth(req: NextRequest): JwtPayload {
  const auth = req.headers.get('authorization')?.split(' ')[1];
  const user = auth && verifyToken(auth);
  if (!user) throw new Error('UNAUTHORIZED');
  return user;
}