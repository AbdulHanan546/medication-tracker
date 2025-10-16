import { useState, useEffect } from "react";
import { getMedications } from "../services/medicationService";

export default function MedicationList() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    getMedications().then(setMedications);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Medications</h2>
      <div className="grid gap-4">
        {medications.map((med) => (
          <div key={med._id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold">{med.name}</h3>
            <p>Dosage: {med.dosage}</p>
            <p>Frequency: {med.frequency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
