"use client";
import { AuthContext } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function LogOut() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  useEffect(() => {
    auth.logOut();
  }, []);
  return (
    <div className="text-center mt-10 text-lg text-gray-600">Logging you out...</div>
  );

}