import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { AnswerEntity } from './answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [TypeOrmModule.forFeature([AnswerEntity])],
})
export class AnswerModule {}
