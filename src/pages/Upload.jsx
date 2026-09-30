import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  X,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

import DashboardLayout from "../Layouts/DashboardLayout";

// ======================================================
// TRANSLATIONS
// ======================================================

const translations = {
  English: {
    uploadReport: "Upload report",
    supportedFiles: "PDF, JPG, JPEG or PNG · up to 20MB",
    dropReport: "Drag and drop your lab report",
    dropReportHere: "Drop your report here",
    chooseFileText:
      "or choose a file from your device — PDF, JPG, JPEG, PNG",
    chooseFile: "Choose file",
    explainResults: "Explain results in",
    analyzeReport: "Analyze report",
    analyzingReport: "Analyzing report...",
    fileUploaded: "File uploaded successfully",
    supportedFormats:
      "Supported formats: PDF, JPG, JPEG and PNG · Maximum size: 20MB",
    uploadFirst: "Please upload a lab report first.",
    invalidFile:
      "Please upload only PDF, JPG, JPEG, or PNG files.",
    fileTooLarge:
      "File size must be less than 20MB.",
    analysisSuccess:
      "Report analyzed successfully!",
    analysisError:
      "Something went wrong while analyzing the report.",
    serverError:
      "Unable to connect to the AI server. Please make sure your backend is running.",
  },

  Hindi: {
    uploadReport: "रिपोर्ट अपलोड करें",
    supportedFiles: "PDF, JPG, JPEG या PNG · अधिकतम 20MB",
    dropReport: "अपनी लैब रिपोर्ट यहां ड्रैग और ड्रॉप करें",
    dropReportHere: "अपनी रिपोर्ट यहां छोड़ें",
    chooseFileText:
      "या अपने डिवाइस से फ़ाइल चुनें — PDF, JPG, JPEG, PNG",
    chooseFile: "फ़ाइल चुनें",
    explainResults: "परिणाम किस भाषा में समझाएं",
    analyzeReport: "रिपोर्ट का विश्लेषण करें",
    analyzingReport: "रिपोर्ट का विश्लेषण हो रहा है...",
    fileUploaded: "फ़ाइल सफलतापूर्वक अपलोड हो गई",
    supportedFormats:
      "समर्थित प्रारूप: PDF, JPG, JPEG और PNG · अधिकतम आकार: 20MB",
    uploadFirst: "कृपया पहले लैब रिपोर्ट अपलोड करें।",
    invalidFile:
      "कृपया केवल PDF, JPG, JPEG या PNG फ़ाइल अपलोड करें।",
    fileTooLarge:
      "फ़ाइल का आकार 20MB से कम होना चाहिए।",
    analysisSuccess:
      "रिपोर्ट का सफलतापूर्वक विश्लेषण हो गया!",
    analysisError:
      "रिपोर्ट का विश्लेषण करते समय कुछ गलत हो गया।",
    serverError:
      "AI सर्वर से कनेक्ट नहीं हो पा रहा है। कृपया जांचें कि backend चल रहा है।",
  },

  Tamil: {
    uploadReport: "அறிக்கையை பதிவேற்றவும்",
    supportedFiles: "PDF, JPG, JPEG அல்லது PNG · அதிகபட்சம் 20MB",
    dropReport: "உங்கள் ஆய்வக அறிக்கையை இங்கே இழுத்து விடவும்",
    dropReportHere: "உங்கள் அறிக்கையை இங்கே விடவும்",
    chooseFileText:
      "அல்லது உங்கள் சாதனத்திலிருந்து கோப்பைத் தேர்ந்தெடுக்கவும் — PDF, JPG, JPEG, PNG",
    chooseFile: "கோப்பைத் தேர்ந்தெடுக்கவும்",
    explainResults: "முடிவுகளை எந்த மொழியில் விளக்க வேண்டும்",
    analyzeReport: "அறிக்கையை பகுப்பாய்வு செய்யவும்",
    analyzingReport: "அறிக்கை பகுப்பாய்வு செய்யப்படுகிறது...",
    fileUploaded: "கோப்பு வெற்றிகரமாக பதிவேற்றப்பட்டது",
    supportedFormats:
      "ஆதரிக்கப்படும் வடிவங்கள்: PDF, JPG, JPEG மற்றும் PNG · அதிகபட்சம் 20MB",
    uploadFirst: "முதலில் ஆய்வக அறிக்கையை பதிவேற்றவும்.",
    invalidFile:
      "PDF, JPG, JPEG அல்லது PNG கோப்புகளை மட்டும் பதிவேற்றவும்.",
    fileTooLarge:
      "கோப்பு அளவு 20MB-க்கு குறைவாக இருக்க வேண்டும்.",
    analysisSuccess:
      "அறிக்கை வெற்றிகரமாக பகுப்பாய்வு செய்யப்பட்டது!",
    analysisError:
      "அறிக்கையை பகுப்பாய்வு செய்யும்போது சிக்கல் ஏற்பட்டது.",
    serverError:
      "AI சேவையகத்துடன் இணைக்க முடியவில்லை. Backend இயங்குகிறதா என்பதை சரிபார்க்கவும்.",
  },

  Telugu: {
    uploadReport: "నివేదికను అప్‌లోడ్ చేయండి",
    supportedFiles: "PDF, JPG, JPEG లేదా PNG · గరిష్టంగా 20MB",
    dropReport: "మీ ల్యాబ్ నివేదికను ఇక్కడ డ్రాగ్ చేసి డ్రాప్ చేయండి",
    dropReportHere: "మీ నివేదికను ఇక్కడ డ్రాప్ చేయండి",
    chooseFileText:
      "లేదా మీ పరికరం నుండి ఫైల్‌ను ఎంచుకోండి — PDF, JPG, JPEG, PNG",
    chooseFile: "ఫైల్ ఎంచుకోండి",
    explainResults: "ఫలితాలను ఏ భాషలో వివరించాలి",
    analyzeReport: "నివేదికను విశ్లేషించండి",
    analyzingReport: "నివేదికను విశ్లేషిస్తోంది...",
    fileUploaded: "ఫైల్ విజయవంతంగా అప్‌లోడ్ చేయబడింది",
    supportedFormats:
      "మద్దతు ఉన్న ఫార్మాట్లు: PDF, JPG, JPEG మరియు PNG · గరిష్ట పరిమాణం: 20MB",
    uploadFirst: "దయచేసి ముందుగా ల్యాబ్ నివేదికను అప్‌లోడ్ చేయండి.",
    invalidFile:
      "PDF, JPG, JPEG లేదా PNG ఫైళ్లను మాత్రమే అప్‌లోడ్ చేయండి.",
    fileTooLarge:
      "ఫైల్ పరిమాణం 20MB కంటే తక్కువగా ఉండాలి.",
    analysisSuccess:
      "నివేదిక విజయవంతంగా విశ్లేషించబడింది!",
    analysisError:
      "నివేదికను విశ్లేషించేటప్పుడు సమస్య ఏర్పడింది.",
    serverError:
      "AI సర్వర్‌కు కనెక్ట్ కాలేకపోయాము. Backend నడుస్తుందో లేదో తనిఖీ చేయండి.",
  },

  Bengali: {
    uploadReport: "রিপোর্ট আপলোড করুন",
    supportedFiles: "PDF, JPG, JPEG বা PNG · সর্বোচ্চ 20MB",
    dropReport: "আপনার ল্যাব রিপোর্ট এখানে টেনে এনে ছেড়ে দিন",
    dropReportHere: "আপনার রিপোর্ট এখানে ছেড়ে দিন",
    chooseFileText:
      "অথবা আপনার ডিভাইস থেকে ফাইল নির্বাচন করুন — PDF, JPG, JPEG, PNG",
    chooseFile: "ফাইল নির্বাচন করুন",
    explainResults: "ফলাফল কোন ভাষায় ব্যাখ্যা করতে হবে",
    analyzeReport: "রিপোর্ট বিশ্লেষণ করুন",
    analyzingReport: "রিপোর্ট বিশ্লেষণ করা হচ্ছে...",
    fileUploaded: "ফাইল সফলভাবে আপলোড হয়েছে",
    supportedFormats:
      "সমর্থিত ফরম্যাট: PDF, JPG, JPEG এবং PNG · সর্বোচ্চ আকার: 20MB",
    uploadFirst:
      "অনুগ্রহ করে প্রথমে একটি ল্যাব রিপোর্ট আপলোড করুন।",
    invalidFile:
      "শুধুমাত্র PDF, JPG, JPEG অথবা PNG ফাইল আপলোড করুন।",
    fileTooLarge:
      "ফাইলের আকার 20MB-এর কম হতে হবে।",
    analysisSuccess:
      "রিপোর্ট সফলভাবে বিশ্লেষণ করা হয়েছে!",
    analysisError:
      "রিপোর্ট বিশ্লেষণ করার সময় সমস্যা হয়েছে।",
    serverError:
      "AI সার্ভারের সাথে সংযোগ করা যাচ্ছে না। Backend চালু আছে কিনা পরীক্ষা করুন।",
  },

  Marathi: {
    uploadReport: "अहवाल अपलोड करा",
    supportedFiles: "PDF, JPG, JPEG किंवा PNG · कमाल 20MB",
    dropReport: "तुमचा लॅब अहवाल येथे ड्रॅग आणि ड्रॉप करा",
    dropReportHere: "तुमचा अहवाल येथे ड्रॉप करा",
    chooseFileText:
      "किंवा तुमच्या डिव्हाइसवरून फाइल निवडा — PDF, JPG, JPEG, PNG",
    chooseFile: "फाइल निवडा",
    explainResults: "निकाल कोणत्या भाषेत समजावून सांगायचे",
    analyzeReport: "अहवालाचे विश्लेषण करा",
    analyzingReport: "अहवालाचे विश्लेषण होत आहे...",
    fileUploaded: "फाइल यशस्वीरित्या अपलोड झाली",
    supportedFormats:
      "समर्थित फॉरमॅट: PDF, JPG, JPEG आणि PNG · कमाल आकार: 20MB",
    uploadFirst:
      "कृपया प्रथम लॅब अहवाल अपलोड करा.",
    invalidFile:
      "कृपया फक्त PDF, JPG, JPEG किंवा PNG फाइल अपलोड करा.",
    fileTooLarge:
      "फाइलचा आकार 20MB पेक्षा कमी असावा.",
    analysisSuccess:
      "अहवालाचे यशस्वीरित्या विश्लेषण झाले!",
    analysisError:
      "अहवालाचे विश्लेषण करताना समस्या आली.",
    serverError:
      "AI सर्व्हरशी कनेक्ट करता आले नाही. Backend सुरू आहे का ते तपासा.",
  },
};

