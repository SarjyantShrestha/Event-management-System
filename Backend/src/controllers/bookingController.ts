import { User } from "../models/User";
import { Request, Response } from "express";

import { AppDataSource } from "../initializers/data-source";
import { Booking } from "../models/Booking";
import { Slot } from "../models/Slot";
import { Venue } from "../models/Venue";

const userRepo = AppDataSource.getRepository(User);
const bookingRepo = AppDataSource.getRepository(Booking);
const slotRepo = AppDataSource.getRepository(Slot);
const venueRepo = AppDataSource.getRepository(Venue);

export const createBooking = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    const { eventName, participants, slotsByDate, venueName } = req.body;

    // Validate input
    if (!eventName || typeof eventName !== "string") {
      return res.status(400).json({ error: "A valid eventName is required" });
    }

    if (!slotsByDate || typeof slotsByDate !== "object") {
      return res.status(400).json({ error: "slotsByDate must be a valid object" });
    }

    const venue = await venueRepo.findOne({ where: { venueName } });
    if (!venue) {
      return res.status(404).json({ error: "Venue not found" });
    }

    if (venue.capacity < parseInt(participants, 10)) {
      return res.status(400).json({ error: "Participants exceed venue capacity" });
    }

    const user = await userRepo.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset to start of the day
    const bookings = [];

    // Process each date and its slots
    for (const [date, slotTimes] of Object.entries(slotsByDate)) {
      const bookingDate = new Date(date);

      if (bookingDate < currentDate) {
        continue; // Skip past dates
      }

      if (!Array.isArray(slotTimes)) {
        return res.status(400).json({ error: `Invalid slotTimes for date: ${date}` });
      }

      for (const timeRange of slotTimes) {


        const [startTime, endTime] = timeRange.split(" - ");

        if (!startTime || !endTime) {
          return res.status(400).json({
            error: `Invalid slot time format: ${timeRange}`,
          });
        }

        let slot = await slotRepo.findOne({
          where: { date, slotTime: timeRange },
          relations: ["venue"],
        });

        if (slot) {
          // If slot exists but is not available, return an error
          if (slot.status !== "available") {
            return res.status(404).json({
              error: `Slot not available for date: ${date}, time: ${timeRange}`,
            });
          }
        } else {
          // Create the slot if it doesn't exist
          slot = slotRepo.create({
            date,
            slotTime: timeRange,
            status: "available",
            venue,
          });
          await slotRepo.save(slot);
        }

        // Create the booking
        const newBooking = bookingRepo.create({
          user,
          slot,
          eventName,
        });

        // Save the booking and update the slot status
        await bookingRepo.save(newBooking);
        slot.status = "pending"; // Mark slot as pending until approval
        await slotRepo.save(slot);

        bookings.push(newBooking);
      }
    }

    if (bookings.length === 0) {
      return res.status(400).json({ error: "No valid bookings could be created" });
    }

    res.status(201).json({ message: "Bookings created successfully", bookings });
  } catch (error) {
    console.error("Error creating bookings:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};


export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.userId; // Fetch user_id from route params (e.g., /bookings/:user_id)

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const bookings = await bookingRepo.find({
      where: { user: { userId: Number(user_id) } },
      relations: ["slot", "slot.venue"], // Include related slot and venue data
      order: { createdAt: "DESC" }, // Optional: Order by creation date
    });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    // Access userId from res.locals
    const userId = res.locals.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    // Convert bookingId to a number
    const bookingId = parseInt(req.query.bookingId as string, 10);

    if (isNaN(bookingId)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    // Find the booking and ensure it belongs to the user
    const booking = await bookingRepo.findOne({
      where: { bookingId, user: { userId } },
      relations: ["slot"], // Include related slot details
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found or not authorized to delete" });
    }

    // Get the associated slot
    const slot = booking.slot;

    // Delete the booking
    await bookingRepo.remove(booking);

    await slotRepo.remove(slot);

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};


export const getAllBookings = async (req: Request, res: Response) => {
  try {
    // Fetch all bookings with relations to Slot, User, and Venue
    const bookings = await bookingRepo.find({
      relations: ["slot", "slot.venue", "user"],
    });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};


// get by status

export const getApprovedBookings = async (req: Request, res: Response) => {
  try {
    // Fetch only the approved bookings with relations to Slot, User, and Venue
    const bookings = await bookingRepo.find({
      where: {
        slot: {
          status: "booked",  // Filter for approved bookings
        },
      },
      relations: ["slot", "slot.venue", "user"],
    });

    if (!bookings.length) {
      return res.status(404).json({ message: "No approved bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching approved bookings:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};



export const getSlotsByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    // Validate date input
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "A valid date string is required" });
    }

    // Fetch slots for the given date
    const slots = await slotRepo.find({
      relations: ["venue"],
      where: { date },
    });

    if (!slots.length) {
      return res.status(404).json({ message: "No slots found for this date" });
    }

    res.status(200).json(slots);
  } catch (error) {
    console.error("Error fetching slots by date:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

export const getSlotStatusesForVenueAndDate = async (req: Request, res: Response) => {
  try {
    const { venueId, date } = req.body;

    if (!venueId || typeof venueId !== "number") {
      return res.status(400).json({ error: "Invalid or missing venueId" });
    }

    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "Invalid or missing date" });
    }

    // Fetch slots for the given venue ID and date
    const slots = await slotRepo.find({
      where: { venue: { venueId }, date },
      relations: ["venue"],
    });

    if (slots.length === 0) {
      return res.status(404).json({ error: "No slots found for the specified venue and date" });
    }

    // Structure the response
    const response: Record<string, string> = {};

    slots.forEach((slot) => {
      const timeRange = slot.slotTime; // Use the slotTime as the key
      response[timeRange] = slot.status; // Assign the slot's status
    });

    const result = {
      [date]: response,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching slot statuses:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId, status } = req.body;

    if (!bookingId || !status) {
      return res.status(400).json({ error: "Booking ID and status are required" });
    }

    const booking = await bookingRepo.findOne({
      where: { bookingId },
      relations: ["slot"],
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (status !== "approved" && status !== "denied") {
      return res.status(400).json({ error: "Invalid status. Use 'approved' or 'denied'" });
    }

    booking.slot.status = status === "approved" ? "booked" : "available";
    await slotRepo.save(booking.slot);

    await bookingRepo.save({ ...booking, status });

    res.status(200).json({ message: `Booking status updated to '${status}'`, booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};
