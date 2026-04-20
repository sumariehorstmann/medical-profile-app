import Image from "next/image";

export default function PageHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 30,
      }}
    >
      <Image
        src="/logo-full-v2.png"
        alt="RROI"
        width={260}
        height={260}
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "260px",
        }}
        priority
      />
    </div>
  );
}