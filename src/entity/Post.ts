import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import Model from './Model';

@Entity({ name: 'posts' })
export class Post extends Model {
  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
