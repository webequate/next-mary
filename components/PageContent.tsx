"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Trigger re-render with new key on pathname change to restart animation
    setKey((prev) => prev + 1);
  }, [pathname]);

  return (
    <div key={key} className={`page-content ${className || ""}`}>
      {children}
    </div>
  );
}
