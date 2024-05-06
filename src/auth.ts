import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user/user";
import { UserRole } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

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
    // signOut: "/auth/signout",
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
  },
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
    async signIn({ user, account }){

      console.log(user, account)
      if(account?.provider !== "credentials") 
        return true;

      const existingUser = await getUserById(user.id!);
      if(!existingUser?.emailVerified)
        return false;

      // add 2FA here
      
      return true
    },

    async session({ session, token }) {
      console.log({ sessionToken: token });
      if (token.sub && session.user) session.user.id = token.sub;

      if (token.role && session.user)
        session.user.role = token.role as UserRole;

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),

  session: { strategy: "jwt" },
  ...authConfig,
});
