import React, { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const SignupPage = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[a-z0-9@$!%*?&#^_+={}\[\]:;"'<>,.\/\\|]{6,}$/i;

  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    if (!firstname) {
      handleErrors("firstname", "Firstname is required");
      isValid = false;
    }
    if (!lastname) {
      handleErrors("lastname", "Lastname is required");
      isValid = false;
    }

    if (!email) {
      handleErrors("email", "Email is required");
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      handleErrors("email", "Invalid email format");
      isValid = false;
    }

    if (!passwordRegex.test(password)) {
      handleErrors(
        "password",
        "Password must be at least 6 characters long, include a number, and a special character",
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      handleErrors("confirmPassword", "Passwords do not match");
      isValid = false;
    }

    if (!confirmPassword) {
      handleErrors(
        "confirmPassword",
        "Password must be at least 6 characters long, include a number, and a special character",
      );
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
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
            <p className="text-gray-500 text-sm">Create a new account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name Inputs */}
              <div className="flex space-x-4">
                {/* First Name */}
                <div className="flex-1">
                  <div
                    className={`flex items-center border rounded-lg p-3 transition-all duration-300 
                    ${errors.firstname ? "border-red-400" : "border-gray-300 hover:border-indigo-500"}`}
                  >
                    <UserIcon
                      className={`h-5 w-5 mr-2 
                      ${errors.firstname ? "text-red-500" : "text-purple-400"}`}
                    />
                    <input
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      placeholder="First Name"
                      className="w-full bg-transparent outline-none text-gray-700"
                    />
                  </div>
                  {errors.firstname && (
                    <div className="flex items-center text-red-500 text-xs mt-2">
                      <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                      {errors.firstname}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="flex-1">
                  <div
                    className={`flex items-center border rounded-lg p-3 transition-all duration-300 
                    ${errors.lastname ? "border-red-400" : "border-gray-300 hover:border-indigo-500"}`}
                  >
                    <UserIcon
                      className={`h-5 w-5 mr-2 
                      ${errors.lastname ? "text-red-500" : "text-purple-400"}`}
                    />
                    <input
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      placeholder="Last Name"
                      className="w-full bg-transparent outline-none text-gray-700"
                    />
                  </div>
                  {errors.lastname && (
                    <div className="flex items-center text-red-500 text-xs mt-2">
                      <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                      {errors.lastname}
                    </div>
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <div
                  className={`flex items-center border rounded-lg p-3 transition-all duration-300 
                  ${errors.email ? "border-red-400" : "border-gray-300 hover:border-indigo-500"}`}
                >
                  <EnvelopeIcon
                    className={`h-5 w-5 mr-2 
                    ${errors.email ? "text-red-500" : "text-purple-400"}`}
                  />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    ${errors.password ? "text-red-500" : "text-purple-400"}`}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Confirm Password Input */}
              <div>
                <div
                  className={`flex items-center border rounded-lg p-3 transition-all duration-300 
                  ${errors.confirmPassword ? "border-red-400" : "border-gray-300 hover:border-indigo-500"}`}
                >
                  <LockClosedIcon
                    className={`h-5 w-5 mr-2 
                    ${errors.confirmPassword ? "text-red-500" : "text-purple-400"}`}
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full bg-transparent outline-none text-gray-700"
                  />
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center text-red-500 text-xs mt-2">
                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center mt-4">
              <a
                href="/login"
                className="text-purple-600 hover:text-purple-800 text-sm transition-colors"
              >
                Already have an account?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
              text-white font-bold rounded-lg hover:opacity-90 transition-all 
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
