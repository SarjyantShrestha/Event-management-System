import React, { useState } from "react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-200">
      <h1 className="text-3xl my-12">Welcome to Event Space</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create a new account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
              <span className="mr-2">
                <i className="fas fa-user"></i>
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
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Confirm Password
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
