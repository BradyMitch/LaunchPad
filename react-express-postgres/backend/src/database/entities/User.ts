import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'text', nullable: true })
  guid: string | undefined | null;

  @Column({ type: 'text', nullable: true })
  username: string | undefined | null;

  @Column({ type: 'text', nullable: true })
  email: string | undefined | null;

  @Column({ type: 'text', nullable: true })
  firstName: string | undefined | null;

  @Column({ type: 'text', nullable: true })
  lastName: string | undefined | null;

  @Column({ type: 'text', array: true, nullable: true })
  roles: string[] | undefined | null;

  @Column({ type: 'timestamp', nullable: true, default: () => 'NOW()' })
  createdOn: Date | undefined | null;

  @Column({ type: 'timestamp', nullable: true })
  lastUpdated: Date | undefined | null;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date | undefined | null;
}
