import { IsString, IsNotEmpty, IsDateString, IsBoolean, IsNumber } from 'class-validator';

export class RoomDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  maxPeople:number;

  @IsBoolean()
  @IsNotEmpty()
  hasBalcony: boolean;

  @IsBoolean()
  @IsNotEmpty()
  oceanView: boolean;

  @IsBoolean()
  @IsNotEmpty()
  tvService: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isPublished: boolean;
  
}