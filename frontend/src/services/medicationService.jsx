import axios from "axios";

const API_URL = "http://localhost:5000/api/medications";

export const getMedications = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addMedication = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};
