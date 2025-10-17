import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css';

// Medication List Page Component
const MedicationList = ({ medications, setMedications }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter medications based on search term
  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete medication
  const handleDelete = async (id) => {
    try {
      // Simulate API call to delete medication
      await fetch(`/api/medications/${id}`, { method: 'DELETE' });
      setMedications(medications.filter(med => med.id !== id));
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };

  return (
    <div className="container">
      <h1>Medication List</h1>
      <input
        type="text"
        placeholder="Search medications..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <Link to="/add" className="add-button">Add Medication</Link>
      <div className="medication-grid">
        {filteredMedications.length > 0 ? (
          filteredMedications.map(med => (
            <div key={med.id} className="medication-card">
              <h3>{med.name}</h3>
              <p><strong>Dosage:</strong> {med.dosage || 'Not specified'}</p>
              <p><strong>Frequency:</strong> {med.frequency || 'Not specified'}</p>
              <p><strong>Last Taken:</strong> {med.lastTaken ? new Date(med.lastTaken).toLocaleString() : 'Not taken'}</p>
              <p><strong>Reminders:</strong> {med.reminderTimes?.join(', ') || 'None'}</p>
              <p><strong>Notes:</strong> {med.notes || 'None'}</p>
              <div className="card-actions">
                <Link to={`/edit/${med.id}`} className="edit-button">Edit</Link>
                <button onClick={() => handleDelete(med.id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No medications found.</p>
        )}
      </div>
    </div>
  );
};

// Add/Edit Medication Page Component
const AddEditMedication = ({ medications, setMedications }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existingMed = isEdit ? medications.find(med => med.id === id) : null;

  const [formData, setFormData] = useState({
    name: existingMed?.name || '',
    dosage: existingMed?.dosage || '',
    frequency: existingMed?.frequency || '',
    reminderTimes: existingMed?.reminderTimes || [''],
    notes: existingMed?.notes || '',
    lastTaken: existingMed?.lastTaken || '',
  });
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle reminder times array
  const handleReminderChange = (index, value) => {
    const updatedReminders = [...formData.reminderTimes];
    updatedReminders[index] = value;
    setFormData(prev => ({ ...prev, reminderTimes: updatedReminders }));
  };

  // Add new reminder time field
  const addReminderField = () => {
    setFormData(prev => ({ ...prev, reminderTimes: [...prev.reminderTimes, ''] }));
  };

  // Remove reminder time field
  const removeReminderField = (index) => {
    setFormData(prev => ({
      ...prev,
      reminderTimes: prev.reminderTimes.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError('Medication name is required');
      return;
    }

    const medication = {
      ...formData,
      id: isEdit ? id : Date.now().toString(), // Temporary ID for frontend
      lastTaken: formData.lastTaken ? new Date(formData.lastTaken) : null,
    };

    try {
      if (isEdit) {
        // Simulate API call to update medication
        await fetch(`/api/medications/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(medication),
        });
        setMedications(medications.map(med => (med.id === id ? medication : med)));
      } else {
        // Simulate API call to add medication
        await fetch('/api/medications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(medication),
        });
        setMedications([...medications, medication]);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving medication:', error);
      setError('Failed to save medication');
    }
  };

  // Schedule browser notifications
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    formData.reminderTimes.forEach(time => {
      if (time) {
        const [hours, minutes] = time.split(':').map(Number);
        const now = new Date();
        const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

        if (reminderTime > now) {
          const timeout = reminderTime.getTime() - now.getTime();
          setTimeout(() => {
            if (Notification.permission === 'granted') {
              new Notification(`Time to take ${formData.name}!`, {
                body: `Dosage: ${formData.dosage || 'Not specified'}`,
              });
            }
          }, timeout);
        }
      }
    });
  }, [formData.name, formData.dosage, formData.reminderTimes]);

  return (
    <div className="container">
      <h1>{isEdit ? 'Edit Medication' : 'Add Medication'}</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="medication-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Dosage:
          <input
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
          />
        </label>
        <label>
          Frequency:
          <input
            type="text"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          />
        </label>
        <label>
          Reminder Times:
          {formData.reminderTimes.map((time, index) => (
            <div key={index} className="reminder-field">
              <input
                type="time"
                value={time}
                onChange={(e) => handleReminderChange(index, e.target.value)}
              />
              {formData.reminderTimes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeReminderField(index)}
                  className="remove-reminder"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addReminderField} className="add-reminder">
            Add Reminder Time
          </button>
        </label>
        <label>
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Taken:
          <input
            type="datetime-local"
            name="lastTaken"
            value={formData.lastTaken ? new Date(formData.lastTaken).toISOString().slice(0, 16) : ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="submit-button">
          {isEdit ? 'Update Medication' : 'Add Medication'}
        </button>
        <Link to="/" className="cancel-button">Cancel</Link>
      </form>
    </div>
  );
};

// Main App Component
const App = () => {
  const [medications, setMedications] = useState([]);

  // Fetch medications on mount (simulated API call)
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch('/api/medications');
        const data = await response.json();
        setMedications(data);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };
    fetchMedications();
  }, []);

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Medication List</Link>
        <Link to="/add">Add Medication</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<MedicationList medications={medications} setMedications={setMedications} />}
        />
        <Route
          path="/add"
          element={<AddEditMedication medications={medications} setMedications={setMedications} />}
        />
        <Route
          path="/edit/:id"
          element={<AddEditMedication medications={medications} setMedications={setMedications} />}
        />
      </Routes>
    </Router>
  );
};

export default App;