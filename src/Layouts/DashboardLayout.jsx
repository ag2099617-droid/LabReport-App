import { useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#eefafa] dark:bg-[#0f2020] transition-colors duration-300">

      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main */}
      <main className="lg:ml-64 min-h-screen">

        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-white dark:bg-[#172b2b] border-b border-slate-200 dark:border-slate-700 flex items-center px-4">

          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu
              size={22}
              className="text-slate-700 dark:text-white"
            />
          </button>

          <span className="ml-3 font-semibold text-slate-800 dark:text-white">
            Labens
          </span>

        </div>

        {/* Page Content */}
        <div className="min-h-screen p-4 md:p-6">

          {children}

        </div>

      </main>

    </div>
  );
}