import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { loginSchema } from "@/schemas/user";
import { getUserByEmail } from "./data/user/user";

export default {
  providers: [
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success)
            return null;

        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);

        if (!user || !user.password)
            return null;

        const passwordsMatch = await bcrypt.compare(
            password, 
            user.password
        );
        if (passwordsMatch) 
            return user;

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
