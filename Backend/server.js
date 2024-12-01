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

//PUT API to update event status
app.put('/api/event-bookings/:calendar_id', async (req, res) => {
  const { calendar_id } = req.params; // Extract calendar_id from URL
  const { status } = req.body; // Extract status from the body

  try {
    // Update the status for the given calendar_id in the EventBookings table
    const result = await pool.query(
      `UPDATE "EventBookings" 
       SET status = $1 
       WHERE "calendar_id" = $2 RETURNING *`,
      [status, calendar_id]
    );

    if (result.rowCount > 0) {
      res.status(200).json(result.rows[0]); // Respond with updated event
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    console.error('Error updating event status:', error);
    res.status(500).send('Server error');
  }
});

app.delete('/api/event-bookings/:calendar_id', async (req, res) => {
  const { calendar_id } = req.params; // Get calendar_id from URL parameter
  const client = await pool.connect();  // Start a transaction
  
  try {
    // Begin the transaction
    await client.query('BEGIN');
    
    // Delete from EventBookings table
    const eventBookingResult = await client.query(
      'DELETE FROM "EventBookings" WHERE "calendar_id" = $1 RETURNING *', 
      [calendar_id]
    );

    if (eventBookingResult.rowCount === 0) {
      // If no rows were deleted from EventBookings, rollback the transaction and return 404
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Event not found in EventBookings' });
    }

    // Delete from EventCalendar table
    const eventCalendarResult = await client.query(
      'DELETE FROM "EventCalendar" WHERE "calendar_id" = $1 RETURNING *', 
      [calendar_id]
    );

    if (eventCalendarResult.rowCount === 0) {
      // If no rows were deleted from EventCalendar, rollback the transaction
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Event not found in EventCalendar' });
    }

    // Commit the transaction if both deletions were successful
    await client.query('COMMIT');
    res.status(200).json({ message: 'Event deleted successfully from both EventBookings and EventCalendar' });

  } catch (error) {
    // In case of an error, rollback the transaction
    await client.query('ROLLBACK');
    console.error("Error deleting event:", error);
    res.status(500).send("Server error");
  } finally {
    // Release the client
    client.release();
  }
});


// app.get('/api/event-bookings/approved', async (req, res) => {
//   try {
//     // Query to get the events with status 'Approved' along with event details
//     const result = await client.query(
//       `SELECT eb."venue_id", eb."calendar_id", eb."user_id", eb."event_name", eb."participants", eb."status", ec."start_date", ec."start_time", ec."end_date", ec."end_time"
//        FROM "EventBookings" eb
//        JOIN "EventCalendar" ec ON eb."calendar_id" = ec."calendar_id"
//        WHERE eb."status" = 'Approved'`
//     );

//     // If no data is found, return an appropriate response
//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: 'No approved events found' });
//     }

//     // Send the result as JSON
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error("Error fetching approved events:", error);
//     res.status(500).send("Server error");
//   }
// });


app.get('/api/event-bookings/approved', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT eb."venue_id", eb."calendar_id", eb."user_id", eb."event_name", eb."participants", eb."status", 
              ec."start_date", ec."start_time", ec."end_date", ec."end_time"
       FROM "EventBookings" eb
       JOIN "EventCalendar" ec ON eb."calendar_id" = ec."calendar_id"
       WHERE eb."status" = 'Approved'`
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'No approved events found' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching approved events:", error);
    res.status(500).json({ message: "Server error" });  // Send JSON response on error
  }
});
