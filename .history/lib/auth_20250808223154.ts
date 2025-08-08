import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  // در Vercel باید ست شود
  console.warn('JWT_SECRET is not set');
}

export type JwtPayload = {
  sub: string; // userId
  username: string;
  iat?: number;
  exp?: number;
};

export function signToken(payload: Omit<JwtPayload, 'iat' | 'exp'>, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function getUserFromRequest(req: NextRequest): JwtPayload | null {
  const auth = req.headers.get('authorization') || '';
  if (!auth.startsWith('Bearer ')) return null;
  const token = auth.slice(7);
  return verifyToken(token);
}