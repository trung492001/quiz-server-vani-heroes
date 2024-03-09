import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { AnswerDto } from '../answer/answer.dto';

@Exclude()
export class QuestionOutputDto {
  @Expose()
  question: string;

  @Expose()
  hint: string;

  @Expose()
  @Type(() => AnswerDto)
  answers: AnswerDto[];

  @Expose()
  @Transform(
    ({ obj }) => obj.answers.filter((val) => val.isCorrect === true).length,
  )
  numberOfCorrectAns: number;
}

export class QuestionInputDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  hint: string;
}
