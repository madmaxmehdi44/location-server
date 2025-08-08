import { NextResponse } from 'next/server';

export function error(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function success(data: any = {}) {
  return NextResponse.json(data);
}