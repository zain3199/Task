import React, { useState } from "react";
import Login from "../pages/registration/Login";
import Signup from "../pages/registration/Signup";

const About = () => {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="flex flex-col items-center p-4 mt-8 ">
      <div className="flex  mb-6">
        <button
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "signin"
              ? "bg-gradient-to-r from-black to-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("signin")}
        >
          Sign In
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === "signup"
              ? "bg-gradient-to-r from-black to-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          SignUp
        </button>
      </div>

      <div className="w-full max-w-md  p-6 border border-gray-300 rounded-lg shadow-lg">
        {activeTab === "signin" && <Login />}
        {activeTab === "signup" && <Signup />}
      </div>
    </div>
  );
};

export default About;
