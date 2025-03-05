import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

async function page() {
	const session = await auth()
	if (!session || !session.user) redirect('/login')
  return (
    <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto w-fit mt-8">{
			session.user.bloodPressure.map((bp, i) => (
				<div key={i} className="bg-foreground grid grid-cols-2 gap-4 w-fit rounded-xl p-4">
					<span>{`Date: ${bp.date.toString().split('T')[0]}`}</span>
					<span>{`Time: ${bp.date.toString().split('T')[1].split('.')[0]}`}</span>
					<span className="text-red-500">{`Systolic: ${bp.systolic}`}</span>
					<span className="text-blue-700">{`Diastolic: ${bp.diastolic}`}</span>
				</div>
			))

		}</div>
  )
}

export default page
