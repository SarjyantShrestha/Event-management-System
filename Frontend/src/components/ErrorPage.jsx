import React from "react";

function ErrorPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <a href="/" className="text-blue-500">
        Go to Homepage
      </a>
    </div>
  );
}

export default ErrorPage;
