import pool from "@/database/db";
import { NextResponse } from "next/server";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        try {
          const connection = await pool.getConnection();
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          let user = await connection.query(`SELECT * FROM admin WHERE email = '${credentials.email}'`);
          user = user[0][0];

          if (!user) {
            return null;
          }
          if (user.password) {
            return user.password === credentials.password ? user : null;
          }
          connection.release();
        } catch (error) {
          return NextResponse.json({ status: 400, errors: error.messages });
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
