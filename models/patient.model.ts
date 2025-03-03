import mongoose, { Schema, model } from "mongoose";

export interface IPatient {
	name: string;
	password: string;
	email: string;
	bloodPressure: {high: number, low: number, date: Date}[];
	bloodSugar: {value: number, date: Date}[];
	medications: {name: string, dosage: string, frequency: string, dates: Date[]}[];
	createdAt: Date;
	updatedAt: Date;
}

const patientSchema = new Schema<IPatient>(
	{
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		bloodPressure: [
			{
				high: {
					type: Number,
					required: true,
				},
				low: {
					type: Number,
					required: true,
				},
				date: {
					type: Date,
					required: true,
				},
			},
		],
		bloodSugar: [
			{
				value: {
					type: Number,
					required: true,
				},
				date: {
					type: Date,
					required: true,
				},
			},
		],
		medications: [
			{
				name: {
					type: String,
					required: true,
				},
				dosage: {
					type: String,
					required: true,
				},
				frequency: {
					type: String,
					required: true,
				},
				dates: [
					{
						type: Date,
						required: true,
					},
				],
			},
		],
	},
	{ timestamps: true },
);

const Patient = mongoose.models.Patient || model<IPatient>("Patient", patientSchema);

export default Patient;
