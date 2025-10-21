import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';

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
  maxPeople: number;

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

  // added on 21/10/2025
  @IsOptional()
  @IsDateString()
  availableFrom?: string;

  @IsOptional()
  @IsDateString()
  availableTo?: string;
}
