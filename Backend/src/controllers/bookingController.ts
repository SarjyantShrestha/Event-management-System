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

    const { date, slotTime, eventName, venueName, participants } = req.body;

    // Find the venue
    const venue = await venueRepo.findOne({ where: { venueName } });
    if (!venue) {
      return res.status(404).json({ error: "Venue not found" });
    }

    if (venue.capacity < participants) {
      return res.status(404).json({ error: "Participants over the capacity of venue" });
    }
    // Validate input
    if (!Array.isArray(date) || !Array.isArray(slotTime)) {
      return res.status(400).json({ error: "Date and slotTime must be arrays of the same length" });
    }

    if (!eventName || typeof eventName !== "string") {
      return res.status(400).json({ error: "A valid eventName is required" });
    }

    // Retrieve the user from the request (assuming middleware sets user)
    const user = await userRepo.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0)//Reset time portion to 00:00:00
    const bookings = [];

    // Process each date with its corresponding slot times
    for (let i = 0; i < date.length; i++) {
      const bookingDate = new Date(date[i]);

      // Skip dates in the past
      if (bookingDate < currentDate) {
        continue;
      }

      // Process each slot time for the current date
      for (let j = 0; j < slotTime[i].length; j++) {
        if (!bookingDate || !slotTime[i][j]) {
          return res.status(400).json({
            error: `Invalid date or slot time provided: date=${bookingDate}, time=${slotTime[i][j]}`,
          });
        }
        let slot = await slotRepo.findOne({
          where: { date: date[i], slotTime: slotTime[i][j] },
          relations: ["venue"],
        });


        if (slot) {
          // If slot exists but is not available, return an error
          if (slot.status !== "available") {
            return res.status(404).json({
              error: `Slot not available for date: ${date[i]}, time: ${slotTime[i][j]}`,
            });
          }
        } else {
          // If slot does not exist, create it
          slot = slotRepo.create({
            date: date[i],
            slotTime: slotTime[i][j],
            status: "available",
            venue: venue
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


export const getSlotsByVenueNameAndDate = async (req: Request, res: Response) => {
  try {
    const { date, venueName } = req.query;
    console.log(date)
    console.log(venueName)

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
    console.log(slots)

    if (!slots.length) {
      return res.status(200).json({ message: "No slots found for this venue and date" });
    }

    res.status(200).json(slots);
  } catch (error) {
    console.error("Error fetching slots by venue name and date:", error);
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

export const totalBookings = async (req: Request, res: Response) => {
  try {
    const total = await bookingRepo.count();
    res.status(200).json({ totalBookings: total });
  } catch (error) {
    console.error("Error fetching total bookings:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

export const totalEvents = async (req: Request, res: Response) => {
  try {
    // Query unique event names
    const uniqueEventNames = await bookingRepo
      .createQueryBuilder("booking")
      .select("COUNT(DISTINCT booking.eventName)", "count")
      .getRawOne();

    res.status(200).json({ uniqueEventNames: parseInt(uniqueEventNames.count, 10) });
  } catch (error) {
    console.error("Error counting unique event names:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};
