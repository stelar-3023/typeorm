import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

export default abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  setUuid() {
    this.uuid = uuid();
  }

  constructor(model?: Partial<any>) {
    super();
    Object.assign(this, model);
  }

  toJSON() {
    return { ...this, id: undefined };
  }
}
