import axios from "axios";

const API_KEY = "CG-TaEdhsvdcW4G5HdmeJHgLM1B";
const BASE_URL = "https://api.coingecko.com/api/v3";

const coingeckoApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-cg-demo-api-key": API_KEY, // CoinGecko API Key
  },
});

// Define a TypeScript type for cryptocurrencies
export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  price_change_percentage_24h: number;
}


// Function to fetch the top 10 cryptocurrencies
export const getTopCryptos = async (): Promise<CryptoData[]> => {
  try {
    const response = await coingeckoApi.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error);
    return [];
  }
};

// Function to fetch a single coin by ID
export interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  description: { en: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
  };
}

export const getCoinDetails = async (id: string): Promise<CoinData> => {
  try {
    const response = await coingeckoApi.get<CoinDetails>(`/coins/${id}`);

    return {
      id: response.data.id,
      name: response.data.name,
      symbol: response.data.symbol,
      description: response.data.description?.en || "Ingen beskrivelse tilgængelig.",
      price: response.data.market_data.current_price.usd,
      marketCap: response.data.market_data.market_cap.usd,
    };
  } catch (error) {
    console.error("API fejl:", error);
    throw error;
  }
};

// Define CoinData to match Coin.tsx
export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  description: string;
  marketCap: number;
  price: number;
}
