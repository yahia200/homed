import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import Patient from "@/models/patient.model";

class InvalidLoginError extends CredentialsSignin {
	code = "Invalid identifier or password";
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
				const match = await bcrypt.compare(
					credentials.password as string,
					user.password,
				);
				if (user && match) {
					return {
						name: user.name,
						email: user.email,
						id: user._id.toString(),
						bloodPressure: user.bloodPressure || [],
						bloodSugar: user.bloodSugar || [],
						medications: user.medications || [],
					};
				} else {
					throw new InvalidLoginError();
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.bloodPressure = user.bloodPressure;	
				token.bloodSugar = user.bloodSugar;
				token.medications = user.medications;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.bloodPressure = token.bloodPressure;
				session.user.bloodSugar = token.bloodSugar;
				session.user.medications = token.medications;
			}
			return session;
		},
	},
});
