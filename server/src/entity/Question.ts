import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "@port-of-mars/server/entity/Quiz";
import { QuestionResponse } from "@port-of-mars/server/entity/QuestionResponse";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => Quiz, quiz => quiz.questions, { nullable: false })
  quiz!: Quiz;

  @Column()
  quizId!: number;

  @Column()
  question!: string;

  @Column({ type: "jsonb" })
  options!: Array<string>;

  @Column()
  correctAnswer!: number;

  @Column()
  tutorialElementId!: string;

  @Column()
  order!: number;

  @OneToMany(type => QuestionResponse, questionResponse => questionResponse.question)
  responses!: Array<QuestionResponse>;
}
