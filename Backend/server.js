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

// Endpoint to fetch event bookings
app.get("/api/event-bookings", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
          e."venue_id",
          e."calendar_id",
          e."user_id",
          e."event_name",
          e."participants",
          e."status",
          e."booking_date",
          v."venue_name",
          c."start_date",
          c."start_time",
          c."end_date",
          c."end_time"
       FROM "EventBookings" e
       JOIN "Venues" v ON e."venue_id" = v."venue_id"
       JOIN "EventCalendar" c ON e."calendar_id" = c."calendar_id"`
    );
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching event bookings:", error);
    res.status(500).send("Server error");
  }
});
