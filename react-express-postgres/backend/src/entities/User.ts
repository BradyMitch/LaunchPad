import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  guid: string | undefined | null;

  @Column()
  username: string | undefined | null;

  @Column()
  email: string | undefined | null;

  @Column()
  firstName: string | undefined | null;

  @Column()
  lastName: string | undefined | null;

  @Column()
  roles: string[] | undefined | null;

  @Column()
  createdOn: Date | undefined | null;

  @Column()
  lastUpdated: Date | undefined | null;

  @Column()
  lastLogin: Date | undefined | null;
}
