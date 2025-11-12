import { NextRequest, NextResponse } from 'next/server';

// Minimal proxy to the Python daily-title backend.
// The backend base URL is read from DAILY_TITLE_BACKEND_URL (defaults to http://localhost:8001)

export async function GET(_: NextRequest) {
  const backendBase = ((globalThis as any).process?.env?.DAILY_TITLE_BACKEND_URL) || 'http://localhost:8001';
  const target = `${backendBase.replace(/\/$/, '')}/daily-title`;

  try {
    const res = await fetch(target, { method: 'GET' });
    const body = await res.text();

    // Forward response status and content-type
    const ct = res.headers.get('content-type') || 'application/json';
    const headers = new Headers();
    headers.set('content-type', ct);

    return new NextResponse(body, { status: res.status, headers });
  } catch (err) {
    console.error('Failed to call daily-title backend:', err);
    return NextResponse.json({ error: 'backend_unreachable' }, { status: 502 });
  }
}
