import axios from "axios";

const API_KEY = "CG-TaEdhsvdcW4G5HdmeJHgLM1B";
const BASE_URL = "https://api.coingecko.com/api/v3";

const coingeckoApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-cg-demo-api-key": API_KEY, // CoinGecko API Key
  },
});

// Type for top cryptocurrencies
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

// Function to fetch top 10 coins
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

// Type for detailed coin data
export interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  description: { en: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    fully_diluted_valuation: { usd: number };
    circulating_supply: number;
    total_supply: number;
    max_supply: number | null;
    ath: { usd: number };
    price_change_percentage_24h: number;
    price_change_percentage_1y: number;
  };
  market_cap_rank: number;
}

// Main app type
export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  description: string;
  marketCap: number;
  price: number;
  image: string;
  priceChangePercentage24h: number;
  fdv: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  ath: number;
  marketCapRank: number;
  volume24h: number;
  priceChangePercentage1y: number;
}

// Fetch a single coin by ID
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
      image: response.data.image.large,
      priceChangePercentage24h: response.data.market_data.price_change_percentage_24h,
      fdv: response.data.market_data.fully_diluted_valuation?.usd || 0,
      circulatingSupply: response.data.market_data.circulating_supply,
      totalSupply: response.data.market_data.total_supply || 0,
      maxSupply: response.data.market_data.max_supply,
      ath: response.data.market_data.ath.usd,
      marketCapRank: response.data.market_cap_rank,
      volume24h: response.data.market_data.total_volume.usd,
      priceChangePercentage1y: response.data.market_data.price_change_percentage_1y || 0,
    };
  } catch (error) {
    console.error("API fejl:", error);
    throw error;
  }
};
