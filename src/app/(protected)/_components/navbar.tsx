"use client";

import UserButton from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-full mb-4">
      <div className="flex gap-x-2">

        <Image src={"./clubBosch.svg"} width={40} height={40} alt={""} ></Image>

        <Button
          asChild
          variant={pathname === "/" ? "default" : "outline"}
        >
          <Link href="/">Home</Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href="/admin">Admin</Link>
        </Button>
      </div>

      <UserButton />
    </nav>
  );
};
