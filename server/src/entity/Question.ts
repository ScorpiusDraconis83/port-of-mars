import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./Quiz";
import { QuestionResponse } from "./QuestionResponse";

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
