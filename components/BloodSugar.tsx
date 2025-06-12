
'use client'
import React, { useState, useEffect } from 'react'
import { addBloodSugar } from '@/server_actions/data'
import toast from 'react-hot-toast'
import { FiLoader } from 'react-icons/fi'

function BloodSugar({ visable, hide, id } : { visable: boolean, hide: () => void, id: string }) {
    const [vis, setVis] = useState(visable)
    const [loading, setLoading] = useState(false)

    const submit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        if (!id) return
        const form = e.target as HTMLFormElement
        const bloodSugar = form.bloodSugar.value
        if (isNaN(parseInt(bloodSugar))) {
            toast.error("Invalid Blood Sugar")
            setLoading(false)
            return
        }
        else if (parseInt(bloodSugar) < 0 || parseInt(bloodSugar) > 300) {
            toast.error("Invalid Blood Sugar Range")
            setLoading(false)
            return
        }
        const date = form.date.value
        await addBloodSugar(id, bloodSugar, date).then(res => {
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
            <input name="bloodSugar" type="text" placeholder="Blood Sugar" className={inputStyle} />
            <input name="date" type="datetime-local" className={inputStyle} defaultValue={getLocalDateTime()} />
            <button type="submit" className="bg-btn-primary p-1 rounded-xl h-[4ch]">
                {loading ? <FiLoader className="mx-auto animate-spin" /> : "Submit"}
                </button>
            <button type="button" onClick={hide} className="bg-missed p-1 rounded-xl h-[4ch]">Cancel</button>
            </form>
        </div>
  )
}

export default BloodSugar
