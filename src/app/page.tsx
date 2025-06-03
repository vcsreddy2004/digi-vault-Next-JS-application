import Image from "next/image";
export default function Home() {
  return (
    <div className="dark:bg-gray-900 h-screen w-screen relative">
      <Image src="/bank.webp" alt="Digi Vault" fill />
    </div>
  );
}
