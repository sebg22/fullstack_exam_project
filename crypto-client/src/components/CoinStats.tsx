// src/components/CoinStats.tsx
import React from "react";

interface Props {
    price: number;
    marketCap: number;
    volume: number;
  }
  
  function CoinStats({ price, marketCap, volume }: Props) {
    return (
      <div>
        <h3>Market Info</h3>
        <ul>
          <li>Price: DKK {price.toLocaleString()}</li>
          <li>Market Cap: DKK {marketCap.toLocaleString()}</li>
          <li>Volume (24h): DKK {volume.toLocaleString()}</li>
        </ul>
      </div>
    );
  }

export default CoinStats;
