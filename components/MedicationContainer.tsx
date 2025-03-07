"use client";
import React, { useState } from "react";
import { takeMedication } from "@/server_actions/data";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/date";
import { Medication } from "@/types";
import Image from "next/image";

function MedicationContainer({
	med,
}: {
	med: Medication;
}) {
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
		const date = data.get("date") as string;
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
		const newDate = new Date(
			date.getTime() + 60000 * 60 * parseInt(med.frequency),
		);
		return formatDate(newDate);
	};

	const isMissed = () => {
		const date = new Date(
			new Date(med.dates[med.dates.length - 1]).getTime() +
			60000 * 60 * parseInt(med.frequency),
		);

		return date < new Date();
	};

	const inputStyle =
		"bg-white text-sm p-1 mx-auto rounded-xl border border-black w-full mb-3";

	const getLocalDateTime = () => {
		const date = new Date();
		const offset = date.getTimezoneOffset(); // Get offset in minutes
		const localTime = new Date(date.getTime() - offset * 60000);
		return localTime.toISOString().slice(0, 16);
	};

	return (
		<div
			key={med.name}
			className={`${isMissed() ? "bg-red-400" : "bg-secondary"} border border-background shadow-sm w-full p-2 rounded-xl mx-auto`}
		>
			<h1 className="text-center text-xl font-bold">{med.name}</h1>
			<h2 className="text-center text-xl">{getNextTime()}</h2>
			<div className="sm:text-lg grid grid-cols-1 sm:grid-cols-3 my-6">
				<div className="grid grid-cols-2 col-span-2 mb-4">
					<span className="flex items-center mx-auto">
						<Image
							src="/pill.png"
							alt="clock"
							width={20}
							height={20}
							className="w-[18px] h-[18px]"
						/>
						<p className="ml-2">{med.dosage}</p>
					</span>

					<span className="flex items-center mx-auto">
						<Image
							src="/hourglass.png"
							alt="clock"
							width={20}
							height={20}
							className="w-[18px] h-[18px]"
						/>
						<p className="ml-2">{med.frequency + " hr"}</p>
					</span>
				</div>
				<span className="flex items-center mx-auto">
					<Image
						src="/clock.png"
						alt="clock"
						width={20}
						height={20}
						className="w-[20px] h-[20px]"
					/>
					<p className="ml-2">
						{formatDate(new Date(med.dates[med.dates.length - 1]))}
					</p>
				</span>
			</div>
			<form
				className="flex flex-col items-center justify-center"
				onSubmit={take}
			>
				<input
					name="date"
					type="datetime-local"
					className={inputStyle}
					defaultValue={getLocalDateTime()}
				/>
				<div className="w-full flex gap-2">
					<button
						type="submit"
						className="bg-blue-400 text-sm text-white rounded-xl w-full py-1 mx-auto block h-[4ch] border border-black"
					>
						{loading ? (
							<FiLoader className="animate-spin mx-auto" />
						) : confirm ? (
							"Confirm"
						) : (
							"Take"
						)}
					</button>
					{confirm && (
						<button
							type="button"
							onClick={() => setConfirm(false)}
							className="bg-red-400 border border-black text-sm text-white rounded-xl w-full py-1 mx-auto block h-[4ch]"
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
