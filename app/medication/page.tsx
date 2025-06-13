import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Medication } from "@/types";
import MedicationForm from "@/components/MedicationForm";
import MedicationContainer from "@/components/MedicationContainer";

async function page() {
	const session = await auth();
	if (!session || !session.user) redirect("/");


	return (
		<div className="space-y-6 p-16">
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-foreground rounded-4xl w-11/12 mx-auto p-4 shadow-md border border-foreground">
			{ session.user.medications.map((med: Medication) => (
				<MedicationContainer med={med} key={med.name} />	
			))
			}
			</div>
		<MedicationForm />
		</div>
	);
}

export default page;
