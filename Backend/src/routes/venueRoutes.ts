import express from "express";
import { createVenue, getVenueById, getAllVenues, deleteVenue } from "../controllers/venueController";

const router = express.Router();

router.post("/", createVenue);
router.get("/", getAllVenues);
router.get('/:id', getVenueById);
// router.put('/:id', editVenue);
router.delete('/', deleteVenue);

export default router;
