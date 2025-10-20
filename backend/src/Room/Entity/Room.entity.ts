import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookingEntity } from 'src/Booking/Entity/Booking.entity';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  maxPeople: number;

  @Column()
  hasBalcony: boolean;

  @Column()
  oceanView: boolean;

  @Column()
  tvService: boolean;

  @Column({ type: 'date', nullable: true })
  availableFrom: Date;

  @Column({ type: 'date', nullable: true })
  availableTo: Date;

  @Column({ default: false })
  isBooked: boolean;

  @Column()
  isPublished: boolean;

  @OneToMany(() => BookingEntity, (booking) => booking.room)
  bookings: BookingEntity[];
}
