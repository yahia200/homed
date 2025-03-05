import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Home from "@/components/Home";

async function page() {
	const session = await auth();
	if (!session || !session.user) redirect("/");
	console.log(session.user);
	return <Home user={session.user} />;
}

export default page;
