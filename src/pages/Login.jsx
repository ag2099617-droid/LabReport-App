import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

import Input from "../components/Layout/Input";
import { auth, provider } from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --------------------------------
  // GOOGLE LOGIN
  // --------------------------------

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("Google User:", user);

      alert(`Welcome ${user.displayName}!`);

      // Go to Home page
      navigate("/dashboard");

    } catch (error) {
      console.error("Google Login Error:", error);

      alert("Google login failed. Please try again.");
    }
  };

  // --------------------------------
  // NORMAL LOGIN
  // --------------------------------

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    // Temporary navigation
    // Later we will connect this to your MERN backend
    navigate("/dashboard");
  };

  // --------------------------------
  // CREATE ACCOUNT
  // --------------------------------

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    // Temporary navigation
    // Later we will connect this to MongoDB
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-5">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        {/* ========================= */}
        {/* TABS */}
        {/* ========================= */}

        <div className="flex bg-slate-100 rounded-full p-1 mb-8">

          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-3 rounded-full font-semibold transition ${
              isLogin
                ? "bg-white shadow text-black"
                : "text-gray-500"
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-3 rounded-full font-semibold transition ${
              !isLogin
                ? "bg-white shadow text-black"
                : "text-gray-500"
            }`}
          >
            Create Account
          </button>

        </div>


        {/* ========================= */}
        {/* FORM */}
        {/* ========================= */}

        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
        >

          {/* Full Name */}
          {!isLogin && (
            <Input
              label="Full Name"
              type="text"
              placeholder="Sara Ahmed"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}


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


          {/* ========================= */}
          {/* MAIN BUTTON */}
          {/* ========================= */}

          <button
            type="submit"
            className="w-full h-14 mt-2 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-semibold transition"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>

        </form>


        {/* ========================= */}
        {/* DIVIDER */}
        {/* ========================= */}

        <div className="flex items-center my-8">

          <div className="flex-1 border-t border-gray-300"></div>

          <span className="mx-4 text-gray-500">
            or
          </span>

          <div className="flex-1 border-t border-gray-300"></div>

        </div>


        {/* ========================= */}
        {/* GOOGLE LOGIN */}
        {/* ========================= */}

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full h-14 rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 shadow-sm font-semibold flex items-center justify-center gap-3 transition"
        >

          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-6 h-6"
          />

          Continue with Google

        </button>


        {/* ========================= */}
        {/* FORGOT PASSWORD */}
        {/* ========================= */}

        {isLogin && (
          <p
            className="text-center text-sm text-gray-500 mt-6 cursor-pointer hover:text-blue-600"
          >
            Forgot your password?
          </p>
        )}

      </div>

    </div>
  );
}