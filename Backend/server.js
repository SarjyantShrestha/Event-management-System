import express from "express";
// import authRoutes from "./src/routes/authRoutes.js";

const app = express();

app.use(express.json());

// route for register authentication
// app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Event Management System API!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
