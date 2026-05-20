import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SigmaLogoProps {
  href?: string;
  className?: string;
  variant?: "default" | "compact" | "light";
}

export default function SigmaLogo({
  href = "https://sigmaschool.co",
  className,
  variant = "default",
}: SigmaLogoProps) {
  const isLight = variant === "light";
  const isCompact = variant === "compact";

  const inner = (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/sigma-logo.png"
        alt="Sigma School"
        width={isCompact ? 110 : 140}
        height={isCompact ? 22 : 28}
        priority
        className={cn(isLight && "brightness-0 invert")}
        style={{
          width: isCompact ? "110px" : "140px",
          height: "auto",
        }}
      />
    </div>
  );

  if (!href) return inner;

  return (
    <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {inner}
    </Link>
  );
}
