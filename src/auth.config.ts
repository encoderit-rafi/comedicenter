import { NextAuthConfig, type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialProvider from "next-auth/providers/credentials";
import { refreshAccessToken } from "./auth";
import { API } from "./lib/fetch";

type ExtendedUser = DefaultSession["user"] & {
  role?: "Patient" | "User" | "ClinicAdmin" | "Staff" | "Doctor";
  uid?: string;
  id?: string;
  active?: boolean;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  tokenExpiry: string;
  user_type: string;
  phone?: string;
  clinic_id?: string;
  avatar?: string;
  error?: string;
};

declare module "next-auth/jwt" {
  interface JWT {
    user: ExtendedUser;
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    error?: string;
  }

  interface User {
    role?: "Patient" | "User" | "ClinicAdmin" | "Staff" | "Doctor";
    uid?: string;
    id?: string;
    active?: boolean;
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    tokenExpiry: string;
    phone?: string;
    avatar?: string;
    user_type: string;
    error?: string;
    clinic_id?: string;
  }
}

export const authConfig = {
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 24 * 60 * 60, // 60 days
  },
  jwt: {
    maxAge: 60 * 24 * 60 * 60,
  },
  secret: "sdfdsfsdf",
  debug: process.env.NEXT_AUTH_DEBUG === "Y",
  callbacks: {
    async session({ token, session }) {
      if (token.error) {
        console.warn("Session callback error:", token.error);
      }
      return { ...session, user: token.user, error: token?.error };
    },
    async jwt({ token, user, account, profile, session, trigger }) {
      if (user) {
        return {
          ...token,
          user,
        };
      }
      if (trigger === "update") {
        token.user = { ...token.user, ...session };
      }
      if (new Date() < new Date(token?.user?.tokenExpiry)) {
        return token;
      }
      return refreshAccessToken(token);
    },
  },
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        info: { label: "Info", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("No credentials provided");
          return null;
        }

        const { username, password, info } = credentials;

        const parsedInfo = typeof info === "string" ? JSON.parse(info) : null;
        const { data, error } = await API.Login({
          username,
          password,
          info: parsedInfo,
        });

        if (error) {
          console.error("Login error:", error);
          return null;
        }

        return {
          ...data.user,
          accessToken: data.token,
          refreshToken: data.refresh_token,
          sessionId: data.session_id,
          tokenExpiry: data.token_expiry,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
