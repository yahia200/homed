import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
			bloodPressure: {high: number, low: number, date: Date}[];
			bloodSugar: {value: number, date: Date}[];
			medications: {name: string, dosage: string, frequency: string, dates: Date[]}[];
    } & DefaultSession["user"]
  }
  interface User {
		bloodPressure: {high: number, low: number, date: Date}[];
		bloodSugar: {value: number, date: Date}[];
		medications: {name: string, dosage: string, frequency: string, dates: Date[]}[];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
		bloodPressure: {high: number, low: number, date: Date}[];
		bloodSugar: {value: number, date: Date}[];
		medications: {name: string, dosage: string, frequency: string, dates: Date[]}[];
    /** The user's role */
  }
}
