'use server'
import Patient from '@/models/patient.model';
import { connectDB } from '@/lib/db';
import { auth } from '@/auth';


export const addBloodPressure = async (patientId: string, systolic: number, diastolic: number, date: string) => {
	try {
		await connectDB();
		const patient = await Patient.findById(patientId);
		if (!patient) throw new Error('Patient not found');
		patient.bloodPressure.push({ systolic, diastolic, date });
		await patient.save();
		return {success: true};
	} catch (error) {
		const err = error as Error;
		console.log("error adding blood pressure", err.message);
		return {success: false, message: err.message};
	}
}

export const addBloodSugar = async (patientId: string, value: number, date: string) => {
	try {
		await connectDB();
		const patient = await Patient.findById(patientId);
		if (!patient) throw new Error('Patient not found');
		patient.bloodSugar.push({ value, date });
		await patient.save();
		return {success: true};
	} catch (error) {
		const err = error as Error;
		console.log("error adding blood sugar", err.message);
		return {success: false, message: err.message};
	}
}

export const addMedication = async (form : FormData) => {
	try {
		const session = await auth();
		if (!session || !session.user) throw new Error('Unauthorized');
		const patientId = session.user.id;
		const name = form.get('name') as string;
		const dosage = form.get('dosage') as string;
		const frequency = form.get('frequency') as string;
		const date = form.get('date') as string
		await connectDB();
		const patient = await Patient.findById(patientId);
		if (!patient) throw new Error('Patient not found');
		if (!name || !dosage || !frequency || !date) throw new Error('Invalid input');
		if (isNaN(parseInt(frequency))) throw new Error('Invalid frequency');
		if (isNaN(parseInt(dosage))) throw new Error('Invalid dosage');
		const existing = patient.medications.find((med : {name: string}) => med.name === name);
		if (existing) throw new Error('Medication already exists');
		patient.medications.push({ name, dosage, frequency, dates: [date] });
		await patient.save();
		return {success: true};
	} catch (error) {
		const err = error as Error;
		console.log("error adding medication", err.message);
		return {success: false, message: err.message};
	}
}


export const takeMedication = async (name: string, date: string) => {
	try {
		const session = await auth();
		if (!session || !session.user) throw new Error('Unauthorized');
		const patientId = session.user.id;
		await connectDB();
		const patient = await Patient.findById(patientId);
		if (!patient) throw new Error('Patient not found');
		const medication = patient.medications.find((med : {name: string}) => med.name === name);
		if (!medication) throw new Error('Medication not found');
		medication.dates.push(date);
		await patient.save();
		return {success: true};
	} catch (error) {
		const err = error as Error;
		console.log("error taking medication", err.message);
		return {success: false, message: err.message};
	}
}
