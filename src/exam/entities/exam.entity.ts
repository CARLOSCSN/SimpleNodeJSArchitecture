import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', length: 64 })
  examId: string;

  @Column({ type: 'int' })
  questionNumber: number;

  @OneToMany(() => Question, (question) => question.exam, {
    cascade: ['insert', 'update', 'remove'],
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  questions: Question[];
}
