import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";

async function page() {
	const session = await auth();
	if (!session || !session.user) redirect("/");
	console.log(session.user);

	const containerStyle = "p-3 bg-foreground rounded-2xl";
	const titleStyle = " text-center text-lg font-bold";
	const linkStyle = "bg-primary block mx-auto text-white rounded-xl px-2 py-1 w-[25ch] text-center";
	return (
		<div className="p-8 space-y-8">
			<div className={containerStyle}>
				<h1 className={titleStyle}>Medications</h1>
				<p>{session.user.medications.length}</p>
				<Link href="#" className={linkStyle}>
					Edit Medication
				</Link>
			</div>

			<div className={containerStyle}>
				<h1 className={titleStyle}>Blood Pressure</h1>
				<p>{session.user.bloodPressure.length}</p>
				<Link href="#" className={linkStyle}>
					Add Blood Pressure
				</Link>
			</div>

			<div className={containerStyle}>
				<h1 className={titleStyle}>Blood Sugar</h1>
				<p>{session.user.bloodSugar.length}</p>
				<Link href="#" className={linkStyle}>
					Add Blood Sugar
				</Link>
			</div>
		</div>
	);
}

export default page;
