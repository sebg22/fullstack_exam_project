import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Crypto } from "./Crypto";
// many-to-many relationship between users and their favorite coins
@Entity("users_coins")
export class UserCoin {
  @PrimaryColumn("uuid")
  user_id: string;

  @PrimaryColumn()
  coin_id: string;

  @ManyToOne(() => User, (user) => user.favoriteCoins, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Crypto, { onDelete: "CASCADE" })
  @JoinColumn({ name: "coin_id" })
  coin: Crypto;
}
