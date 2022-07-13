import { Module } from '@nestjs/common';
import { AnswerSheetService } from './answer-sheet.service';
import { AnswerSheetController } from './answer-sheet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerSheet } from './entities/answer-sheet.entity';
import { Exam } from './../exam/entities/exam.entity';
import { ExamService } from 'src/exam/exam.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerSheet, Exam])],
  controllers: [AnswerSheetController],
  providers: [AnswerSheetService, ExamService],
})
export class AnswerSheetModule {}
