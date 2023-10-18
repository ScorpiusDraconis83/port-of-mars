import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Quiz } from "./Quiz";
import { QuestionResponse } from "./QuestionResponse";

@Entity()
export class QuizSubmission {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => User, { nullable: false })
  user!: User;

  @Column()
  userId!: number;

  @CreateDateColumn()
  dateCreated!: Date;

  @ManyToOne(type => Quiz, { nullable: false })
  quiz!: Quiz;

  @Column()
  quizId!: number;

  @OneToMany(type => QuestionResponse, questionResponse => questionResponse.submission)
  responses!: Array<QuestionResponse>;
}
