import React, { useState } from "react";

const SignupPage = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[a-z0-9@$!%*?&#^_+={}\[\]:;"'<>,.\/\\|]{6,}$/i;

  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
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

    //clears previous errors
    setErrors({});

    let isValid = true;

    if (!username) {
      handleErrors("username", "Username is required");
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

    //call if valid
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
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
    <div className="flex flex-col min-h-screen items-center bg-gray-200">
      <h1 className="text-3xl my-12">Welcome to Event Space</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[30rem]">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create a new account
        </h2>
        <form onSubmit={handleSubmit} action="/register" method="POST">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
              <span className="mr-2">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-1 border-none outline-none"
                placeholder="Username"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
              <span className="mr-2">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-1 border-none outline-none"
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
              <span className="mr-2">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-1 border-none outline-none"
                placeholder="Password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-700">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
              <span className="mr-2">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-1 border-none outline-none"
                placeholder="Password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
            <a href="/login" className="text-blue-600 text-xs">
              Already have an account?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
