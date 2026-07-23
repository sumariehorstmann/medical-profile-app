import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAIL = "support@rroi.co.za";

export async function requireAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    return {
      user: null,
      error: "Missing authentication token.",
      status: 401,
    };
  }

  const userClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await userClient.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      error: "Unauthorized.",
      status: 401,
    };
  }

  const userEmail = String(user.email || "").trim().toLowerCase();

  if (userEmail !== ADMIN_EMAIL) {
    return {
      user: null,
      error: "Admin access denied.",
      status: 403,
    };
  }

  return {
    user,
    error: null,
    status: 200,
  };
}