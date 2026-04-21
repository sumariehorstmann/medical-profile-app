import Image from "next/image";

export default function PageHeader() {
  return (
    <div style={styles.wrap}>
      <Image
        src="/logo-full-v2.png"
        alt="RROI"
        width={220}
        height={220}
        priority
        style={styles.logo}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: "100%",
    height: "auto",
    maxWidth: 200, // clean, consistent size across all pages
  },
};