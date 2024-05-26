"use client";

import PagesNavbar from "@/components/navbar/pages-navbar";
import { useSession } from "next-auth/react";

export function NavBar() {
  const { data: session, status } = useSession();

  return (
    <PagesNavbar role={`${session?.user?.role}`} />
  );
}