// ======================================================
// UPLOAD COMPONENT
// ======================================================

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const t = translations[language];

  // ======================================================
  // ALLOWED FILE TYPES
  // ======================================================

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  const MAX_SIZE = 20 * 1024 * 1024;

  // ======================================================
  // HANDLE FILE
  // ======================================================

  const handleFile = (file) => {
    if (!file) return;

    setError("");

    if (!allowedTypes.includes(file.type)) {
      setError(t.invalidFile);
      return;
    }

    if (file.size > MAX_SIZE) {
      setError(t.fileTooLarge);
      return;
    }

    setSelectedFile(file);
  };

  // ======================================================
  // FILE INPUT
  // ======================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  // ======================================================
  // DRAG EVENTS
  // ======================================================

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    handleFile(file);
  };

  // ======================================================
  // REMOVE FILE
  // ======================================================

  const removeFile = () => {
    setSelectedFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ======================================================
  // FORMAT FILE SIZE
  // ======================================================

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ======================================================
  // LANGUAGE CHANGE
  // ======================================================

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setError("");
  };

  // ======================================================
  // ANALYZE REPORT
  // ======================================================

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert(t.uploadFirst);
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      const formData = new FormData();

      // IMPORTANT:
      // This must match backend multer field name.
      // Backend should use upload.single("report")
      formData.append("report", selectedFile);

      // Send selected language
      formData.append("language", language);

      console.log("================================");
      console.log("SENDING REPORT");
      console.log("================================");
      console.log("File:", selectedFile.name);
      console.log("Type:", selectedFile.type);
      console.log("Size:", selectedFile.size);
      console.log("Language:", language);

      // ==================================================
      // BACKEND REQUEST
      // ==================================================

      const response = await axios.post(
        "/api/analyze",
        formData,
        {
          timeout: 120000,
        }
      );

      console.log("================================");
      console.log("BACKEND RESPONSE");
      console.log("================================");
      console.log(response.data);

      const result = response.data || {};

      // ==================================================
      // CREATE RESULT
      // ==================================================

      const analysisResult = {
        success: result.success ?? true,

        fileName: selectedFile.name,

        fileType: selectedFile.type,

        fileSize: selectedFile.size,

        language: language,

        status: "completed",

        extractedText:
          result.extractedText ||
          result.text ||
          "",

        analysis:
          result.analysis ||
          result.reportText ||
          result.result ||
          "",

        healthScore:
          result.healthScore ?? null,

        abnormalValues:
          result.abnormalValues ?? null,

        summary:
          result.summary || "",

        recommendations:
          Array.isArray(result.recommendations)
            ? result.recommendations
            : [],

        createdAt: new Date().toISOString(),
      };

      // ==================================================
      // SAVE CURRENT ANALYSIS
      // ==================================================

      localStorage.setItem(
        "labReportAnalysis",
        JSON.stringify(analysisResult)
      );

      // ==================================================
      // GET OLD HISTORY
      // ==================================================

      let oldHistory = [];

      try {
        const savedHistory =
          localStorage.getItem("labReportHistory");

        if (savedHistory) {
          oldHistory = JSON.parse(savedHistory);
        }

        if (!Array.isArray(oldHistory)) {
          oldHistory = [];
        }
      } catch (historyError) {
        console.error(
          "History read error:",
          historyError
        );

        oldHistory = [];
      }

      // ==================================================
      // CREATE HISTORY ITEM
      // ==================================================

      const historyItem = {
        id: Date.now(),

        fileName: selectedFile.name,

        fileType: selectedFile.type,

        fileSize: selectedFile.size,

        language: language,

        analysis:
          result.analysis ||
          result.reportText ||
          result.result ||
          "",

        extractedText:
          result.extractedText ||
          result.text ||
          "",

        healthScore:
          result.healthScore ?? null,

        abnormalValues:
          result.abnormalValues ?? null,

        summary:
          result.summary || "",

        recommendations:
          Array.isArray(result.recommendations)
            ? result.recommendations
            : [],

        createdAt: new Date().toISOString(),

        status: "completed",
      };

      // Newest report first
      const updatedHistory = [
        historyItem,
        ...oldHistory,
      ];

      localStorage.setItem(
        "labReportHistory",
        JSON.stringify(updatedHistory)
      );

      console.log("Report saved to history.");

      // ==================================================
      // REDIRECT TO ANALYSIS
      // ==================================================

      navigate("/analysis", {
        state: {
          result: analysisResult,
          language: language,
          fileName: selectedFile.name,
        },
      });

    } catch (error) {
      console.error("================================");
      console.error("ANALYSIS ERROR");
      console.error("================================");
      console.error(error);

      // Backend returned an error
      if (error.response) {
        console.error(
          "Backend status:",
          error.response.status
        );

        console.error(
          "Backend response:",
          error.response.data
        );

        setError(
          error.response.data?.message ||
          error.response.data?.error ||
          t.analysisError
        );
      }

      // No response from backend
      else if (error.request) {
        console.error(
          "No response received from backend."
        );

        setError(t.serverError);
      }

      // Other error
      else {
        console.error(
          "Request error:",
          error.message
        );

        setError(t.analysisError);
      }

    } finally {
      setIsAnalyzing(false);
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <DashboardLayout>

      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          {t.uploadReport}
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          {t.supportedFiles}
        </p>

      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">

          <AlertCircle
            size={20}
            className="mt-0.5 flex-shrink-0"
          />

          <p className="text-sm font-medium">
            {error}
          </p>

        </div>
      )}

      {/* UPLOAD AREA */}

      {!selectedFile ? (

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            bg-white
            border-2
            border-dashed
            rounded-3xl
            min-h-[330px]
            flex
            flex-col
            items-center
            justify-center
            text-center
            transition
            duration-200
            px-5

            ${
              isDragging
                ? "border-teal-500 bg-teal-50 scale-[1.01]"
                : "border-slate-200 hover:border-teal-400"
            }
          `}
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-teal-500
              flex
              items-center
              justify-center
              text-white
              shadow-sm
            "
          >
            <UploadCloud size={28} />
          </div>

          <h2
            className="
              text-lg
              md:text-xl
              font-semibold
              text-slate-800
              mt-5
            "
          >
            {isDragging
              ? t.dropReportHere
              : t.dropReport}
          </h2>

          <p className="text-sm text-slate-500 mt-2 px-4">
            {t.chooseFileText}
          </p>

          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={isAnalyzing}
            className="
              mt-5
              px-6
              py-3
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-sm
              text-slate-700
              font-semibold
              hover:bg-slate-50
              hover:border-teal-400
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {t.chooseFile}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />

        </div>

      ) : (

        /* SELECTED FILE */

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

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >

            <div className="flex items-center gap-4 min-w-0">

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-teal-50
                  text-teal-600
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >

                {selectedFile.type ===
                "application/pdf" ? (
                  <FileText size={28} />
                ) : (
                  <ImageIcon size={28} />
                )}

              </div>

              <div className="min-w-0">

                <h3
                  className="
                    font-semibold
                    text-slate-800
                    break-all
                  "
                >
                  {selectedFile.name}
                </h3>

                <p
                  className="
                    text-sm
                    text-slate-500
                    mt-1
                  "
                >
                  {formatFileSize(
                    selectedFile.size
                  )}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={isAnalyzing}
              className="
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                text-slate-500
                hover:bg-red-50
                hover:text-red-500
                transition
                flex-shrink-0
                disabled:opacity-50
              "
            >
              <X size={20} />
            </button>

          </div>

          <div
            className="
              flex
              items-center
              gap-2
              mt-5
              text-sm
              text-teal-600
            "
          >
            <CheckCircle size={18} />

            <span>
              {t.fileUploaded}
            </span>

          </div>

        </div>
      )}

      {/* LANGUAGE */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-5
          mt-5
          shadow-sm
        "
      >

        <label
          className="
            block
            text-sm
            font-semibold
            text-slate-700
            mb-2
          "
        >
          {t.explainResults}
        </label>

        <select
          value={language}
          onChange={handleLanguageChange}
          disabled={isAnalyzing}
          className="
            w-full
            md:w-64
            h-12
            px-4
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-700
            outline-none
            focus:ring-2
            focus:ring-teal-200
            focus:border-teal-500
            cursor-pointer
            disabled:opacity-60
          "
        >

          <option value="English">
            English
          </option>

          <option value="Hindi">
            हिंदी
          </option>

          <option value="Tamil">
            தமிழ்
          </option>

          <option value="Telugu">
            తెలుగు
          </option>

          <option value="Bengali">
            বাংলা
          </option>

          <option value="Marathi">
            मराठी
          </option>

        </select>

      </div>

      {/* ANALYZE BUTTON */}

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={!selectedFile || isAnalyzing}
        className={`
          w-full
          mt-5
          h-14
          rounded-2xl
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          transition

          ${
            selectedFile && !isAnalyzing
              ? "bg-teal-500 text-white hover:bg-teal-600 shadow-sm"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }
        `}
      >

        {isAnalyzing ? (

          <>
            <Loader2
              size={20}
              className="animate-spin"
            />

            {t.analyzingReport}
          </>

        ) : (

          <>
            <UploadCloud size={20} />

            {t.analyzeReport}
          </>

        )}

      </button>

      {/* FOOTER */}

      <p
        className="
          text-center
          text-xs
          text-slate-400
          mt-4
        "
      >
        {t.supportedFormats}
      </p>

    </DashboardLayout>
  );
}