// lib/response.ts
import { NextResponse } from 'next/server';

export function ok(data: unknown = {}) {
  return NextResponse.json(data, { status: 200 });
}

export function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
export function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

