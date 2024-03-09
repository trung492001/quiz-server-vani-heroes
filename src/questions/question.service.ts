import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
import { Repository } from 'typeorm';
import { QuestionInputDto, QuestionOutputDto } from './question.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}
  async getAllQuestion(): Promise<QuestionOutputDto[]> {
    const questions = await this.questionRepository.find({
      relations: {
        answers: true,
      },
    });
    // console.log(questions[0].answers[0]);
    return plainToInstance(QuestionOutputDto, questions, {
      excludeExtraneousValues: true,
    });
  }
  async save(question: QuestionInputDto): Promise<QuestionOutputDto> {
    const res = await this.questionRepository.save(question);
    return plainToInstance(QuestionOutputDto, res, {
      excludeExtraneousValues: true,
    });
  }
}
