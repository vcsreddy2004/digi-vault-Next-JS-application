"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogOut() {
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => {
        if (res.ok) {
          router.replace("/");
        }
      });   
  }, [router]);

  return (
    <div className="text-center mt-10 text-lg text-gray-600">Logging you out...</div>
  );

}