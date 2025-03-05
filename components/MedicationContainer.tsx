"use client";
import React, { useState } from "react";
import { takeMedication } from "@/server_actions/data";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/date";
import { Medication } from "@/types";

function MedicationContainer({ med, minimal }: { med: Medication, minimal?: boolean }) {
	const [loading, setLoading] = useState(false);
	const [confirm, setConfirm] = useState(false);

	const take = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (loading) return;
		if (!confirm) {
			setConfirm(true);
			return;
		}
		setLoading(true);
		const data = new FormData(e.currentTarget);
		const date = data.get('date') as string;
		const res = await takeMedication(med.name, date);
		if (res.success) {
			toast.success("Medication taken successfully");
			window.location.reload();
		} else {
			toast.error(res.message || "An error occurred");
		}
		setLoading(false);
		setConfirm(false);
	};


	const getNextTime = () => {
		const date = new Date(med.dates[med.dates.length - 1]);
		const newDate = new Date(date.getTime() + 60000 * 60 * parseInt(med.frequency));
		return formatDate(newDate);
	}



	const inputStyle = "bg-white text-sm p-1 mx-auto rounded-xl border border-black";

	const getLocalDateTime = () => {
		const date = new Date();
		const offset = date.getTimezoneOffset(); // Get offset in minutes
		const localTime = new Date(date.getTime() - offset * 60000);
		return localTime.toISOString().slice(0, 16);
	};

	return (
		<div
			key={med.name}
			className="bg-secondary border border-background shadow-sm w-fit p-2 rounded-3xl mx-auto mb-2"
		>
			<h1 className="text-center text-lg font-bold">{med.name}</h1>
			<h2 className="text-center text-sm">{getNextTime()}</h2>
			{ !minimal && (
			<div className="gap-2 flex flex-col">
				<span>{`Dosage: ${med.dosage}`}</span>
				<span>{`Frequency: ${med.frequency}`}</span>
				<span>{`Last Taken: ${formatDate(new Date(med.dates[med.dates.length - 1]))}`}</span>
			</div>
			)}
			<form className="flex flex-col items-center justify-center mt-2" onSubmit={take}>
				<input
					name="date"
					type="datetime-local"
					className={inputStyle}
					defaultValue={getLocalDateTime()}
				/>
				<div className="w-full flex gap-2">
				<button
					type="submit"
					className="bg-primary text-sm text-white rounded-xl w-full py-1 mx-auto block mt-2 h-[3.5ch]"
				>
					{loading ? <FiLoader className="animate-spin mx-auto" /> : (confirm ? "Confirm" : "Take")}
				</button>
					{ confirm && (
						<button
							type="button"
							onClick={() => setConfirm(false)}
							className="bg-red-400 text-sm text-white rounded-xl w-full py-1 mx-auto block mt-2 h-[3.5ch]"
						>
							Cancel
						</button>
					)}
				</div>
			</form>
		</div>
	);
}

export default MedicationContainer;

