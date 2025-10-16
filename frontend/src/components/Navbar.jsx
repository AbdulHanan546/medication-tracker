import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">💊 MedTrack</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/medications" className="hover:underline">Medications</Link>
        </div>
      </div>
    </nav>
  );
}
