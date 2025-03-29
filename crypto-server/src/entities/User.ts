// DELETE AT SOME POINT
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
