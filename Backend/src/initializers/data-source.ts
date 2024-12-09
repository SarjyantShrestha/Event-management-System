import { DataSource } from "typeorm"
import { User } from "../models/User"
import { Venue } from "../models/Venue"
import { Slot } from "../models/Slot"
import { Booking } from "../models/Booking"
import dotenv from "dotenv"

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        User, Venue, Slot, Booking
    ],
    subscribers: [],
    migrations: [],
})
