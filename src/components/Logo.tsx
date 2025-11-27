import Image from "next/image";

export function Logo({ className = "h-[83px] w-[83px]" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/chcemmat.PNG"
        alt="ChcemMať Logo"
        width={208}
        height={208}
        className={className}
        style={{
          mixBlendMode: "multiply",
          filter: "contrast(1.1) saturate(1.1)"
        }}
        quality={100}
        priority
      />
    </div>
  );
}
