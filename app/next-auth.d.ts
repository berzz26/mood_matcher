// next-auth.d.ts

import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string // Add accessToken property to the Session interface
  }
}