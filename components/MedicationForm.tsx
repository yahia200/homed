'use client'
import React, { useState } from "react";
import { addMedication } from "@/server_actions/data";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { getLocalDateTime } from "@/lib/date";

function MedicationForm() {
	const [loading, setLoading] = useState(false);
  const inputStyle = "block mx-auto rounded-xl px-2 py-1 w-[25ch] border";

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true);
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		await addMedication(form).then((res) => {
			if (res.success) {
				toast.success("Medication added successfully");
				window.location.reload();
			} else {
				toast.error(res.message || "Error adding medication");
			}
		}
		);
		setLoading(false);

	}

  return (
    <div>
      {" "}
      <form className="bg-foreground w-fit p-2 rounded-xl mx-auto" onSubmit={onSubmit}>
        <div className="flex gap-4 mb-2">
          <div>
            <label>Medication Name</label>
            <input
              type="text"
              name="name"
              placeholder="Medication Name"
              className={inputStyle}
            />
          </div>
          <div>
            <label>Frequency</label>
            <input
              type="text"
              name="frequency"
              placeholder="Frequency(Hours)"
              className={inputStyle}
            />
          </div>
          <div>
            <label>Dosage</label>
            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              className={inputStyle}
            />
          </div>
          <div>
            <label>Last Taken</label>
            <input
              type="datetime-local"
              name="date"
              placeholder="Last Taken"
							defaultValue={getLocalDateTime()}
              className={inputStyle}
            />
          </div>
        </div>
        <button type="submit" className="bg-primary block mx-auto text-white rounded-xl px-2 py-1 h-[3.5ch] w-[25ch] text-center active:bg-primary/50">
					{loading ?
					<FiLoader className="animate-spin mx-auto" />
					:
          "Add Medication"
					}
        </button>
      </form>
    </div>
  );
}

export default MedicationForm;
