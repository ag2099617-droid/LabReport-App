import { useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";

export default function Profile() {
  const [fullName, setFullName] = useState("");

  const handleSave = () => {
    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    alert("Profile saved successfully!");
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Profile
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Your account details
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm w-full max-w-xl">
        
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="
              w-full
              h-12
              px-4
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-700
              outline-none
              transition
              focus:border-teal-500
              focus:ring-2
              focus:ring-teal-100
            "
          />
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={handleSave}
          className="
            mt-4
            px-5
            h-11
            bg-teal-600
            hover:bg-teal-700
            text-white
            rounded-xl
            font-semibold
            transition
            shadow-sm
          "
        >
          Save changes
        </button>

      </div>
    </DashboardLayout>
  );
}