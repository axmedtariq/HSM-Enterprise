import { Schema, model } from 'mongoose';

const HospitalSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // e.g., 'apollo-nyc'
  subscriptionTier: { type: String, enum: ['Basic', 'Pro', 'Enterprise'], default: 'Basic' },
  config: {
    aiScribeEnabled: { type: Boolean, default: true },
    storageLimitGB: { type: Number, default: 100 }
  },
  createdAt: { type: Date, default: Date.now }
});

export const Hospital = model('Hospital', HospitalSchema);