import { Request, Response } from "express";
import { AppDataSource } from "../initializers/data-source";
import { Venue } from "../models/Venue";

const venueRepo = AppDataSource.getRepository(Venue);

//Add Venue
export const createVenue = async (req: Request, res: Response) => {
  const { name, location, capacity, amenities } = req.body;

  try {
    const venueExist = await venueRepo.findOne({ where: { venueName: name } });
    if (venueExist) {
      return res.status(400).json({ message: "Venue already exists" });
    }

    const venue = venueRepo.create({
      venueName: name,
      location: location,
      capacity: capacity,
      amenities: amenities
    });

    await venueRepo.save(venue);

    return res.status(200).json({
      message: "Venue added successfully.",
      data: venue,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

//Get all venues
export const getAllVenues = async (req: Request, res: Response) => {
  try {
    const venues = await venueRepo.find()
    return res.status(200).json(venues)
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
}

//Get Venue by Id
export const getVenueById = async (req: Request, res: Response) => {
  const venueId = req.params.id as string;
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
  const venueId = req.params.venueId as string;
  try {
    const venue = await venueRepo.findOne({ where: { venueId: parseInt(venueId) } })

    if (venue) {
      await venueRepo.remove(venue);
      res.status(200).json({ message: "Venue deleted", data: venue })
    } else {
      res.status(404).json({ message: "Venue not found" });
    }
  } catch (e) {
    console.log(e)

  }
}


export const getVenueAmenities = async (req: Request, res: Response) => {
  const venueId = req.query.venueId as string;
  try {
    const venue = await venueRepo.findOne({
      where: { venueId: parseInt(venueId) },
      select: ["amenities"],
    });

    if (venue) {
      res.status(200).json({ amenities: venue.amenities });
    } else {
      res.status(404).json({ message: "Venue not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching amenities" });
  }
};


export const editVenue = async (req: Request, res: Response) => {
  const { name, location, capacity, amenities } = req.body;
  const venueId = req.params.venueId as string;
  console.log("server working")
  console.log(venueId)

  try {
    const venue = await venueRepo.findOne({ where: { venueId: parseInt(venueId) } })

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" })
    }

    // If null then set the previous values
    venue.venueName = name || venue.venueName
    venue.location = location || venue.location
    venue.capacity = capacity || venue.capacity
    venue.amenities = amenities || venue.amenities

    venueRepo.save(venue)
    return res.status(200).json({ message: "Venue updated succesfully.", data: venue })

  } catch (e) {
    console.log(e)

  }
}

export const totalVenues = async (req: Request, res: Response) => {
  try {
    const total = await venueRepo.count();
    res.status(200).json({ totalVenues: total });
  } catch (error) {
    console.error("Error fetching total venues:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};
