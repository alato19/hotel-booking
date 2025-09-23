import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price:number;

  @Column()
  maxPeople:number;

  @Column()
  hasBalcony: boolean;

  @Column()
  oceanView: boolean;

  @Column()
  tvService: boolean;

  @Column()
  isPublished: boolean;
}
