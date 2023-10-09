import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials, req) {
            if (!credentials?.email || !credentials?.password) return null;

            const user = await prisma.user.findUnique({
               where: { email: credentials.email },
            });

            if (!user) return null;

            const match = await bcrypt.compare(credentials.password, user.password!);

            return match ? user : null;
         },
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
   ],
   session: {
      strategy: "jwt",
   },
   jwt: {
      maxAge: 3 * 60 * 60,
   },
};

export default authOptions;
