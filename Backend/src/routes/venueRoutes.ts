import express from "express";
import { createVenue, getVenueById, getAllVenues, deleteVenue, editVenue } from "../controllers/venueController";

const router = express.Router();

router.post("/", createVenue);
router.get("/", getAllVenues);
router.get('/:id', getVenueById);
router.delete('/:venueId', deleteVenue);
router.put('/:venueId', editVenue);

export default router;
