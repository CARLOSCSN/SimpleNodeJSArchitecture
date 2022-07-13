import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';
import { ExamExistsRule } from './custom.validate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  controllers: [ExamController],
  providers: [ExamExistsRule, ExamService],
})
export class ExamModule {}
