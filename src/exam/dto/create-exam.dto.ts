import {
  IsAlphanumeric,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';

export class CreateExamDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsAlphanumeric()
  @MaxLength(8)
  @IsNotEmpty()
  examId: string;

  @IsInt()
  @Min(1)
  @Max(999)
  @IsNotEmpty()
  questionNumber: number;

  @IsNotEmpty()
  questions: CreateQuestionDto[];
}
