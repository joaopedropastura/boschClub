"use client"

import { usePathname } from "next/navigation";
import UserButton from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function PagesNavbar({ role }: { role: string }) {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-full mb-4">
      <div className="flex gap-x-2">
        <Image src={"./clubBosch.svg"} width={40} height={40} alt={""}></Image>

        <Button asChild variant={pathname === "/admin" ? "default" : "ghost"}>
          <Link href="/admin">Home</Link>
        </Button>
        <Button asChild variant={pathname === "/feed" ? "default" : "ghost"}>
          <Link href="/feed">Feed</Link>
        </Button>

        {role === "ADMIN" && (
          <Button
            asChild
            variant={pathname === "/admin/schedules" ? "default" : "ghost"}
          >
            <Link href="/admin/schedules">Agendamentos</Link>
          </Button>
        )}
      </div>

      <UserButton />
    </nav>
  );
}
