import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOauth: boolean;
  cpf: string;
  edv: string;
  id: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
