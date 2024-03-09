import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AnswerEntity } from '../answer/answer.entity';

@Entity('Question')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  hint: string;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];
}
