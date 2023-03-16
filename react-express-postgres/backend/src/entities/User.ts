import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer', nullable: true })
  guid: number | undefined;

  @Column({ type: 'text', nullable: true })
  username: string | undefined;

  @Column({ type: 'text', nullable: true })
  email: string | undefined;

  @Column({ type: 'text', nullable: true })
  firstName: string | undefined;

  @Column({ type: 'text', nullable: true })
  lastName: string | undefined;

  @Column({ type: 'text', array: true, nullable: true })
  roles: string[] | undefined;

  @Column({ type: 'timestamp', nullable: true, default: () => 'NOW()' })
  createdOn: Date | undefined;

  @Column({ type: 'timestamp', nullable: true })
  lastUpdated: Date | undefined;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date | undefined;
}
