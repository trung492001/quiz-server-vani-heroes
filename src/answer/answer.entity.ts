import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from '../questions/question.entity';

@Entity('Answer')
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column({
    default: false,
  })
  isCorrect: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  question: QuestionEntity;
}
