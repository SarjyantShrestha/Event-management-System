import React, { useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const LoginPage = ({ setUserRole }) => {
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleErrors = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //clears previous errors
    setErrors({});
    let isValid = true;

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!email) {
      handleErrors("email", "Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      handleErrors("email", "Please enter a valid email.");
      isValid = false;
    }

    // Validate password
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
        setUserRole(decodedToken.role);

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
    <div className="flex flex-col min-h-screen items-center bg-gray-200">
      <h1 className="text-3xl my-12">Welcome to Event Space</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit} action="/login" method="POST">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
              <span className="mr-1">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  setErrors({});
                  setEmail(e.target.value);
                }}
                className="w-full p-1 border-none outline-none"
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
              <span className="mr-1">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setErrors({});
                  setPassword(e.target.value);
                }}
                className="w-full p-1 border-none outline-none"
                placeholder="Password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            <div className="flex justify-between mt-2">
              <a href="/" className="text-blue-600 text-xs">
                Forgot password?
              </a>
              <a href="/register" className="text-blue-600 text-xs">
                Register account
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
