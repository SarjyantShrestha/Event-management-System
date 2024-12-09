import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("venues")
export class Venue {
  @PrimaryGeneratedColumn()
  venueId: number;

  @Column({ type: "varchar", length: 100 })
  venueName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  location: string;

  @Column({ type: "int", nullable: true })
  capacity: number;
}
