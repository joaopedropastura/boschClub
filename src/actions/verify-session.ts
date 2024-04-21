import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function verifySession() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }

  return session;
}