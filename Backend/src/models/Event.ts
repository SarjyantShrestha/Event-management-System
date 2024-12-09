import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn()
  eventId: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
