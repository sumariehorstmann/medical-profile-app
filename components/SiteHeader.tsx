"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export default function SiteHeader() {
  const supabase = useMemo(() => createSupabaseBrowser(), []);
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const showGuestButtons =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

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
  src="/logo-header.png"
  alt="RROI"
  width={240}
  height={55}
  priority
  style={styles.headerFullLogo}
/>
</Link>

      <div style={styles.headerActions}>
        {isLoggedIn === null ? null : showGuestButtons || !isLoggedIn ? (
          <>
            <Link href="/login" style={styles.loginLink}>
              Log in
            </Link>

            <Link href="/login?mode=signup" style={styles.signupLink}>
              Sign up
            </Link>
          </>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            style={styles.logoutBtn}
            disabled={loggingOut}
          >
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
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
  width: "100%",
  minHeight: 72,
  padding: "10px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  borderBottom: `1px solid ${BORDER}`,
  background: "#FFFFFF",
  boxSizing: "border-box",
},

headerLogo: {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  textDecoration: "none",
  minWidth: 0,
  flex: "1 1 auto",
},

headerFullLogo: {
  width: "clamp(150px, 42vw, 230px)",
  height: "auto",
  maxHeight: 56,
  objectFit: "contain",
  display: "block",
},

headerActions: {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 8,
  flexShrink: 0,
},

  loginLink: {
  textDecoration: "none",
  fontWeight: 800,
  color: BRAND_GREEN,
  padding: "8px 2px",
  borderRadius: 10,
  fontSize: 14,
  whiteSpace: "nowrap",
},

signupLink: {
  textDecoration: "none",
  fontWeight: 900,
  color: "#FFFFFF",
  background: BRAND_GREEN,
  padding: "8px 10px",
  borderRadius: 10,
  fontSize: 14,
  whiteSpace: "nowrap",
},

  logoutBtn: {
    border: "none",
    background: "transparent",
    color: BRAND_GREEN,
    fontWeight: 800,
    fontSize: 14,
    cursor: "pointer",
    padding: "8px 4px",
    borderRadius: 10,
    whiteSpace: "nowrap",
  },
};