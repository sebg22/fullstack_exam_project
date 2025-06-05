import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Crypto } from "./Crypto";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "user" })
  role: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ default: false })
  is_blocked: boolean;

  @CreateDateColumn()
  user_created_at: Date;

  @UpdateDateColumn()
  user_updated_at: Date;

  //Adding this relation to allow access to favorite coins
  @ManyToMany(() => Crypto)
  @JoinTable({
    name: "users_coins", // name of the table after join
    joinColumn: {
      name: "user_id", // column in users_coins referring to the user
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "coin_id", // column in users_coins referring to the crypto
      referencedColumnName: "id",
    },
  })
  favoriteCoins: Crypto[];
}
