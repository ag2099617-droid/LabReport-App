import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  ChevronDown,
  Trash2,
  Minus,
  UploadCloud,
  FileText,
  Eye,
} from "lucide-react";

import DashboardLayout from "../Layouts/DashboardLayout";

export default function History() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All risk levels");

  const [reports, setReports] = useState([]);

  // =====================================================
  // LOAD REPORT HISTORY
  // =====================================================

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const savedHistory = JSON.parse(
        localStorage.getItem("labReportHistory") || "[]"
      );

      if (Array.isArray(savedHistory)) {
        setReports(savedHistory);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.error("Error loading report history:", error);
      setReports([]);
    }
  };

  // =====================================================
  // DELETE REPORT
  // =====================================================

  const deleteReport = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedReports = reports.filter(
      (report) => report.id !== id
    );

    setReports(updatedReports);

    localStorage.setItem(
      "labReportHistory",
      JSON.stringify(updatedReports)
    );
  };

  // =====================================================
  // OPEN REPORT
  // =====================================================

  const openReport = (report) => {
    console.log("Opening report:", report);

    // Save selected report as current analysis
    localStorage.setItem(
      "labReportAnalysis",
      JSON.stringify(report)
    );

    // Navigate to analysis page
    navigate("/analysis", {
      state: {
        result: report,
        language: report.language || "English",
        fileName: report.fileName || report.title || "",
      },
    });
  };

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredReports = reports.filter((report) => {
    const title =
      report.fileName ||
      report.title ||
      "Lab Report";

    const matchesSearch = title
      .toLowerCase()
      .includes(search.toLowerCase());

    let risk = report.risk || "Unknown risk";

    const matchesRisk =
      riskFilter === "All risk levels" ||
      risk === riskFilter;

    return matchesSearch && matchesRisk;
  });

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    try {
      return new Date(date).toLocaleString();
    } catch {
      return date;
    }
  };

  // =====================================================
  // GET REPORT SCORE
  // =====================================================

  const getScore = (report) => {
    if (
      report.healthScore !== null &&
      report.healthScore !== undefined
    ) {
      return report.healthScore;
    }

    if (
      report.score !== null &&
      report.score !== undefined
    ) {
      return report.score;
    }

    return null;
  };

  // =====================================================
  // GET ABNORMAL COUNT
  // =====================================================

  const getAbnormalCount = (report) => {
    // If backend already sends number
    if (typeof report.abnormalValues === "number") {
      return report.abnormalValues;
    }

    // If backend sends array
    if (Array.isArray(report.abnormalValues)) {
      return report.abnormalValues.length;
    }

    // If backend sends object
    if (
      report.abnormalValues &&
      typeof report.abnormalValues === "object"
    ) {
      return Object.keys(report.abnormalValues).length;
    }

    // Old abnormal field
    if (typeof report.abnormal === "number") {
      return report.abnormal;
    }

    return 0;
  };

  // =====================================================
  // GET RISK
  // =====================================================

  const getRisk = (report) => {
    if (report.risk) {
      return report.risk;
    }

    const score = getScore(report);

    if (score === null) {
      return "Unknown risk";
    }

    if (score >= 80) {
      return "Low risk";
    }

    if (score >= 60) {
      return "Medium risk";
    }

    return "High risk";
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <DashboardLayout>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Report history
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            All of your analysed lab reports
          </p>

        </div>

        <button
          type="button"
          onClick={() => navigate("/upload")}
          className="
            flex
            items-center
            justify-center
            gap-2
            px-5
            py-3
            rounded-xl
            bg-teal-600
            text-white
            font-semibold
            shadow-sm
            hover:bg-teal-700
            transition
          "
        >
          <UploadCloud size={18} />

          Upload
        </button>

      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="flex flex-col md:flex-row gap-3 mb-5">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={19}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by title or file name"
            className="
              w-full
              h-12
              pl-11
              pr-4
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-sm
              outline-none
              text-slate-700
              placeholder:text-slate-400
              focus:border-teal-500
              focus:ring-2
              focus:ring-teal-100
            "
          />

        </div>

        {/* Risk filter */}

        <div className="relative">

          <select
            value={riskFilter}
            onChange={(e) =>
              setRiskFilter(e.target.value)
            }
            className="
              appearance-none
              w-full
              md:w-48
              h-12
              px-4
              pr-10
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-sm
              text-slate-700
              outline-none
              focus:border-teal-500
              focus:ring-2
              focus:ring-teal-100
            "
          >

            <option>
              All risk levels
            </option>

            <option>
              Low risk
            </option>

            <option>
              Medium risk
            </option>

            <option>
              High risk
            </option>

            <option>
              Unknown risk
            </option>

          </select>

          <ChevronDown
            size={18}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              pointer-events-none
              text-slate-500
            "
          />

        </div>

      </div>

      {/* =================================================
          REPORT LIST
      ================================================= */}

      <div className="space-y-4">

        {filteredReports.length === 0 ? (

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              p-12
              text-center
            "
          >

            <FileText
              size={45}
              className="mx-auto text-slate-300 mb-4"
            />

            <h3 className="text-lg font-semibold text-slate-700">
              No reports found
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Upload and analyse a report to see it here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/upload")}
              className="
                mt-5
                px-5
                py-3
                rounded-xl
                bg-teal-600
                text-white
                font-semibold
                hover:bg-teal-700
              "
            >
              Upload Report
            </button>

          </div>

        ) : (

          filteredReports.map((report) => {

            const fileName =
              report.fileName ||
              report.title ||
              "Lab Report";

            const score = getScore(report);

            const abnormal =
              getAbnormalCount(report);

            const risk = getRisk(report);

            return (

              <div
                key={report.id}
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  px-5
                  md:px-6
                  py-5
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >

                <div className="flex flex-col md:flex-row md:items-center gap-4">

                  {/* =====================================
                      REPORT INFO
                  ===================================== */}

                  <div className="flex-1 min-w-0">

                    <div className="flex items-start gap-3">

                      <div
                        className="
                          w-11
                          h-11
                          rounded-xl
                          bg-teal-50
                          text-teal-600
                          flex
                          items-center
                          justify-center
                          flex-shrink-0
                        "
                      >
                        <FileText size={21} />
                      </div>

                      <div className="min-w-0">

                        <h2
                          className="
                            text-base
                            md:text-lg
                            font-semibold
                            text-slate-800
                            break-all
                          "
                        >
                          {fileName}
                        </h2>

                        <p className="text-xs md:text-sm text-slate-500 mt-1">

                          {formatDate(
                            report.createdAt
                          )}

                          {" · "}

                          {abnormal}

                          {" abnormal"}

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* =====================================
                      STATUS
                  ===================================== */}

                  <div className="flex items-center gap-2 flex-wrap">

                    {/* Status */}

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        border

                        ${
                          report.status === "failed"

                            ? "bg-red-50 text-red-500 border-red-200"

                            : "bg-emerald-50 text-emerald-600 border-emerald-200"
                        }
                      `}
                    >
                      {report.status === "failed"
                        ? "failed"
                        : "completed"}
                    </span>

                    {/* Risk */}

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        border

                        ${
                          risk === "Low risk"

                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"

                            : risk === "Medium risk"

                            ? "bg-yellow-50 text-yellow-600 border-yellow-200"

                            : risk === "High risk"

                            ? "bg-red-50 text-red-600 border-red-200"

                            : "bg-slate-50 text-slate-500 border-slate-200"
                        }
                      `}
                    >
                      {risk}
                    </span>

                    {/* Score */}

                    {score !== null ? (

                      <span
                        className="
                          text-lg
                          font-semibold
                          text-slate-800
                          min-w-[35px]
                          text-center
                        "
                      >
                        {score}
                      </span>

                    ) : (

                      <Minus
                        size={22}
                        className="text-slate-700 mx-2"
                      />

                    )}

                    {/* =================================
                        OPEN BUTTON
                    ================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        openReport(report)
                      }
                      className="
                        w-9
                        h-9
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-teal-600
                        hover:bg-teal-50
                        transition
                      "
                      title="Open report"
                    >
                      <Eye size={18} />
                    </button>

                    {/* =================================
                        DELETE
                    ================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        deleteReport(report.id)
                      }
                      className="
                        w-9
                        h-9
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-red-500
                        hover:bg-red-50
                        transition
                      "
                      title="Delete report"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>

            );
          })

        )}

      </div>

    </DashboardLayout>
  );
}