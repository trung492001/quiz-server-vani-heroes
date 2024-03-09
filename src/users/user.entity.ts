import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  lastSignInTime: Date;
}
