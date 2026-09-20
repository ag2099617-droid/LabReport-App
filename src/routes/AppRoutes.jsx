import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Upload from "../pages/Upload.jsx";
import Analysis from "../pages/Analysis.jsx";
import History from "../pages/History.jsx";
import Compare from "../pages/Compare.jsx";
import Profile from "../pages/Profile.jsx";
import Settings from "../pages/Settings.jsx";
import NotFound from "../pages/NotFound.jsx";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/home" element={<Home />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/upload" element={<Upload />} />

      <Route path="/analysis" element={<Analysis />} />

      <Route path="/history" element={<History />} />

      <Route path="/compare" element={<Compare />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}