import { Expose } from 'class-transformer';

export class AnswerDto {
  @Expose()
  isCorrect: boolean;

  @Expose()
  answer: string;
}
