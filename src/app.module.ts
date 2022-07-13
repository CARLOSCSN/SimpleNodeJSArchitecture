import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerSheetModule } from './answer-sheet/answer-sheet.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sql',
      entities: ['dist/**/*.entity{.ts,.js}'],
      // add this setting
      autoLoadEntities: true,
      synchronize: true,
    }),
    AnswerSheetModule,
    ExamModule,
  ],
})
export class AppModule {}
