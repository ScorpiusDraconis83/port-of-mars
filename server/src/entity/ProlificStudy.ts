import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {
  BaseProlificStudyParticipant,
  ProlificMultiplayerStudyParticipant,
  ProlificSoloStudyParticipant,
} from "./ProlificStudyParticipant";

export abstract class BaseProlificStudy {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  externalSurveyUrl?: string;

  @Column()
  studyId!: string;

  @Column()
  completionCode!: string;

  abstract participants: Array<BaseProlificStudyParticipant>;
}

@Entity()
export class ProlificSoloStudy extends BaseProlificStudy {
  @OneToMany(type => ProlificSoloStudyParticipant, participant => participant.study)
  participants!: Array<ProlificSoloStudyParticipant>;
}

@Entity()
export class ProlificMultiplayerStudy extends BaseProlificStudy {
  @OneToMany(type => ProlificMultiplayerStudyParticipant, participant => participant.study)
  participants!: Array<ProlificMultiplayerStudyParticipant>;
}
