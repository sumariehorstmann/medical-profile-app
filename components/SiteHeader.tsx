"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function SiteHeader() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;
      setIsLoggedIn(!!session);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setIsLoggedIn(!!session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await supabase.auth.signOut();
      window.location.href = "/";
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header style={styles.header}>
      <Link href="/" style={styles.headerLogo} aria-label="RROI Home">
        <Image
          src="/logo.png"
          alt="RROI logo"
          width={40}
          height={40}
          style={{ objectFit: "contain" }}
          priority
        />
        <span style={styles.headerBrandText}>RROI</span>
      </Link>

      <div style={styles.headerActions}>
        {isLoggedIn === null ? null : isLoggedIn ? (
          <button
            type="button"
            onClick={handleLogout}
            style={styles.logoutBtn}
            disabled={loggingOut}
          >
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        ) : (
          <>
            <Link href="/login" style={styles.loginLink}>
              Log in
            </Link>

            <Link href="/login" style={styles.signupLink}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";
const BORDER = "#E5E7EB";

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    height: 68,
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${BORDER}`,
    background: "#FFFFFF",
  },
  headerLogo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  headerBrandText: {
    color: TEXT,
    fontWeight: 900,
    fontSize: 16,
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  loginLink: {
    textDecoration: "none",
    fontWeight: 800,
    color: BRAND_GREEN,
    padding: "8px 10px",
    borderRadius: 12,
  },
  signupLink: {
    textDecoration: "none",
    fontWeight: 900,
    color: "#FFFFFF",
    background: BRAND_GREEN,
    padding: "8px 14px",
    borderRadius: 10,
  },
  logoutBtn: {
    border: "none",
    background: "transparent",
    color: BRAND_GREEN,
    fontWeight: 800,
    fontSize: 14,
    cursor: "pointer",
    padding: "8px 10px",
    borderRadius: 12,
  },
};