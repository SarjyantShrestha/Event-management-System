import express from 'express';
import { createBooking, getMyBookings, getAllBookings, getSlotsByDate, updateBookingStatus, deleteBooking, getApprovedBookings, getSlotStatusesForVenueAndDate } from '../controllers/bookingController';
import { authenticateToken } from '../middleware/authToken';
import verifyRole from "../middleware/verifyRole";


const router = express.Router();


router.post('/booking', authenticateToken, createBooking);
router.get('/my-bookings', authenticateToken, getMyBookings);
router.get("/allbookings", authenticateToken, verifyRole('admin'), getAllBookings);
router.get("/approvedbookings", authenticateToken, verifyRole('admin'), getApprovedBookings);
router.get("/slots-by-date", getSlotsByDate);
router.get("/slots-by-date_venue", getSlotStatusesForVenueAndDate);

router.put("/approvebooking", authenticateToken, verifyRole('admin'), updateBookingStatus);
router.delete("/deletebooking", authenticateToken, deleteBooking);
router.get("/approvebooking", authenticateToken, verifyRole('admin'), updateBookingStatus);

export default router;
