import Image from "next/image";

export default function PageHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 24,
      }}
    >
      <Image
        src="/logo.png"
        alt="RROI"
        width={180}
        height={180}
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "180px",
        }}
        priority
      />
    </div>
  );
}