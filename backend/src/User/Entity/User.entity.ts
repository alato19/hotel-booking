import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookingEntity } from 'src/Booking/Entity/Booking.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  roles: string;

  @OneToMany(() => BookingEntity, (booking) => booking.user)
  bookings: BookingEntity[];
}
