import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading"; // Import react-loading
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setError(null);

      setTimeout(() => {
        alert("Sign-in successful!");
        setLoading(false);
        navigate("/home");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setError("Please enter your email address");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent! Please check your inbox.");
      setResetEmail("");
      setShowReset(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 ">
      {loading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <ReactLoading type="spin" color="#0000ff" height={50} width={50} />
          <p className="text-blue-600 text-lg font-medium">Loading...</p>
        </div>
      ) : !showReset ? (
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xl font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-xl font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-600"
            >
              {showPassword ? <HiEye /> : <HiEyeSlash />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p
            onClick={() => setShowReset(true)}
            className="hover:underline text-blue-800 text-start"
          >
            Forgot Password?
          </p>
          <button
            type="submit"
            className="w-full bg-gradient-to-r text-xl from-black to-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign In
          </button>
        </form>
      ) : (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label
              htmlFor="resetEmail"
              className="block text-lg font-medium text-gray-700"
            >
              Enter your email
            </label>
            <input
              id="resetEmail"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-black to-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send Password Reset Link
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => setShowReset(false)} // Go back to sign in form
            >
              Back to Sign In
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
