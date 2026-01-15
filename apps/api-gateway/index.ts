import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://localhost:27017/hms_db"; 

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB 🏥"))
  .catch(err => console.error("Database connection error:", err));

// 1. Define a Patient Schema
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  status: String, // e.g., "Admitted", "Discharged", "Emergency"
  doctor: String
});

const Patient = mongoose.model('Patient', patientSchema);

// 2. API to get Real Stats from MongoDB
app.get('/api/stats', async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const emergencyCases = await Patient.countDocuments({ status: "Emergency" });
    const discharged = await Patient.countDocuments({ status: "Discharged" });

    res.json({
      totalPatients,
      activeDoctors: 12, // Static for now
      availableBeds: 50 - (totalPatients - discharged),
      emergencyCases
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// 3. SEED ROUTE: Run this once to add random data!
app.get('/api/seed', async (req, res) => {
  await Patient.deleteMany({}); // Clear old data
  const randomPatients = [
    { name: "John Doe", age: 45, gender: "Male", status: "Admitted", doctor: "Dr. Smith" },
    { name: "Jane Smith", age: 32, gender: "Female", status: "Emergency", doctor: "Dr. Adams" },
    { name: "Tariq Ali", age: 28, gender: "Male", status: "Admitted", doctor: "Dr. Wilson" },
    { name: "Sarah Khan", age: 55, gender: "Female", status: "Discharged", doctor: "Dr. Smith" },
    { name: "Mike Ross", age: 40, gender: "Male", status: "Emergency", doctor: "Dr. Adams" },
  ];
  await Patient.insertMany(randomPatients);
  res.send("Database Seeded with 5 Random Patients! 🏥");
});

app.get('/', (req, res) => {
  res.send("API Gateway is running with TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});