import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          AI Lab Report
        </Link>

        <div className="hidden md:flex gap-8">

          <Link to="/">Home</Link>

          <Link to="/upload">Upload</Link>

          <Link to="/analysis">Analysis</Link>

          <Link to="/history">History</Link>

        </div>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>

      </div>

    </nav>
  );
}