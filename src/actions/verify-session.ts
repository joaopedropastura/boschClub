import { auth } from "@/auth";

export default async function verifySession() {
  const session = await auth()

  return session;
}