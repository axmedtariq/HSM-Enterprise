import { Schema, model } from 'mongoose';

const PatientSchema = new Schema({
  hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital', index: true, required: true },
  name: { type: String, required: true },
  age: Number,
  gender: String,
  medicalHistory: [{
    diagnosis: String,
    date: Date,
    treatment: String
  }],
  // 2026 AI FEATURES
  aiRiskScore: { type: Number, default: 0 }, // Predictive risk (0-100)
  clinicalSummary: String, // AI-generated summary of all records
  medicalVector: { 
    type: [Number], 
    index: 'vector' // MongoDB Atlas Vector Index
  },
  lastUpdated: { type: Date, default: Date.now }
});

export const Patient = model('Patient', PatientSchema);