// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
 interface Session {
   user: {
     id: string
     role?: string
   } & DefaultSession["user"]
   backendAccessToken?: string
   backendRefreshToken?: string
   backendTokenExpires?: number
   error?: string
 }

 interface User extends DefaultUser {
   id: string
   role?: string
   accessToken?: string
   refreshToken?: string
   tokenExpires?: number
 }
}

declare module "next-auth/jwt" {
 interface JWT {
   backendAccessToken?: string
   backendRefreshToken?: string
   backendTokenExpires?: number
   user?: {
     id: string
     name?: string | null
     email?: string | null
     image?: string | null
     role?: string
   }
   error?: string
 }
}