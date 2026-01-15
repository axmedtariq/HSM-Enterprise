import React, { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { PatientCard } from '../components/PatientCard';
import { useHospitalStore } from '../store/hospitalStore';
import { Activity, Users, AlertTriangle, Brain } from 'lucide-react';

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const hospitalId = useHospitalStore((state) => state.hospitalId);

  useEffect(() => {
    // Fetching from the API we built in the previous step
    fetch(`/api/v1/patients`, {
      headers: { 'x-hospital-id': hospitalId }
    })
    .then(res => res.json())
    .then(data => setPatients(data.data));
  }, [hospitalId]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 text-slate-900">
      {/* Header with AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Users/>} label="Total Patients" value={patients.length} color="blue" />
        <StatCard icon={<AlertTriangle/>} label="High Risk (AI)" value="12" color="red" />
        <StatCard icon={<Brain/>} label="AI Scribe Active" value="8" color="purple" />
        <StatCard icon={<Activity/>} label="Bed Occupancy" value="84%" color="green" />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Patient Management</h2>
        <SearchBar /> {/* This is the Cmd+K Search we discussed */}
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {patients.map(patient => (
          <PatientCard key={patient._id} patient={patient} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-slate-200 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all">
      <div className={`text-${color}-500 mb-2`}>{icon}</div>
      <div className="text-slate-500 text-sm font-medium">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}