import { Request, Response } from 'express';
import { Patient } from '@aegis/database';

export const getPatients = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = req; // From middleware
    
    // Strict isolation: only find patients belonging to this hospital
    const patients = await Patient.find({ hospitalId }).sort({ aiRiskScore: -1 });
    
    res.json({ success: true, data: patients });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

// AI Search Controller
export const aiSearchPatients = async (req: Request, res: Response) => {
  const { queryVector } = req.body;
  const { hospitalId } = req;

  // Perform Vector Search within the hospital's own data
  const results = await Patient.aggregate([
    {
      "$vectorSearch": {
        "index": "vector_index",
        "path": "medicalVector",
        "queryVector": queryVector,
        "numCandidates": 100,
        "limit": 5,
        "filter": { "hospitalId": hospitalId }
      }
    }
  ]);
  
  res.json(results);
};