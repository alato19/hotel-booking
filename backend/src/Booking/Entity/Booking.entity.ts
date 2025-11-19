import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../User/Entity/User.entity';
import { RoomEntity } from '../../Room/Entity/Room.entity';

@Entity('booking')
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => RoomEntity, (room) => room.bookings, { eager: true })
  @JoinColumn({ name: 'roomId' })
  room: RoomEntity;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  confirmed: boolean;
}
