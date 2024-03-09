import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './questions/question.module';
import { UserModule } from './users/user.module';
import { UserEntity } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { QuestionEntity } from './questions/question.entity';
import { AnswerEntity } from './answer/answer.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'quiz_vani_heroes',
      entities: [UserEntity, QuestionEntity, AnswerEntity],
      synchronize: true,
    }),
    QuestionModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
