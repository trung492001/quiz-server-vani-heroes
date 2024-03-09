import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionInputDto, QuestionOutputDto } from './question.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllQuestion(): Promise<QuestionOutputDto[]> {
    const data = await this.questionService.getAllQuestion();
    return data;
  }

  @Post()
  async createQuestion(
    @Body() questionDto: QuestionInputDto,
  ): Promise<QuestionOutputDto> {
    return await this.questionService.save(questionDto);
  }
}
