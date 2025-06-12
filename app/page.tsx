'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { register_action, login_action } from '@/server_actions/auth'
import { FiLoader } from 'react-icons/fi'

function Page() {
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
				window.location.href = '/home';
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
				setRegister(false);
			} else {
				toast.error(res.message);
			}
		});
		setLoading(false)
	}


	const inputStyle = "p-2 rounded-xl border"


	const renderForm = () => {
		if (register) {
			return (
				<>
			<h1 className="text-5xl font-bold mb-12">Register</h1>
				<form className="grid grid-cols-2 gap-x-4 gap-y-6" onSubmit={handleRegister}>
				<input name="name" type="text" placeholder="Name" className={inputStyle} />
				<input name="email" type="email" placeholder="Email" className={inputStyle} />
				<input name="password" type="password" placeholder="Password" className={inputStyle} />
				<input name="confirmPassword" type="password" placeholder="Confirm Password" className={inputStyle} />
				<button type="submit" className="bg-btn-primary col-span-2 h-[4ch] p-2 rounded-xl mb-2">{loading ?  <FiLoader className="animate-spin mx-auto" /> : "Register"}</button>
				</form>
				<button onClick={() => setRegister(false)} className="text-black underline my-2">Login</button>
				</>
			)
		}
		return (
			<>
			<h1 className="text-5xl font-bold mb-12">Login</h1>
				<form className="grid grid-cols-1 gap-y-6" onSubmit={handleLogin}>
				<input name="name" type="text" placeholder="Name" className={inputStyle} />
				<input name="password" type="password" placeholder="Password" className={inputStyle} />
				<button type="submit" className="bg-btn-primary h-[4ch] p-2 rounded-xl mb-2">{loading ?  <FiLoader className="animate-spin mx-auto" /> : "Login"}</button>
				</form>
				<button onClick={() => setRegister(true)} className="text-black underline my-2">Register</button>
				</>
		)
	};
  return (
		<div className="h-screen w-screen flex justify-center items-center bg-[url(/images/bg.png)] bg-cover bg-center">
    <div className="bg-foreground h-fit w-1/2 p-4 text-center rounded-3xl border-2">
			{renderForm()}
				</div>
		</div>
  )
}

export default Page
