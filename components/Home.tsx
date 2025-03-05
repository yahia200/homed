"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { User } from "next-auth";
import BloodPressure from "@/components/BloodPressure";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns"; // Import date-fns
import MedicationContainer from "@/components/MedicationContainer";

function Home({ user }: { user: User }) {
  const [bloodPressureVisible, setBloodPressureVisible] = useState(false);

  const hideBloodPressure = () => {
    setBloodPressureVisible(false);
  };

  const containerStyle = "p-3 bg-foreground rounded-2xl relative";
  const titleStyle = "text-center text-lg font-bold";
  const linkStyle =
    "bg-primary block mx-auto text-white rounded-xl px-2 py-1 w-[25ch] text-center";

  // Ensure user.bloodPressure is not undefined before mapping
  const formattedData = useMemo(() => {
    if (!user?.bloodPressure || user.bloodPressure.length === 0) return [];

    return user.bloodPressure.map((entry) => {
      const dateObj = new Date(entry.date);

      // Format date & time: "Mar 03, 12:54 PM"
      const formattedDateTime = format(dateObj, "MMM dd, hh:mm a");

      return { ...entry, date: formattedDateTime };
    });
  }, [user?.bloodPressure]);

  return (
    <div className="p-8 space-y-8 relative">
      <BloodPressure
        visable={bloodPressureVisible}
        hide={hideBloodPressure}
        id={user.id || ""}
      />

      {/* Medications Section */}
      <div className={containerStyle}>
        <h1 className={titleStyle}>Medications</h1>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3">
					{user.medications.map((med) => (
						<MedicationContainer key={med.name} med={med} minimal={true}/>
					))}
				</div>
        <Link href="/medication" className={linkStyle}>
          Edit Medication
        </Link>
      </div>

      {/* Blood Pressure Section */}
      <div className={containerStyle}>
				<Link className="px-3 text-white py-1 absolute right-2 top-2 text-sm bg-primary rounded-xl" href="/pressure" >Edit</Link>
        <h1 className={titleStyle}>Blood Pressure</h1>

        {/* Adjust chart height to prevent overlap */}
        <div className="w-full h-[30vh]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
              {/* Rotate labels to avoid overlap */}
              <XAxis dataKey="date" angle={0} textAnchor="middle" />
              <YAxis />
              <Tooltip />
              {/* Adjust legend position */}
              <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 10 }} />
              <Line type="monotone" dataKey="systolic" stroke="red" strokeWidth={2} />
              <Line type="monotone" dataKey="diastolic" stroke="blue" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <button
          className={linkStyle}
          onClick={() => setBloodPressureVisible(!bloodPressureVisible)}
        >
          Add Blood Pressure
        </button>
      </div>

      {/* Blood Sugar Section */}
      <div className={containerStyle}>
        <h1 className={titleStyle}>Blood Sugar</h1>
        <Link href="#" className={linkStyle}>
          Add Blood Sugar
        </Link>
      </div>
    </div>
  );
}

export default Home;

