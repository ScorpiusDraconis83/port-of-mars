import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Question } from '@port-of-mars/server/entity/Question';
import { QuizSubmission } from '@port-of-mars/server/entity/QuizSubmission';

@Entity()
export class QuestionResponse {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => Question, question => question.responses, { nullable: false })
  question!: Question;

  @Column()
  questionId!: number;

  @ManyToOne(type => QuizSubmission, quizSubmission => quizSubmission.responses, { nullable: false })
  submission!: QuizSubmission;

  @Column()
  submissionId!: number;

  @Column()
  answer!: number;

  @CreateDateColumn()
  dateCreated!: Date;
}
