import {
    Activity,
    LayoutDashboard,
    Upload,
    History,
    BarChart3,
    GitCompare,
    User,
    Settings,
    X,
  } from "lucide-react";
  
  import { NavLink } from "react-router-dom";
  
  export default function Sidebar({ isOpen, setIsOpen }) {
    const menuItems = [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Upload report",
        path: "/upload",
        icon: Upload,
      },
      {
        name: "Report history",
        path: "/history",
        icon: History,
      },
      {
        name: "Insights",
        path: "/analysis",
        icon: BarChart3,
      },
      {
        name: "Compare",
        path: "/compare",
        icon: GitCompare,
      },
      {
        name: "Profile",
        path: "/profile",
        icon: User,
      },
      {
        name: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ];
  
    return (
      <>
        {/* ================= MOBILE OVERLAY ================= */}
  
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
  
        {/* ================= SIDEBAR ================= */}
  
        <aside
          className={`
            fixed
            top-0
            left-0
            z-50
            h-screen
            w-64
            bg-[#f4fbfb] 
            dark:bg-[#132626]
            border-r
            border-[#d8e8e8]
            dark:border-[#334d4d]
            transition-transform
            duration-300
  
            lg:translate-x-0
  
            ${
              isOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          {/* ================= BRAND ================= */}
  
          <div className="px-5 py-5">
            <div className="flex items-center gap-3">
  
              {/* Logo */}
  
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white">
                <Activity size={23} />
              </div>
  
              {/* Brand name */}
  
              <div>
                <h1 className="text-base font-semibold text-slate-800">
                  Labens
                </h1>
  
                <p className="text-[11px] text-slate-500">
                  AI Lab Report Analyzer
                </p>
              </div>
  
            </div>
          </div>
  
          {/* ================= MOBILE CLOSE BUTTON ================= */}
  
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-5 lg:hidden text-slate-600 hover:text-slate-900"
          >
            <X size={20} />
          </button>
  
          {/* ================= MENU ================= */}
  
          <nav className="px-4 mt-3">
            <div className="space-y-2">
  
              {menuItems.map((item) => {
                const Icon = item.icon;
  
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `
                      flex
                      items-center
                      gap-4
                      px-4
                      py-3
                      rounded-full
                      text-[15px]
                      font-medium
                      transition-all
                      duration-200
  
                      ${
                        isActive
                          ? "bg-[#d9f2f1] text-slate-800 shadow-sm"
                          : "text-slate-500 hover:bg-[#e7f5f5] hover:text-slate-700"
                      }
                      `
                    }
                  >
                    <Icon size={19} />
  
                    <span>
                      {item.name}
                    </span>
                  </NavLink>
                );
              })}
  
            </div>
          </nav>
        </aside>
      </>
    );
  }