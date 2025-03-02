'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { register_action, login_action } from '@/server_actions/auth'
import { FiLoader } from 'react-icons/fi'

function page() {
	const [register, setRegister] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true)
		e.preventDefault()
		const data = new FormData(e.currentTarget);
		const name = data.get('name') as string;
		const password = data.get('password') as string;
		if (name.length < 3) {
			toast.error("Name must be at least 3 characters long");
			setLoading(false)
			return;
		}

		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long");
			setLoading(false)
			return;
		}

		await login_action(name, password).then(res => {
			if (res.success) {
				toast.success(res.message);
			} else {
				toast.error(res.message);
			}
		});
		setLoading(false)
	}

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true)
		e.preventDefault()
		const data = new FormData(e.currentTarget);
		const name = data.get('name') as string;
		const password = data.get('password') as string;
		const email = data.get('email') as string;
		const confirmPassword = data.get('confirmPassword') as string;
		if (password !== confirmPassword) {
			toast.error("Passwords don't match");
			setLoading(false)
			return;
		}

		if (name.length < 3) {
			toast.error("Name must be at least 3 characters long");
			setLoading(false)
			return;
		}

		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long");
			setLoading(false)
			return;
		}

		if (email.length < 6) {
			toast.error("Email must be at least 6 characters long");
			setLoading(false)
			return;
		}

		await register_action(name, password, email).then(res => {
			if (res.success) {
				toast.success(res.message);
			} else {
				toast.error(res.message);
			}
		});
		setLoading(false)
	}


	const renderForm = () => {
		if (register) {
			return (
				<>
			<h1 className="text-2xl font-bold">Register</h1>
				<form className="flex flex-col gap-4 mt-4" onSubmit={handleRegister}>
				<input name="name" type="text" placeholder="Name" className="p-2 rounded-lg border" />
				<input name="email" type="email" placeholder="Email" className="p-2 rounded-lg border" />
				<input name="password" type="password" placeholder="Password" className="p-2 rounded-lg border" />
				<input name="confirmPassword" type="password" placeholder="Confirm Password" className="p-2 rounded-lg border" />
				<button type="submit" className="bg-primary text-white p-2 rounded-lg mb-2">{loading ?  <FiLoader className="animate-spin mx-auto" /> : "Register"}</button>
				</form>
				<button onClick={() => setRegister(false)} className="text-primary underline">Login</button>
				</>
			)
		}
		return (
			<>
			<h1 className="text-2xl font-bold">Login</h1>
				<form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
				<input name="name" type="text" placeholder="Name" className="p-2 rounded-lg border" />
				<input name="password" type="password" placeholder="Password" className="p-2 rounded-lg border" />
				<button type="submit" className="bg-primary text-white p-2 rounded-lg mb-2">{loading ?  <FiLoader className="animate-spin mx-auto" /> : "Login"}</button>
				</form>
				<button onClick={() => setRegister(true)} className="text-primary underline">Register</button>
				</>
		)
	};
  return (
		<div className="bg-background h-screen w-screen flex justify-center items-center">
    <div className="bg-foreground h-fit w-fit p-4 text-center rounded-3xl">
			{renderForm()}
				</div>
		</div>
  )
}

export default page
