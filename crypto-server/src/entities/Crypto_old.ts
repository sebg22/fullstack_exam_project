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
  fully_diluted_valuation: number;

  @Column("bigint")
  total_volume: number;

  @Column("decimal")
  high_24h: number;

  @Column("decimal")
  low_24h: number;

  @Column("decimal")
  price_change_24h: number;

  @Column("decimal")
  price_change_percentage_24h: number;

  @Column("bigint")
  market_cap_change_24h: number;

  @Column("decimal")
  market_cap_change_percentage_24h: number;

  @Column("bigint")
  circulating_supply: number;

  @Column("bigint")
  total_supply: number;

  @Column("bigint", { nullable: true })
  max_supply: number | null;

  @Column("decimal")
  ath: number;

  @Column("decimal")
  ath_change_percentage: number;

  @Column("timestamp")
  ath_date: Date;

  @Column("decimal")
  atl: number;

  @Column("decimal")
  atl_change_percentage: number;

  @Column("timestamp")
  atl_date: Date;

  @Column("timestamp")
  last_updated: Date;

  @Column("decimal", { nullable: true })
  roi_times: number | null; // Split roi object into separate columns

  @Column("varchar", { nullable: true })
  roi_currency: string | null;

  @Column("decimal", { nullable: true })
  roi_percentage: number | null;
}
