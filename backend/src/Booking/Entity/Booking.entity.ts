import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../User/Entity/User.entity';
import { RoomEntity } from 'src/Room/Entity/Room.entity';

@Entity('booking')
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.bookings, { eager: true })
  user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.bookings, { eager: true })
  room: RoomEntity;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  confirmed: boolean;
}
