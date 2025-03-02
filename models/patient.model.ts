import mongoose, { Schema, model } from "mongoose";

export interface IPatient {
	name: string;
	password: string;
	email: string;
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
	},
	{ timestamps: true },
);

const Patient = mongoose.models.Patient || model<IPatient>("Patient", patientSchema);

export default Patient;
