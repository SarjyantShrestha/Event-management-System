import express from 'express';
import { createBooking, getMyBookings } from '../controllers/bookingController';
import { authenticateToken } from 'middleware/authToken';

const router = express.Router();

router.post('/booking',authenticateToken, createBooking);
router.get('/my-bookings',authenticateToken, getMyBookings);

export default router;