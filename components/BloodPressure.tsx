'use client'
import React, { useState, useEffect } from 'react'
import { addBloodPressure } from '@/server_actions/data'
import toast from 'react-hot-toast'
import { FiLoader } from 'react-icons/fi'

function BloodPressure({ visable, hide, id } : { visable: boolean, hide: () => void, id: string }) {
	const [vis, setVis] = useState(visable)
	const [loading, setLoading] = useState(false)

	const submit = async (e: React.FormEvent) => {
		setLoading(true)
		e.preventDefault()
		if (!id) return
		const form = e.target as HTMLFormElement
		const systolic = form.systolic.value
		const diastolic = form.diastolic.value
		if (isNaN(parseInt(systolic)) || isNaN(parseInt(diastolic))) {
			toast.error("Invalid Blood Pressure")
			setLoading(false)
			return
		}
		else if (parseInt(systolic) < 0 || parseInt(diastolic) < 0 || parseInt(systolic) > 300 || parseInt(diastolic) > 300) {
			toast.error("Invalid Blood Pressure")
			setLoading(false)
			return
		}
		const date = form.date.value
		await addBloodPressure(id, systolic, diastolic, date).then(res => {
			if (res.success) {
				toast.success("Blood Pressure Added")
				window.location.reload()
			} else {
				toast.error("Error Adding Blood Pressure")
			}
		}
		)
		setLoading(false)
		hide()
	}


	useEffect(() => {
		setVis(visable)
	}, [visable])

	const inputStyle = "bg-white p-2 rounded-xl border border-black"

	const getLocalDateTime = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset(); // Get offset in minutes
  const localTime = new Date(date.getTime() - offset * 60000);
  return localTime.toISOString().slice(0, 16);
};

  return vis && (
    <div className="h-screen w-screen z-[10] fixed top-0 left-0 flex justify-center items-center backdrop-filter backdrop-blur-sm bg-black/20">
			<form onSubmit={submit} className="bg-foreground rounded-2xl w-fit p-4 mx-auto mt-20 flex flex-col space-y-4">
			<input name="systolic" type="text" placeholder="Systolic" className={inputStyle} />
			<input name="diastolic" type="text" placeholder="Diastolic" className={inputStyle} />
			<input name="date" type="datetime-local" className={inputStyle} defaultValue={getLocalDateTime()} />
			<button type="submit" className="bg-btn-primary p-1 rounded-xl h-[4ch]">
				{loading ? <FiLoader className="mx-auto animate-spin" /> : "Submit"}
				</button>
			<button type="button" onClick={hide} className="bg-missed p-1 rounded-xl h-[4ch]">Cancel</button>
			</form>
		</div>
  )
}

export default BloodPressure
