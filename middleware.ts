// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_req: NextRequest) {
  // For now, do nothing – just let the request through.
  return NextResponse.next();
}

// You can keep the matcher if you like, but it's not doing anything special now.
export const config = {
  matcher: ["/profile", "/e/:path*", "/login"],
};
