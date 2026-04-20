"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setIsLoggedIn(!!data.session);
      setLoading(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setIsLoggedIn(!!session);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header
      style={{
        width: "100%",
        borderBottom: "1px solid #E5E7EB",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "#0F172A",
            fontWeight: 900,
            fontSize: 20,
          }}
        >
          <Image
            src="/logo.png"
            alt="RROI"
            width={32}
            height={32}
            style={{ width: 32, height: 32 }}
            priority
          />
          <span>RROI</span>
        </Link>

        {loading ? null : isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#157A55",
              fontWeight: 800,
              fontSize: 16,
              cursor: "pointer",
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
    </header>
  );
}