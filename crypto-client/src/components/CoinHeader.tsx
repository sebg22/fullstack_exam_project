// src/components/CoinHeader.tsx
import React from "react";

// src/components/CoinHeader.tsx

interface Props {
    name: string;
    symbol: string;
    imageUrl: string;
  }
  
  function CoinHeader({ name, symbol, imageUrl }: Props) {
    return (
      <div>
        <h1>
          {name} ({symbol.toUpperCase()})
        </h1>
        <img src={imageUrl} alt={name} width="100" />
      </div>
    );
  }
  
  export default CoinHeader;
  
