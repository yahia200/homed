'use server'
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import Patient from "@/models/patient.model";

export const register_action = async (name: string, password: string, email: string) => {
	try {
		await connectDB();
		const existingUser = await Patient.findOne({ name });
		if (existingUser) {
			throw new Error("User already exists");
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = new Patient({ name, password: hashedPassword, email });
		await user.save();
		return {success: true, message: "User registered"};
	} catch (error) {
		const err = error as Error;
		console.error("error in register_action", err.message);
		return {success: false, message: err.message};
	}
}


export const login_action = async (name: string, password: string) => {
	try {
		const res = await signIn("credentials", {
			username: name,
			password: password,
      redirect: false,
    });
		console.log("res", res);
			return {success: true, message: "Logged in"};
	} catch (error) {
		const err = error as CredentialsSignin;
		console.error("error in login_action", err.code);
		return {success: false, message: err.code};
	}

}
