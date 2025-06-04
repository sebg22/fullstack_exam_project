import axios from "axios";

// const BASE_URL = "https://service-fullstack-exam-project-server.onrender.com";
const BASE_URL = import.meta.env.VITE_API_URL;

const coingeckoApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
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

export interface ChartPoint {
  time: string;
  price: number;
}


// Hent top 10 til forsiden
// Function to fetch top 10 coins
export const getTopCryptos = async (): Promise<CryptoData[]> => {
  try {
    const response = await coingeckoApi.get("/all_cryptos", {
      params: { limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top cryptocurrencies:", error);
    return [];
  }
};

// Hent alle til undersiden
export const getAllCryptos = async (): Promise<CryptoData[]> => {
  try {
    const response = await coingeckoApi.get("/all_cryptos");
    return response.data;
  } catch (error) {
    console.error("Error fetching all cryptocurrencies:", error);
    return [];
  }
};

// Main app type
export interface CoinData {
  chartData: ChartPoint[];
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

// Fetch a single coin by ID from your backend
export const getCoinDetails = async (id: string): Promise<CoinData> => {
  try {
    const response = await coingeckoApi.get(`/coins/${id}`);

    return {
      id: response.data.id,
      name: response.data.name,
      symbol: response.data.symbol,
      description: response.data.description || "Ingen beskrivelse tilgængelig.",
      price: Number(response.data.current_price),
      marketCap: Number(response.data.market_cap),
      image: response.data.image,
      priceChangePercentage24h: Number(response.data.price_change_percentage_24h),
      fdv: Number(response.data.fdv),
      circulatingSupply: Number(response.data.circulating_supply),
      totalSupply: Number(response.data.total_supply),
      maxSupply: response.data.max_supply === null ? null : Number(response.data.max_supply),
      ath: Number(response.data.ath),
      marketCapRank: Number(response.data.market_cap_rank),
      volume24h: Number(response.data.total_volume),
      priceChangePercentage1y: Number(response.data.price_change_percentage_1y),
      chartData: response.data.chart_data || [],
    };
  } catch (error) {
    console.error("API fejl:", error);
    throw error;
  }
};

export const addFavorite = async (coinId: string): Promise<void> => {
  try {
    await coingeckoApi.post(`/favorites/${coinId}`);
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (coinId: string): Promise<void> => {
  try {
    await coingeckoApi.delete(`/favorites/${coinId}`);
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

export const getFavorites = async (): Promise<CryptoData[]> => {
  try {
    const response = await coingeckoApi.get("/favorites");
    return response.data; // returns full coin objects from your backend
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};
