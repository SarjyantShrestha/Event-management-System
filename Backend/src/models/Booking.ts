import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Slot } from "./Slot";

@Entity("bookings")
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @ManyToOne(() => Slot, (slot) => slot.slotId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "slot_id" })
  slot: Slot;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "varchar", length: 100 })
  eventName: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
