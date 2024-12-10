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
    const { eventName, date, slotTime, venueName, participants } = req.body;

    // Validate inputs
    if (!userId || !eventName || !date || !slotTime || !venueName) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Find the user
    const user = await userRepo.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    

    // Find the venue
    const venue = await venueRepo.findOne({ where: { venueName } });
    if (!venue) {
      return res.status(404).json({ error: "Venue not found" });
    }

    if (venue.capacity < participants){
      return res.status(404).json({ error: "Participants over the capacity of venue" });
    }

    // Check if a slot already exists for the given date, time, and venue
    let slot = await slotRepo.findOne({ where: { date, slotTime, venue } });

    if (slot) {
      // If slot exists, check if it's available
      if (slot.status !== "available") {
        return res.status(404).json({ error: "Slot not available" });
      }
    } else {
      // If slot does not exist, create a new one
      slot = slotRepo.create({
        date,
        slotTime,
        venue,
        status: "available",
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
    slot.status = "pending";
    await slotRepo.save(slot);

    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
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
    const bookingId = parseInt(req.params.bookingId, 10);

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


export const getSlotsByVenueNameAndDate = async (req: Request, res: Response) => {
  try {
    const { date, venueName } = req.query;

    // Validate inputs
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "A valid date string is required" });
    }
    if (!venueName || typeof venueName !== "string") {
      return res.status(400).json({ error: "A valid venue name is required" });
    }
    
    // Fetch slots for the given venue name and date
    const slots = await slotRepo.find({
      relations: ["venue"], // Include the venue relation to access venueName
      where: {
        date,
        venue: {
          venueName, // Filter by venueName
        },
      },
    });

    if (!slots.length) {
      return res.status(404).json({ message: "No slots found for this venue and date" });
    }

    res.status(200).json(slots);
  } catch (error) {
    console.error("Error fetching slots by venue name and date:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};