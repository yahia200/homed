"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { User } from "next-auth";
import BloodPressure from "@/components/BloodPressure";
import BloodSugar from "@/components/BloodSugar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format } from "date-fns"; // Import date-fns
import MedicationContainer from "@/components/MedicationContainer";

function Home({ user }: { user: User }) {
  const [bloodPressureVisible, setBloodPressureVisible] = useState(false);
  const [bloodSugarVisible, setBloodSugarVisible] = useState(false);

  const hideBloodPressure = () => {
    setBloodPressureVisible(false);
  };

  const hideBloodSugar = () => {
    setBloodSugarVisible(false);
  };

  const containerStyle =
    "p-3 bg-foreground rounded-3xl relative shadow-md border border-foreground/40";
  const titleStyle = "text-center text-2xl font-bold";
  const linkStyle =
    "bg-btn-primary block mx-auto rounded-xl px-2 py-1 w-[25ch] text-center";

  // Ensure user.bloodPressure is not undefined before mapping
  const formattedBPData = useMemo(() => {
    if (!user?.bloodPressure || user.bloodPressure.length === 0) return [];

    return user.bloodPressure.map((entry) => {
      const dateObj = new Date(entry.date);

      // Format date & time: "Mar 03, 12:54 PM"
      const formattedDateTime = format(dateObj, "MMM dd, hh:mm a");

      return { ...entry, date: formattedDateTime };
    });
  }, [user?.bloodPressure]);

  const formattedBSData = useMemo(() => {
    if (!user?.bloodSugar || user.bloodSugar.length === 0) return [];

    return user.bloodSugar.map((entry) => {
      const dateObj = new Date(entry.date);

      // Format date & time: "Mar 03, 12:54 PM"
      const formattedDateTime = format(dateObj, "MMM dd, hh:mm a");

      return { ...entry, date: formattedDateTime };
    });
  }, [user?.bloodSugar]);

  return (
    <div className="p-2 space-y-8 relative pt-16">
      <BloodPressure
        visable={bloodPressureVisible}
        hide={hideBloodPressure}
        id={user.id || ""}
      />
      <BloodSugar
        visable={bloodSugarVisible}
        hide={hideBloodSugar}
        id={user.id || ""}
      />

      {/* Medications Section */}
      <div className={containerStyle}>
        <h1 className={titleStyle}>Medications</h1>
        <hr className="border-black/30 w-1/2 mx-auto my-6" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {user.medications.map((med) => (
            <MedicationContainer key={med.name} med={med} />
          ))}
        </div>
        <Link href="/medication" className={linkStyle}>
          Edit Medication
        </Link>
      </div>

      {/* Blood Pressure Section */}
      <div className={containerStyle}>
        {/* <Link
          className="px-3 py-1 absolute right-3 top-3 text-sm bg-btn-primary rounded-3xl border border-black"
          href="/pressure"
        >
          Edit
        </Link> */}
        <h1 className={titleStyle}>Blood Pressure</h1>

        <hr className="border-black/30 w-1/2 mx-auto my-6" />
        {/* Adjust chart height to prevent overlap */}
        <div className="w-full h-[30vh]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedBPData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }} // Remove extra left margin
            >
              {/* X-Axis - Centered and adjusted */}
              <XAxis
                dataKey="date"
                angle={-30}
                textAnchor="end"
                tickMargin={10}
                tick={{ fontSize: 0 }}
              />

              {/* Y-Axis - Ensure no extra spacing */}
              <YAxis tickMargin={10} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                }}
                labelStyle={{ color: "#000" }}
                itemStyle={{ color: "#000" }}
              />

              {/* Legend position adjusted */}
              <Legend
                verticalAlign="top"
                wrapperStyle={{ paddingBottom: 10 }}
              />

              {/* Blood Pressure Lines */}
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#FFFFFF"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#000000"
                strokeWidth={2}
              />
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
        <hr className=" border-black/30 w-1/2 mx-auto my-6" />
        <div className="w-full h-[30vh]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedBSData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }} // Remove extra left margin
            >
              {/* X-Axis - Centered and adjusted */}
              <XAxis
                dataKey="date"
                angle={-30}
                textAnchor="end"
                tickMargin={10}
                tick={{ fontSize: 0 }}
              />

              {/* Y-Axis - Ensure no extra spacing */}
              <YAxis tickMargin={10} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                }}
                labelStyle={{ color: "#000" }}
                itemStyle={{ color: "#000" }}
              />
              {/* Blood Pressure Lines */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#000000"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <button
          className={linkStyle}
          onClick={() => setBloodSugarVisible(!bloodPressureVisible)}
        >
          Add Blood Sugar
        </button>
      </div>
    </div>
  );
}

export default Home;
