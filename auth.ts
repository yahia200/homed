import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { connectDB } from "@/lib/db"
import bcrypt from "bcryptjs"
import Patient from "@/models/patient.model"
 

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}


export const { signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
				await connectDB();
				const user = await Patient.findOne({ name: credentials.username });
				const match = await bcrypt.compare(credentials.password as string, user.password);
				if (user && match) {
					return user
				} else {
					throw new InvalidLoginError();
				}
      },
    }),
  ],
})
