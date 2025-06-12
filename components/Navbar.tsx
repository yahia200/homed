import React from 'react'
import { auth, signOut } from '@/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function Navbar() {
	const session = await auth();
	if (!session || !session.user) return null;
  return (
    <nav className="bg-navbar fixed z-10 flex items-center justify-between px-3 h-9 w-full">
		<Link className="text-black font-bold" href="/home">{session.user.name}</Link>
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
