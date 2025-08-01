// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import { Account, User as AuthUser, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import type { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      authorization: {
        params: {
          scope: "openid email profile",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    
    CredentialsProvider({
      id: "signin-credentials",
      name: "Sign In",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as { email: string; password: string };
          
          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          const response = await axios.post(`${process.env.BACKEND_URL}/auth/signin`, {
            email,
            password
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          const userData = response.data.user;
          
          return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            accessToken: userData.accessToken || response.data.accessToken,
            refreshToken: userData.refreshToken || response.data.refreshToken,
            tokenExpires: userData.tokenExpires || response.data.expiresAt,
          };
        } catch (err: any) {
          const message = err.response?.data?.message || err.message || "Sign in failed";
          throw new Error(message);
        }
      },
    }),

    CredentialsProvider({
      id: "signup-credentials",
      name: "Sign Up",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { username, email, password } = credentials as { 
            username: string; 
            email: string; 
            password: string; 
          };
          
          if (!username || !email || !password) {
            throw new Error("Username, email and password are required");
          }

          const response = await axios.post(`${process.env.BACKEND_URL}/auth/signup`, {
            username,
            email,
            password
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          const userData = response.data.user;
          
          return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            accessToken: userData.accessToken || response.data.accessToken,
            refreshToken: userData.refreshToken || response.data.refreshToken,
            tokenExpires: userData.tokenExpires || response.data.expiresAt,
          };
        } catch (err: any) {
          const message = err.response?.data?.message || err.message || "Sign up failed";
          throw new Error(message);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account | null }) {
      if (account?.provider === "signin-credentials" || account?.provider === "signup-credentials") {
        return true;
      }

      if (account?.provider === "google") {
        try {
          const response = await axios.post(`${process.env.BACKEND_URL}/auth/google`, {
            email: user.email,
            name: user.name,
            image: user.image,
            googleId: user.id,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          const userData = response.data.user;
          
          // Update user object with backend data
          user.id = userData.id;
          user.accessToken = userData.accessToken || response.data.accessToken;
          user.refreshToken = userData.refreshToken || response.data.refreshToken;
          user.tokenExpires = userData.tokenExpires || response.data.expiresAt;
          
          return true;
        } catch (err: any) {
          console.log("Error handling Google user", err.response?.data?.message || err.message);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, account }: { token: JWT; user?: AuthUser; account?: Account | null }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          backendAccessToken: user.accessToken,
          backendRefreshToken: user.refreshToken,
          backendTokenExpires: user.tokenExpires || Date.now() + 24 * 60 * 60 * 1000,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          },
        };
      }

      // Return previous token if the backend access token has not expired yet
      if (token.backendTokenExpires && Date.now() < token.backendTokenExpires) {
        return token;
      }

      // Backend access token has expired, try to refresh it
      return await refreshBackendToken(token);
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.user) {
        session.user = token.user;
      }
      session.backendAccessToken = token.backendAccessToken;
      session.backendRefreshToken = token.backendRefreshToken;
      session.backendTokenExpires = token.backendTokenExpires;
      session.error = token.error;

      return session;
    },
  },

  pages: {
    signIn: "/auth",
    signUp: "/auth/signup",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt" as const,
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Function to refresh backend access token
async function refreshBackendToken(token: JWT): Promise<JWT> {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/auth/refresh`, {
      refreshToken: token.backendRefreshToken,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const refreshedTokens = response.data;

    return {
      ...token,
      backendAccessToken: refreshedTokens.accessToken,
      backendTokenExpires: Date.now() + (refreshedTokens.expiresIn || 24 * 60 * 60) * 1000,
      backendRefreshToken: refreshedTokens.refreshToken ?? token.backendRefreshToken,
    };
  } catch (error: any) {
    console.log("Error refreshing backend token:", error.response?.data?.message || error.message);

    return {
      ...token,
      error: "RefreshBackendTokenError",
    };
  }
}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };