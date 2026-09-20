import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div>
              <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                AI Lab Report Analyzer
              </h1>

              <p className="mt-6 text-lg text-gray-600">
                Upload your medical reports and get AI-powered health insights,
                disease prediction, abnormal value detection, and personalized
                recommendations instantly.
              </p>

              <div className="mt-8 flex gap-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
                  Upload Report
                </button>

                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50">
                  Learn More
                </button>
              </div>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                alt="Healthcare"
                className="rounded-3xl shadow-xl"
              />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}