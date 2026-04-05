import Image from "next/image";

export default function PageHeader() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "24px 0 8px",
        background: "#FFFFFF",
      }}
    >
      <Image
        src="/logo-full-v2.png"
        alt="Rapid Response Online Information"
        width={260}
        height={260}
        priority
        style={{
          width: "220px",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
}