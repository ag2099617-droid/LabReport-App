import { useEffect, useState } from "react";
import {
  ChevronDown,
  GitCompare,
  AlertTriangle,
  CheckCircle,
  Activity,
  FileText,
} from "lucide-react";

import DashboardLayout from "../Layouts/DashboardLayout";

export default function Compare() {
  // ======================================================
  // STATES
  // ======================================================

  const [reports, setReports] = useState([]);

  const [earlierReport, setEarlierReport] = useState("");

  const [laterReport, setLaterReport] = useState("");

  const [comparison, setComparison] = useState(null);

  // ======================================================
  // LOAD REPORT HISTORY
  // ======================================================

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    try {
      const savedHistory = localStorage.getItem(
        "labReportHistory"
      );

      if (!savedHistory) {
        setReports([]);
        return;
      }

      const parsedHistory = JSON.parse(savedHistory);

      if (Array.isArray(parsedHistory)) {
        setReports(parsedHistory);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.error(
        "Error loading report history:",
        error
      );

      setReports([]);
    }
  };

  // ======================================================
  // GET SELECTED REPORT OBJECT
  // ======================================================

  const getReport = (id) => {
    return reports.find(
      (report) => String(report.id) === String(id)
    );
  };

  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date unavailable";
    }

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  // ======================================================
  // GET ANALYSIS TEXT
  // ======================================================

  const getAnalysisText = (report) => {
    if (!report) {
      return "";
    }

    return (
      report.analysis ||
      report.summary ||
      ""
    );
  };

  // ======================================================
  // GET HEALTH SCORE
  // ======================================================

  const getHealthScore = (report) => {
    if (
      report?.healthScore !== null &&
      report?.healthScore !== undefined
    ) {
      return Number(report.healthScore);
    }

    return null;
  };

  // ======================================================
  // GET ABNORMAL VALUES
  // ======================================================

  const getAbnormalValues = (report) => {
    if (
      report?.abnormalValues !== null &&
      report?.abnormalValues !== undefined
    ) {
      return Number(report.abnormalValues);
    }

    return null;
  };

  // ======================================================
  // COMPARE REPORTS
  // ======================================================

  const handleCompare = () => {
    if (!earlierReport || !laterReport) {
      alert("Please select both reports.");
      return;
    }

    if (earlierReport === laterReport) {
      alert("Please select two different reports.");
      return;
    }

    const earlier = getReport(earlierReport);

    const later = getReport(laterReport);

    if (!earlier || !later) {
      alert(
        "Unable to find the selected reports."
      );
      return;
    }

    // Get scores
    const earlierScore =
      getHealthScore(earlier);

    const laterScore =
      getHealthScore(later);

    // Get abnormal values
    const earlierAbnormal =
      getAbnormalValues(earlier);

    const laterAbnormal =
      getAbnormalValues(later);

    // Calculate score difference
    let scoreDifference = null;

    if (
      earlierScore !== null &&
      laterScore !== null
    ) {
      scoreDifference =
        laterScore - earlierScore;
    }

    // Calculate abnormal difference
    let abnormalDifference = null;

    if (
      earlierAbnormal !== null &&
      laterAbnormal !== null
    ) {
      abnormalDifference =
        laterAbnormal -
        earlierAbnormal;
    }

    setComparison({
      earlier,
      later,
      earlierScore,
      laterScore,
      earlierAbnormal,
      laterAbnormal,
      scoreDifference,
      abnormalDifference,
    });
  };

  // ======================================================
  // REFRESH HISTORY
  // ======================================================

  const handleRefresh = () => {
    loadReports();

    setEarlierReport("");

    setLaterReport("");

    setComparison(null);
  };

  // ======================================================
  // NO REPORTS
  // ======================================================

  if (reports.length === 0) {
    return (
      <DashboardLayout>

        <div className="mb-8">

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Compare reports
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Track what changed between two reports
          </p>

        </div>

        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-10
            shadow-sm
            text-center
          "
        >

          <FileText
            size={55}
            className="mx-auto text-slate-300"
          />

          <h2 className="text-xl font-bold text-slate-800 mt-5">
            No reports available
          </h2>

          <p className="text-slate-500 mt-2">
            Upload and analyze at least two reports
            before comparing them.
          </p>

          <button
            type="button"
            onClick={handleRefresh}
            className="
              mt-5
              px-5
              py-3
              rounded-xl
              bg-teal-500
              text-white
              font-semibold
              hover:bg-teal-600
              transition
            "
          >
            Refresh Reports
          </button>

        </div>

      </DashboardLayout>
    );
  }

  // ======================================================
  // MAIN UI
  // ======================================================

  return (
    <DashboardLayout>

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Compare reports
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Track what changed between two reports
          </p>

        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="
            px-4
            py-2
            rounded-xl
            border
            border-slate-200
            bg-white
            text-sm
            font-semibold
            text-slate-600
            hover:border-teal-400
            hover:text-teal-600
            transition
          "
        >
          Refresh
        </button>

      </div>


      {/* ==================================================
          REPORT SELECTORS
      ================================================== */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-5
          md:p-6
          shadow-sm
        "
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* ==================================================
              EARLIER REPORT
          ================================================== */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Earlier report
            </label>

            <div className="relative">

              <select
                value={earlierReport}
                onChange={(e) => {
                  setEarlierReport(
                    e.target.value
                  );

                  setComparison(null);
                }}
                className="
                  appearance-none
                  w-full
                  h-12
                  px-4
                  pr-11
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  outline-none
                  shadow-sm
                  transition
                  focus:border-teal-500
                  focus:ring-2
                  focus:ring-teal-100
                "
              >

                <option value="">
                  Select a report
                </option>

                {reports.map((report, index) => (

                  <option
                    key={
                      report.id ||
                      `${report.fileName}-${index}`
                    }
                    value={report.id}
                  >
                    {report.fileName ||
                      "Laboratory Report"}
                    {" — "}
                    {formatDate(
                      report.createdAt
                    )}
                  </option>

                ))}

              </select>

              <ChevronDown
                size={18}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  pointer-events-none
                  text-slate-400
                "
              />

            </div>

          </div>


          {/* ==================================================
              LATER REPORT
          ================================================== */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Later report
            </label>

            <div className="relative">

              <select
                value={laterReport}
                onChange={(e) => {
                  setLaterReport(
                    e.target.value
                  );

                  setComparison(null);
                }}
                className="
                  appearance-none
                  w-full
                  h-12
                  px-4
                  pr-11
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  outline-none
                  shadow-sm
                  transition
                  focus:border-teal-500
                  focus:ring-2
                  focus:ring-teal-100
                "
              >

                <option value="">
                  Select a report
                </option>

                {reports.map((report, index) => (

                  <option
                    key={
                      report.id ||
                      `${report.fileName}-${index}`
                    }
                    value={report.id}
                  >
                    {report.fileName ||
                      "Laboratory Report"}
                    {" — "}
                    {formatDate(
                      report.createdAt
                    )}
                  </option>

                ))}

              </select>

              <ChevronDown
                size={18}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  pointer-events-none
                  text-slate-400
                "
              />

            </div>

          </div>

        </div>

      </div>


      {/* ==================================================
          COMPARE BUTTON
      ================================================== */}

      <button
        type="button"
        onClick={handleCompare}
        disabled={
          !earlierReport ||
          !laterReport ||
          earlierReport === laterReport
        }
        className="
          mt-5
          px-6
          h-12
          rounded-xl
          bg-teal-600
          text-white
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          hover:bg-teal-700
          shadow-sm
          transition
          disabled:bg-slate-200
          disabled:text-slate-400
          disabled:cursor-not-allowed
        "
      >

        <GitCompare size={18} />

        Compare

      </button>


      {/* ==================================================
          COMPARISON RESULT
      ================================================== */}

      {comparison && (

        <div className="mt-8 space-y-6">

          {/* ==================================================
              RESULT HEADER
          ================================================== */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-6
              shadow-sm
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-teal-50
                  text-teal-600
                  flex
                  items-center
                  justify-center
                "
              >

                <GitCompare size={24} />

              </div>

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Report Comparison
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Comparison between the selected reports
                </p>

              </div>

            </div>

          </div>


          {/* ==================================================
              REPORT NAMES
          ================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Earlier */}

            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-6
                shadow-sm
              "
            >

              <p className="text-xs uppercase text-slate-400 font-semibold">
                Earlier Report
              </p>

              <h3 className="font-bold text-slate-800 mt-2 break-all">
                {comparison.earlier.fileName ||
                  "Laboratory Report"}
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                {formatDate(
                  comparison.earlier.createdAt
                )}
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Language:{" "}
                {comparison.earlier.language ||
                  "English"}
              </p>

            </div>


            {/* Later */}

            <div
              className="
                bg-white
                border
                border-teal-200
                rounded-3xl
                p-6
                shadow-sm
              "
            >

              <p className="text-xs uppercase text-teal-500 font-semibold">
                Later Report
              </p>

              <h3 className="font-bold text-slate-800 mt-2 break-all">
                {comparison.later.fileName ||
                  "Laboratory Report"}
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                {formatDate(
                  comparison.later.createdAt
                )}
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Language:{" "}
                {comparison.later.language ||
                  "English"}
              </p>

            </div>

          </div>


          {/* ==================================================
              HEALTH SCORE COMPARISON
          ================================================== */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-6
              shadow-sm
            "
          >

            <div className="flex items-center gap-3 mb-5">

              <Activity
                size={22}
                className="text-teal-500"
              />

              <h2 className="text-xl font-bold text-slate-800">
                Health Score
              </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Earlier score */}

              <div className="p-5 rounded-2xl bg-slate-50">

                <p className="text-sm text-slate-500">
                  Earlier
                </p>

                <p className="text-4xl font-bold text-slate-700 mt-2">
                  {comparison.earlierScore ??
                    "N/A"}
                </p>

                {comparison.earlierScore !==
                  null && (
                  <p className="text-xs text-slate-400 mt-1">
                    /100
                  </p>
                )}

              </div>


              {/* Later score */}

              <div className="p-5 rounded-2xl bg-teal-50">

                <p className="text-sm text-teal-700">
                  Later
                </p>

                <p className="text-4xl font-bold text-teal-600 mt-2">
                  {comparison.laterScore ??
                    "N/A"}
                </p>

                {comparison.laterScore !==
                  null && (
                  <p className="text-xs text-teal-500 mt-1">
                    /100
                  </p>
                )}

              </div>


              {/* Difference */}

              <div className="p-5 rounded-2xl bg-blue-50">

                <p className="text-sm text-blue-700">
                  Change
                </p>

                <p
                  className={`text-4xl font-bold mt-2 ${
                    comparison.scoreDifference >
                    0
                      ? "text-green-600"
                      : comparison.scoreDifference <
                        0
                      ? "text-red-600"
                      : "text-slate-600"
                  }`}
                >

                  {comparison.scoreDifference !==
                  null
                    ? comparison.scoreDifference >
                      0
                      ? `+${comparison.scoreDifference}`
                      : comparison.scoreDifference
                    : "N/A"}

                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Compared with earlier report
                </p>

              </div>

            </div>

          </div>


          {/* ==================================================
              ABNORMAL VALUES COMPARISON
          ================================================== */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-6
              shadow-sm
            "
          >

            <div className="flex items-center gap-3 mb-5">

              <AlertTriangle
                size={22}
                className="text-orange-500"
              />

              <h2 className="text-xl font-bold text-slate-800">
                Abnormal Values
              </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Earlier */}

              <div className="p-5 rounded-2xl bg-slate-50">

                <p className="text-sm text-slate-500">
                  Earlier
                </p>

                <p className="text-4xl font-bold text-slate-700 mt-2">
                  {comparison.earlierAbnormal ??
                    "N/A"}
                </p>

              </div>


              {/* Later */}

              <div className="p-5 rounded-2xl bg-orange-50">

                <p className="text-sm text-orange-700">
                  Later
                </p>

                <p className="text-4xl font-bold text-orange-600 mt-2">
                  {comparison.laterAbnormal ??
                    "N/A"}
                </p>

              </div>


              {/* Difference */}

              <div className="p-5 rounded-2xl bg-blue-50">

                <p className="text-sm text-blue-700">
                  Change
                </p>

                <p
                  className={`text-4xl font-bold mt-2 ${
                    comparison.abnormalDifference <
                    0
                      ? "text-green-600"
                      : comparison.abnormalDifference >
                        0
                      ? "text-red-600"
                      : "text-slate-600"
                  }`}
                >

                  {comparison.abnormalDifference !==
                  null
                    ? comparison.abnormalDifference >
                      0
                      ? `+${comparison.abnormalDifference}`
                      : comparison.abnormalDifference
                    : "N/A"}

                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Lower is generally better
                </p>

              </div>

            </div>

          </div>


          {/* ==================================================
              AI ANALYSIS COMPARISON
          ================================================== */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-6
              shadow-sm
            "
          >

            <h2 className="text-xl font-bold text-slate-800">
              AI Analysis Comparison
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

              {/* Earlier */}

              <div className="bg-slate-50 rounded-2xl p-5">

                <p className="text-xs font-semibold text-slate-400 uppercase mb-3">
                  Earlier Report
                </p>

                <pre
                  className="
                    whitespace-pre-wrap
                    text-sm
                    text-slate-600
                    font-sans
                    leading-6
                  "
                >
                  {getAnalysisText(
                    comparison.earlier
                  ) ||
                    "No AI analysis available."}
                </pre>

              </div>


              {/* Later */}

              <div className="bg-teal-50 rounded-2xl p-5">

                <p className="text-xs font-semibold text-teal-600 uppercase mb-3">
                  Later Report
                </p>

                <pre
                  className="
                    whitespace-pre-wrap
                    text-sm
                    text-slate-700
                    font-sans
                    leading-6
                  "
                >
                  {getAnalysisText(
                    comparison.later
                  ) ||
                    "No AI analysis available."}
                </pre>

              </div>

            </div>

          </div>


          {/* ==================================================
              RECOMMENDATIONS
          ================================================== */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-6
              shadow-sm
            "
          >

            <h2 className="text-xl font-bold text-slate-800">
              Recommendations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

              {/* Earlier Recommendations */}

              <div className="bg-slate-50 rounded-2xl p-5">

                <p className="text-xs font-semibold text-slate-400 uppercase mb-3">
                  Earlier Report
                </p>

                {Array.isArray(
                  comparison.earlier
                    .recommendations
                ) &&
                comparison.earlier
                  .recommendations
                  .length > 0 ? (

                  <ul className="space-y-3">

                    {comparison.earlier.recommendations.map(
                      (item, index) => (

                        <li
                          key={index}
                          className="flex gap-2 text-sm text-slate-600"
                        >

                          <CheckCircle
                            size={17}
                            className="text-slate-400 mt-0.5 flex-shrink-0"
                          />

                          <span>
                            {item}
                          </span>

                        </li>

                      )
                    )}

                  </ul>

                ) : (

                  <p className="text-sm text-slate-400">
                    No recommendations available.
                  </p>

                )}

              </div>


              {/* Later Recommendations */}

              <div className="bg-teal-50 rounded-2xl p-5">

                <p className="text-xs font-semibold text-teal-600 uppercase mb-3">
                  Later Report
                </p>

                {Array.isArray(
                  comparison.later
                    .recommendations
                ) &&
                comparison.later
                  .recommendations
                  .length > 0 ? (

                  <ul className="space-y-3">

                    {comparison.later.recommendations.map(
                      (item, index) => (

                        <li
                          key={index}
                          className="flex gap-2 text-sm text-slate-700"
                        >

                          <CheckCircle
                            size={17}
                            className="text-teal-600 mt-0.5 flex-shrink-0"
                          />

                          <span>
                            {item}
                          </span>

                        </li>

                      )
                    )}

                  </ul>

                ) : (

                  <p className="text-sm text-slate-400">
                    No recommendations available.
                  </p>

                )}

              </div>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}