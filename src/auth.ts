import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationById } from "@/data/user/two-factor-confirmation";

import { PrismaClient } from "@prisma/client";
import getAccountById from "./data/user/account";

const prisma = new PrismaClient();

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  // secret: process.env.NEXTAUTH_SECRET,

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationById(
          user.id!
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) session.user.id = token.sub;

      if (token.role && session.user)
        session.user.role = token.role as UserRole;
      
      if (session.user)
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;

      if(session.user) {
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.isOauth = token.isOAuth! as boolean;
        session.user.id = token.sub!;
      }

      return session;
    },
    async jwt({ token }) {
  
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountById(existingUser.id!);

      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;
      token.email = existingUser.email;
      token.name = existingUser.name;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),

  session: { strategy: "jwt" },
  ...authConfig,
});
