import { useState } from "react";
import Input from "../components/Layout/Input";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-200 p-6">

        {/* Top Tabs */}
        <div className="bg-slate-100 rounded-full p-1 flex mb-8">

          <button
            className="w-1/2 py-3 rounded-full text-gray-500 font-semibold"
          >
            Sign in
          </button>

          <button
            className="w-1/2 py-3 rounded-full bg-white shadow text-gray-900 font-semibold"
          >
            Create account
          </button>

        </div>

        {/* Full Name */}
        <Input
          label="Full name"
          type="text"
          placeholder="Sara Ahmed"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Register Button */}

        <button className="w-full h-14 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition">
          Create account
        </button>

        {/* Divider */}

        <div className="flex items-center my-8">

          <div className="flex-1 border-t"></div>

          <span className="mx-4 text-gray-500">
            or
          </span>

          <div className="flex-1 border-t"></div>

        </div>

        {/* Google Button */}

        <button className="w-full h-14 rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 font-semibold shadow-sm transition">
          Continue with Google
        </button>

      </div>

    </div>
  );
}