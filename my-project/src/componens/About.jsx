import React, { useState } from "react";
import Login from "../pages/registration/Login";
import Signup from "../pages/registration/Signup";

const About = () => {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div
      className="flex flex-col items-center p-4 pt-16  h-[100vh]"
      style={{
        backgroundImage: "url('/bg.avif')",
        backgroundRepeat: "repeat",
        backgroundSize: "100%",
      }}
    >
      <div className="flex  mb-6 ">
        <button
          className={`px-6 py-2 rounded-lg text-2xl font-semibold transition ${
            activeTab === "signin"
              ? "bg-gradient-to-r from-black to-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("signin")}
        >
          Sign In
        </button>
        <button
          className={`px-6 py-2 rounded-lg text-2xl font-semibold transition ${
            activeTab === "signup"
              ? "bg-gradient-to-r from-black to-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          SignUp
        </button>
      </div>

      <div className="w-full max-w-md p-6 bg-white border-4 border-transparent rounded-xl shadow-lg border-gradient">
        {activeTab === "signin" && <Login />}
        {activeTab === "signup" && <Signup />}
      </div>
    </div>
  );
};

export default About;
