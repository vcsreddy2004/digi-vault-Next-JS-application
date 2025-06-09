"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function TitleLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      document.title = "Loading...";
    };

    const handleComplete = () => {
      setLoading(false);
      document.title = "Digi Vault";
    };

    handleStart(); 
    const timeout = setTimeout(handleComplete, 500); 

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
