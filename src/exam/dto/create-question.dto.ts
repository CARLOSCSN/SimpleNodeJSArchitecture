import {
  IsAlphanumeric,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateQuestionDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsAlphanumeric()
  @MaxLength(1)
  @IsNotEmpty()
  question: number;

  @IsAlphanumeric()
  @MaxLength(1)
  @IsOptional()
  answer: string;
}
