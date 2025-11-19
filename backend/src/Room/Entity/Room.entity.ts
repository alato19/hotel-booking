import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookingEntity } from '../../Booking/Entity/Booking.entity';

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

  @Column({ type: 'date', nullable: true, name: 'available_from' })
  availableFrom: string;

  @Column({ type: 'date', nullable: true, name: 'available_to' })
  availableTo: string;

  @Column({ default: false })
  isBooked: boolean;

  @Column()
  isPublished: boolean;

  @OneToMany(() => BookingEntity, (booking) => booking.room)
  bookings: BookingEntity[];
}
