import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Venue } from "./Venue";
import { Event } from "./Event";

@Entity("slots")
export class Slot {
  @PrimaryGeneratedColumn()
  slotId: number;

  @ManyToOne(() => Venue, (venue) => venue.venueId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "venue_id" })
  venue: Venue;

  @ManyToOne(() => Event, (event) => event.eventId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "event_id" })
  event: Event;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "varchar", length: 10, enum: ["available", "booked", "cancelled"] })
  status: "available" | "booked" | "cancelled";

  @Column({ type: "varchar", length: 15 })
  slotTime: string;
}
