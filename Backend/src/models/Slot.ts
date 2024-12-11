import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Venue } from "./Venue";

@Entity("slots")
export class Slot {
  @PrimaryGeneratedColumn()
  slotId: number;

  @ManyToOne(() => Venue, (venue) => venue.venueId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "venueId" })
  venue: Venue;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "varchar", length: 10, enum: ["available", "booked", "pending"] })
  status: "available" | "booked" | "pending";

  @Column({ type: "varchar", length: 15 })
  slotTime: string;
}
