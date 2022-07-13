import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnswerSheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', length: 64 })
  examId: string;

  @Column({ type: 'date' })
  examDate: string;

  @Column({ type: 'text', length: 255 })
  candidateEmail: string;

  @Column({ type: 'text', length: 120 })
  candidateName: string;

  @Column({ type: 'int' })
  questionNumber: number;

  @Column({ type: 'text', length: 1, nullable: true })
  answer: string;
}
