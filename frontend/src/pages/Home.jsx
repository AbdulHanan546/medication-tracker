import { useState, useEffect } from "react";
import { getMedications } from "../services/medicationService";
import { Link } from "react-router-dom";

export default function Home() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    getMedications().then(setMedications);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Today's Medications</h2>
        <Link
          to="/medications"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Medication
        </Link>
      </div>

      <div className="space-y-3">
        {medications.length === 0 ? (
          <p className="text-gray-600">No medications scheduled for today.</p>
        ) : (
          medications.map((med) => (
            <div key={med._id} className="p-4 bg-white rounded-xl shadow">
              <h3 className="text-lg font-semibold">{med.name}</h3>
              <p>{med.dosage} — {med.frequency}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
