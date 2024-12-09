import { Request, Response } from "express";
import { AppDataSource } from "../initializers/data-source";
import { Venue } from "../models/Venue";

const venueRepo = AppDataSource.getRepository(Venue);

//Add Venue
export const createVenue = async (req: Request, res: Response) => {
  const { name, location, capacity } = req.body;

  try {
    const venueExist = await venueRepo.findOne({ where: { venueName: name } });
    if (venueExist) {
      return res.status(400).json({ message: "Venue already exists" });
    }

    const venue = venueRepo.create({
      venueName: name,
      location: location,
      capacity: capacity
    });

    await venueRepo.save(venue);

    res.status(201).json({
      message: "Venue added successfully.",
      data: venue,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

//Get all venues
export const getAllVenues = async (req: Request, res: Response) => {
  try {
    const venues = await venueRepo.find()
    res.status(200).json(venues)
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}

//Get Venue by Id
export const getVenueById = async (req: Request, res: Response) => {
  const venueId = req.params.venueId as string;
  try {
    const venue = await venueRepo.findOne({ where: { venueId: parseInt(venueId) } })
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.status(200).json(venue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


//Delete venue
export const deleteVenue = async (req: Request, res: Response) => {
  const venueId = req.query.venueId as string;
  try {
    const venue = await venueRepo.findOne({ where: { venueId: parseInt(venueId) } })

    if (venue) {
      venueRepo.delete(venue);
      res.status(200).json({ message: "Venue deleted", data: venue })
    } else {
      res.status(404).json({ message: "Venue not found" });
    }
  } catch (e) {
    console.log(e)

  }
}
