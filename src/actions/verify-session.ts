import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function verifySession() {
  const session = await auth()
  if (!session) {
    redirect("/auth/login");
  }

  return session;
}