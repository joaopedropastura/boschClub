"use client";

import { useSession } from "next-auth/react";

export function useCurrentRole() {
  const session = useSession();
  console.log(session.data?.user.role);
  return session.data?.user.role;
}
