// src/pages/Coin.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CoinHeader from "../components/CoinHeader";
import CoinStats from "../components/CoinStats";

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  description: { en: string };
  image: { large: string };
  market_data: {
    current_price: { dkk: number };
    market_cap: { dkk: number };
    total_volume: { dkk: number };
  };
}

function Coin() {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<CoinData | null>(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => res.json())
      .then((data) => setCoin(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!coin) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <CoinHeader
        name={coin.name}
        symbol={coin.symbol}
        imageUrl={coin.image.large}
      />

      <p
        dangerouslySetInnerHTML={{
          __html: coin.description.en?.split(". ")[0] + ".",
        }}
      />

      <CoinStats
        price={coin.market_data.current_price.dkk}
        marketCap={coin.market_data.market_cap.dkk}
        volume={coin.market_data.total_volume.dkk}
      />
    </div>
  );
}

export default Coin;
