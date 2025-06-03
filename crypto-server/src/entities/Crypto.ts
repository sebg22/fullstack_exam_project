import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("all_cryptos")
export class Crypto {
  @PrimaryColumn()
  id: string;

  @Column()
  symbol: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column("decimal")
  current_price: number;

  @Column("bigint")
  market_cap: number;

  @Column("integer")
  market_cap_rank: number;

  @Column("bigint")
  total_volume: number;

  @Column("bigint")
  circulating_supply: number;

  @Column("decimal")
  price_change_percentage_24h: number;

  @Column("text")
  description: string;

  @Column("bigint", { nullable: true }) // nullable now
  total_supply: number | null;

  @Column("bigint", { nullable: true })
  max_supply: number | null;

  @Column("decimal", { nullable: true }) // nullable now
  ath: number | null;

  @Column("decimal", { nullable: true }) // nullable now
  price_change_percentage_1y: number | null;

  @Column("bigint", { nullable: true }) // nullable now
  fdv: number | null;

  @Column("date", { nullable: true })
  genesis_date: string | null;

  @Column("boolean")
  is_stablecoin: boolean;

  @Column("jsonb", { nullable: true })
  chart_data: { time: string; price: number }[] | null;
}
