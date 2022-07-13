import {
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ExamExists } from 'src/exam/custom.validate.service';

export class CreateAnswerSheetDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsAlphanumeric()
  @MaxLength(8)
  @IsNotEmpty()
  @ExamExists()
  examId: string;

  @IsDateString('YYYY-MM-DD')
  @MinLength(10)
  @IsNotEmpty()
  examDate: string;

  @IsString()
  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  candidateEmail: string;

  @IsString()
  @MaxLength(120)
  @IsNotEmpty()
  candidateName: string;

  @IsInt()
  @Min(1)
  @Max(999)
  @IsNotEmpty()
  questionNumber: number;

  @IsString()
  @MaxLength(1)
  @IsOptional()
  answer: string;
}
