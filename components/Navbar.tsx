import React from 'react'
import { auth, signOut } from '@/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function Navbar() {
	const session = await auth();
	if (!session || !session.user) return null;
  return (
    <nav className="bg-primary flex justify-between py-1 px-4 rounded-md w-[calc(100vw-50px)] mx-auto mt-3">
		<Link className="text-white font-bold" href="/home">{session.user.name}</Link>
			<form action={async () => {
			'use server'
			await signOut();
			redirect('/');
			}}>
		<button className="text-white">Sign Out</button>
		</form>
		</nav>
			
  )
}

export default Navbar
