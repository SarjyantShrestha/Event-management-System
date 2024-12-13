import express from 'express';
import { createBooking, getMyBookings, getAllBookings, getSlotsByDate, getSlotStatusesForVenueAndDate, updateBookingStatus, deleteBooking, getApprovedBookings, totalBookings, totalEvents } from '../controllers/bookingController';
import { authenticateToken } from '../middleware/authToken';
import verifyRole from "../middleware/verifyRole";


const router = express.Router();

//Dashboard 
router.get("/totalbookings", authenticateToken, totalBookings);
router.get("/totalevents", authenticateToken, totalEvents);

//Event Booking
router.post('/booking', authenticateToken, createBooking);
router.get('/my-bookings', authenticateToken, getMyBookings);
router.get("/allbookings", authenticateToken, verifyRole('admin'), getAllBookings);

//Event management
router.get("/approvedbookings", authenticateToken, verifyRole('admin'), getApprovedBookings);
router.get("/slots-by-date", getSlotsByDate);
router.get("/slots-by-date_venue", getSlotStatusesForVenueAndDate);

router.put("/approvebooking", authenticateToken, verifyRole('admin'), updateBookingStatus);
router.delete("/deletebooking", authenticateToken, deleteBooking);
router.get("/approvebooking", authenticateToken, verifyRole('admin'), updateBookingStatus);

export default router;
