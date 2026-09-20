import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import DashboardLayout from "../Layouts/DashboardLayout";
import { auth } from "../firebase";

export default function Settings() {
  const navigate = useNavigate();

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      setError("");

      // Firebase logout
      await signOut(auth);

      // Clear application data
      localStorage.removeItem("labReportAnalysis");
      localStorage.removeItem("labReportText");

      // Go to login page
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Sign out error:", err);

      setError("Unable to sign out. Please try again.");
      setIsSigningOut(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#eefafa] p-6">

        {/* Header */}
        <div className="border-b border-[#d8e8e8] pb-4">
          <h1 className="text-2xl font-semibold text-slate-800">
            Settings
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Account settings
          </p>
        </div>

        {/* Account */}
        <div className="max-w-xl mt-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <h2 className="font-semibold text-slate-800 mb-4">
            Account
          </h2>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="
              px-5
              py-2.5
              rounded-xl
              border
              border-red-200
              bg-white
              text-red-600
              font-medium
              hover:bg-red-50
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}