"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type HeaderUser = {
  id: string;
} | null;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PageHeader() {
  const [user, setUser] = useState<HeaderUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user ? { id: user.id } : null);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id } : null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
      }}
    >
      <Link
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#111111",
          fontWeight: 900,
          fontSize: 18,
        }}
      >
        <img
          src="/logo.png"
          alt="RROI"
          style={{ height: 42, width: "auto", display: "block" }}
        />
        <span>RROI</span>
      </Link>

      {loading ? null : user ? (
        <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            color: "#157A55",
            fontWeight: 800,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Log out
        </button>
      ) : (
        <Link
          href="/login"
          style={{
            textDecoration: "none",
            color: "#157A55",
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          Log in
        </Link>
      )}
    </div>
  );
}