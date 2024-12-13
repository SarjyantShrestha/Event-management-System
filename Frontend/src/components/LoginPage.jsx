import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../contexts/UserContext";
import {
  AtSymbolIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const LoginPage = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername, setUserrole, userrole } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (userrole !== null) {
      navigate("/");
    }
  }, [userrole]);

  const handleErrors = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      handleErrors("email", "Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      handleErrors("email", "Please enter a valid email.");
      isValid = false;
    }

    if (!password) {
      handleErrors("password", "Password is required.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        const decodedToken = jwtDecode(data.token);
        setUserrole(decodedToken.role);
        setUsername(decodedToken.username);
        navigate("/");
      } else {
        alert(data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-8 py-10 bg-white">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
              Event Space
            </h1>
            <p className="text-gray-500 text-sm">
              Login to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <div
                  className={`flex items-center border rounded-lg p-3 transition-all duration-300 
                  ${errors.email ? "border-red-400" : "border-gray-300 hover:border-indigo-500"}`}
                >
                  <AtSymbolIcon
                    className={`h-5 w-5 mr-2 
                    ${errors.email ? "text-red-500" : "text-gray-400"}`}
                  />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setErrors({});
                      setEmail(e.target.value);
                    }}
                    placeholder="Email address"
                    className="w-full bg-transparent outline-none text-gray-700"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center text-red-500 text-xs mt-2">
                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div
                  className={`flex items-center border rounded-lg p-3 transition-all duration-300 
                  ${errors.password ? "border-red-400" : "border-gray-300 hover:border-indigo-500"}`}
                >
                  <LockClosedIcon
                    className={`h-5 w-5 mr-2 
                    ${errors.password ? "text-red-500" : "text-gray-400"}`}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setErrors({});
                      setPassword(e.target.value);
                    }}
                    placeholder="Password"
                    className="w-full bg-transparent outline-none text-gray-700"
                  />
                </div>
                {errors.password && (
                  <div className="flex items-center text-red-500 text-xs mt-2">
                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="flex justify-between mt-4 text-sm">
              <a
                href="/forgot-password"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Forgot Password?
              </a>
              <a
                href="/register"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Create Account
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
              text-white font-bold rounded-lg hover:opacity-90 transition-all 
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
