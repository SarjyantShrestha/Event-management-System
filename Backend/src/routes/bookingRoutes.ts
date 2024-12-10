import express from 'express';
import { createBooking, getMyBookings, getAllBookings, getSlotsByDate } from '../controllers/bookingController';
import { authenticateToken } from '../middleware/authToken';
import verifyRole from "../middleware/verifyRole";

const router = express.Router();


router.post('/booking', authenticateToken, createBooking);
router.get('/my-bookings', authenticateToken, getMyBookings);
router.get("/allbookings", authenticateToken, verifyRole('admin'), getAllBookings);
router.get("/slots-by-date",getSlotsByDate);

export default router;
