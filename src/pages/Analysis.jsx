import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Activity,
  ArrowLeft,
} from "lucide-react";

import DashboardLayout from "../Layouts/DashboardLayout";

export default function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();

  const [analysisData, setAnalysisData] = useState(null);

  // ======================================================
  // LOAD ANALYSIS RESULT
  // ======================================================

  useEffect(() => {
    // First priority:
    // Result sent from Upload.jsx using navigate()
    if (location.state?.result) {
      console.log("Analysis result from Upload.jsx:");
      console.log(location.state.result);

      setAnalysisData(location.state.result);

      // Also save it for refresh
      localStorage.setItem(
        "labReportAnalysis",
        JSON.stringify(location.state.result)
      );

      return;
    }

    // Second priority:
    // Load saved result if page is refreshed
    const savedResult = localStorage.getItem(
      "labReportAnalysis"
    );

    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);

        console.log("Analysis result from localStorage:");
        console.log(parsedResult);

        setAnalysisData(parsedResult);
      } catch (error) {
        console.error(
          "Unable to read saved analysis:",
          error
        );
      }
    }
  }, [location.state]);

  // ======================================================
  // NO RESULT
  // ======================================================

  if (!analysisData) {
    return (
      <DashboardLayout>
        <div className="min-h-[500px] flex flex-col items-center justify-center text-center">
          <FileText
            size={60}
            className="text-slate-300 mb-5"
          />

          <h1 className="text-2xl font-bold text-slate-800">
            No Analysis Available
          </h1>

          <p className="text-slate-500 mt-2">
            Please upload and analyze a laboratory report first.
          </p>

          <button
            onClick={() => navigate("/upload")}
            className="
              mt-6
              px-6
              py-3
              rounded-xl
              bg-teal-500
              text-white
              font-semibold
              hover:bg-teal-600
              transition
            "
          >
            Upload Report
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // ======================================================
  // GET DATA
  // ======================================================

  const {
    fileName = "Laboratory Report",
    language = "English",
    healthScore,
    abnormalValues,
    summary,
    recommendations,
    analysis,
    extractedText,
    status,
  } = analysisData;

  // ======================================================
  // SAFE VALUES
  // ======================================================

  const displayHealthScore =
    healthScore !== null &&
    healthScore !== undefined
      ? healthScore
      : "N/A";

  const displayAbnormalValues =
    abnormalValues !== null &&
    abnormalValues !== undefined
      ? abnormalValues
      : "N/A";

  const displayRecommendations =
    Array.isArray(recommendations)
      ? recommendations
      : [];

  const displayAnalysis =
    analysis || summary || "No AI analysis available.";

  const displayExtractedText =
    extractedText || "No extracted report text available.";

  // ======================================================
  // UI
  // ======================================================

  return (
    <DashboardLayout>

      {/* ==================================================
          BACK BUTTON
      ================================================== */}

      <button
        onClick={() => navigate("/upload")}
        className="
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-slate-600
          hover:text-teal-600
          mb-6
          transition
        "
      >
        <ArrowLeft size={18} />

        Analyze another report
      </button>


      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-8">

        <p className="text-sm text-teal-600 font-medium">
          AI Lab Report Analyzer
        </p>

        <h1 className="text-3xl font-bold text-slate-800 mt-1">
          Report Analysis
        </h1>

        <p className="text-slate-500 mt-2">
          Your laboratory report has been analyzed.
        </p>

      </div>


      {/* ==================================================
          REPORT INFORMATION
      ================================================== */}

      <div
        className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-5
          mb-6
        "
      >

        <div className="flex items-center gap-4">

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
            <FileText size={25} />
          </div>

          <div className="min-w-0">

            <p className="text-xs text-slate-400 uppercase">
              Report
            </p>

            <h2 className="font-semibold text-slate-800 break-all">
              {fileName}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Language: {language}
            </p>

          </div>

        </div>

      </div>


      {/* ==================================================
          HEALTH SCORE / ABNORMAL / STATUS
      ================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* Health Score */}

        <div className="bg-white rounded-3xl p-6 border shadow-sm">

          <div className="flex items-center justify-between">

            <p className="text-sm text-slate-500">
              Health Score
            </p>

            <Activity
              size={22}
              className="text-teal-500"
            />

          </div>

          <div className="flex items-end gap-2 mt-3">

            <span className="text-5xl font-bold text-teal-600">
              {displayHealthScore}
            </span>

            {displayHealthScore !== "N/A" && (
              <span className="text-slate-400 mb-2">
                /100
              </span>
            )}

          </div>

          <p className="text-sm text-green-600 mt-2">
            AI analysis score
          </p>

        </div>


        {/* Abnormal Values */}

        <div className="bg-white rounded-3xl p-6 border shadow-sm">

          <div className="flex items-center justify-between">

            <p className="text-sm text-slate-500">
              Abnormal Values
            </p>

            <AlertTriangle
              size={22}
              className="text-orange-500"
            />

          </div>

          <p className="text-5xl font-bold text-orange-500 mt-3">
            {displayAbnormalValues}
          </p>

          <p className="text-sm text-slate-500 mt-2">
            Values requiring attention
          </p>

        </div>


        {/* Status */}

        <div className="bg-white rounded-3xl p-6 border shadow-sm">

          <div className="flex items-center justify-between">

            <p className="text-sm text-slate-500">
              Report Status
            </p>

            <CheckCircle
              size={22}
              className="text-teal-500"
            />

          </div>

          <p className="text-xl font-bold text-teal-600 mt-4">
            {status || "Analysis Complete"}
          </p>

          <p className="text-sm text-slate-500 mt-2">
            AI processing finished
          </p>

        </div>

      </div>


      {/* ==================================================
          SUMMARY
      ================================================== */}

      <div
        className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-6
          mb-6
        "
      >

        <h2 className="text-xl font-bold text-slate-800">
          AI Summary
        </h2>

        <div
          className="
            mt-5
            p-5
            rounded-2xl
            bg-teal-50
            border
            border-teal-100
          "
        >

          <p className="text-slate-700 leading-7 whitespace-pre-wrap">
            {summary || displayAnalysis}
          </p>

        </div>

      </div>


      {/* ==================================================
          AI ANALYSIS
      ================================================== */}

      <div
        className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-6
          mb-6
        "
      >

        <h2 className="text-xl font-bold text-slate-800">
          AI Analysis
        </h2>

        <div
          className="
            mt-5
            bg-slate-50
            rounded-2xl
            p-5
            max-h-[500px]
            overflow-auto
          "
        >

          <pre
            className="
              whitespace-pre-wrap
              text-sm
              text-slate-700
              font-sans
              leading-7
            "
          >
            {displayAnalysis}
          </pre>

        </div>

      </div>


      {/* ==================================================
          RECOMMENDATIONS
      ================================================== */}

      <div
        className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-6
          mb-6
        "
      >

        <h2 className="text-xl font-bold text-slate-800">
          AI Recommendations
        </h2>

        {displayRecommendations.length > 0 ? (

          <div className="mt-5 space-y-3">

            {displayRecommendations.map(
              (recommendation, index) => (

                <div
                  key={index}
                  className="
                    p-4
                    rounded-2xl
                    bg-teal-50
                    border
                    border-teal-100
                  "
                >

                  <div className="flex gap-3">

                    <CheckCircle
                      size={20}
                      className="
                        text-teal-600
                        mt-0.5
                        flex-shrink-0
                      "
                    />

                    <p className="text-sm text-slate-700">
                      {recommendation}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        ) : (

          <p className="text-slate-500 mt-5">
            No recommendations were returned by the AI.
          </p>

        )}

      </div>


      {/* ==================================================
          EXTRACTED REPORT TEXT
      ================================================== */}

      <div
        className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          p-6
        "
      >

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Extracted Report Text
        </h2>

        <div
          className="
            bg-slate-50
            rounded-2xl
            p-5
            max-h-96
            overflow-auto
          "
        >

          <pre
            className="
              whitespace-pre-wrap
              text-sm
              text-slate-600
              font-sans
              leading-6
            "
          >
            {displayExtractedText}
          </pre>

        </div>

      </div>

    </DashboardLayout>
  );
}