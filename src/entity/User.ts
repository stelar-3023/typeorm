import { Entity, Column, OneToMany } from 'typeorm';
// import from {} "class-validator"
import { Post } from './Post';
import Model from './Model';

@Entity({ name: 'users' })
export class User extends Model {
  @Column()
  // @Length(1, 255)
  name: string;

  @Column()
  // @Length(1, 255)
  // @IsEmail()
  email: string;

  @Column()
  role: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
