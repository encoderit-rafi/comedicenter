import NextAuth from "next-auth"
import type { JWT } from "next-auth/jwt"
import { authConfig } from "./auth.config"
import { API } from "./lib/fetch"

export const refreshAccessToken = async (token: JWT) => {
  try {
    const { data, error } = await API.Post(
      "auth/token",
      {
        token: token.user.accessToken,
        refresh_token: token.user.refreshToken,
      },
      undefined,
      { auth: false },
    )

    if (error || !data) {
      return {
        ...token,
        error: "RefreshAccessTokenError",
      }
    }
    return {
      ...token,
      user: {
        ...token.user,
        accessToken: data.token,
        refreshToken: data.refresh_token,
        tokenExpiry: data.token_expiry,
      },
    }
  } catch (e) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig)

