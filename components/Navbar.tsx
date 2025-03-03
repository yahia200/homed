import React from 'react'
import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'

async function Navbar() {
	const session = await auth();
	if (!session || !session.user) return null;
  return (
    <nav className="bg-primary flex justify-between py-2 px-4">
		<h1 className="text-white font-bold">{session.user.name}</h1>
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
