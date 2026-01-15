import { Badge } from '@/components/ui/badge';
import { BrainCircuit } from 'lucide-react';

export function PatientCard({ patient }) {
  // Determine color based on AI Risk Score
  const riskColor = patient.aiRiskScore > 70 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';

  return (
    <div className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-400 transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg">{patient.name}</h3>
          <p className="text-slate-500 text-sm">Room {patient.roomNumber || 'N/A'} • {patient.age}y/o</p>
        </div>
        <Badge className={`${riskColor} rounded-full px-3 py-1 border-none font-bold`}>
          AI Risk: {patient.aiRiskScore}%
        </Badge>
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 mt-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase mb-2">
          <BrainCircuit size={14} /> AI Clinical Insight
        </div>
        <p className="text-sm text-slate-600 line-clamp-2">
          {patient.clinicalSummary || "Awaiting AI analysis of latest lab results..."}
        </p>
      </div>
      
      <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-2xl font-semibold group-hover:bg-indigo-600 transition-colors">
        View Full Records
      </button>
    </div>
  );
}