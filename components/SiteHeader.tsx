import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
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
        <Link href="/login" style={styles.loginLink}>
          Log in
        </Link>

        <Link href="/login" style={styles.signupLink}>
          Sign up
        </Link>
      </div>
    </header>
  );
}

const BRAND_GREEN = "#157A55";
const TEXT = "#0F172A";

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
    borderBottom: "1px solid #E5E7EB",
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
};