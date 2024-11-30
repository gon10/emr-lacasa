"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Start loading when pathname or searchParams change
  useEffect(() => {
    setLoading(true);
    setProgress(10);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Progress animation
  useEffect(() => {
    if (loading && progress < 90) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 90);
        });
      }, 300);

      return () => clearInterval(timer);
    }
  }, [loading, progress]);

  if (!loading && progress === 0) return null;

  return (
    <Progress
      value={progress}
      className="fixed top-0 left-0 right-0 z-50 h-1 w-full transition-all duration-300 ease-in-out"
    />
  );
}
