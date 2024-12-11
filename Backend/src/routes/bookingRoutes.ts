import express from 'express';
import { createBooking, getMyBookings, getAllBookings, getSlotsByDate, getSlotsByVenueNameAndDate, updateBookingStatus, deleteBooking, getApprovedBookings} from '../controllers/bookingController';
import { authenticateToken } from '../middleware/authToken';
import verifyRole from "../middleware/verifyRole";


const router = express.Router();


router.post('/booking', authenticateToken, createBooking);
router.get('/my-bookings', authenticateToken, getMyBookings);
router.get("/allbookings", authenticateToken, verifyRole('admin'), getAllBookings);
router.get("/approvedbookings", authenticateToken, verifyRole('admin'), getApprovedBookings);
router.get("/slots-by-date", getSlotsByDate);
router.get("/slots-by-date_venue", getSlotsByVenueNameAndDate);
router.put("/approvebooking",authenticateToken,verifyRole('admin'),updateBookingStatus);
router.delete("/deletebooking",authenticateToken, deleteBooking);
export default router;
