import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import cors from "cors";
import pool from "./src/config/db.js";
const app = express();

app.use(cors());
app.use(express.json());

// route for register authentication
app.use("/api/auth/", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Event Management System API!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Endpoint to handle event booking
app.post("/api/book-event", async (req, res) => {
  const {
    eventName,
    venue,
    startDate,
    endDate,
    startTime,
    endTime,
    participants,
  } = req.body;

  const client = await pool.connect(); // Get a client from the pool
  try {
    await client.query("BEGIN");
    // 1. Get or Insert Venue and retrieve venue_id
    let venueResult = await client.query(
      `SELECT venue_id FROM "Venues" WHERE venue_name = $1`,
      [venue]
    );
    let venueId = venueResult.rows[0].venue_id;

    // 2. Insert into EventCalendar and retrieve calendar_id
    const calendarResult = await client.query(
      `INSERT INTO "EventCalendar" (start_date, start_time, end_date, end_time)
       VALUES ($1, $2, $3, $4)
       RETURNING calendar_id`,
      [startDate, startTime, endDate, endTime]
    );
    const calendarId = calendarResult.rows[0].calendar_id;

    // 3. Insert into EventBookings
    const bookingResult = await client.query(
      `INSERT INTO "EventBookings" (venue_id, calendar_id, user_id, event_name, participants, booking_date)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
       RETURNING *`,
      [
        venueId,
        calendarId,
        1 /* Replace with dynamic user_id */,
        eventName,
        participants,
      ]
    );

    await client.query("COMMIT"); // Commit the transaction
    res.status(201).json(bookingResult.rows[0]);
  } catch (error) {
    console.error("Error booking event:", error);
    res.status(500).send("Server error");
  }
});

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// PostgreSQL Connection Setup
const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432, // Default PostgreSQL port
});

// --- GET /api/event-bookings ---
app.get('/api/event-bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM EventBookings');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Server error');
  }
});

// --- PUT /api/event-bookings/:id ---
app.put('/api/event-bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE EventBookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Event not found');
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).send('Server error');
  }
});

// --- DELETE /api/event-bookings/:id ---
app.delete('/api/event-bookings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM EventBookings WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Event not found');
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).send('Server error');
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
