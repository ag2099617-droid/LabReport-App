import {
  Activity,
  FileText,
  Upload,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

import DashboardLayout from "../Layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>

      {/* Dashboard Header */}
      <div className="mb-8">

        <p className="text-sm text-teal-600 font-medium">
          AI Lab Report Analyzer
        </p>

        <h1 className="text-3xl font-bold text-slate-800 mt-1">
          Good morning 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Here's an overview of your recent lab reports.
        </p>

      </div>


      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <Activity className="text-teal-600" />

          <p className="text-sm text-slate-500 mt-4">
            Reports analyzed
          </p>

          <h2 className="text-3xl font-bold mt-2">
            12
          </h2>
        </div>


        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <FileText className="text-blue-600" />

          <p className="text-sm text-slate-500 mt-4">
            Total reports
          </p>

          <h2 className="text-3xl font-bold mt-2">
            18
          </h2>
        </div>


        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <TrendingUp className="text-green-600" />

          <p className="text-sm text-slate-500 mt-4">
            Health score
          </p>

          <h2 className="text-3xl font-bold mt-2">
            84%
          </h2>
        </div>


        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <Upload className="text-orange-500" />

          <p className="text-sm text-slate-500 mt-4">
            Pending reports
          </p>

          <h2 className="text-3xl font-bold mt-2">
            2
          </h2>
        </div>

      </div>


      {/* Upload Report */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border mt-8">

        <h2 className="text-2xl font-bold text-slate-800">
          Analyze a new lab report
        </h2>

        <p className="text-slate-500 mt-2">
          Upload your laboratory report and let AI analyze
          your results.
        </p>

        <Link
          to="/upload"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700"
        >
          <Upload size={18} />
          Upload Report
        </Link>

      </div>

    </DashboardLayout>
  );
}