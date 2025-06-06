import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// withCredentials: true is required to include cookies (session ID)
// this ensures the server can recognize which user is making the request
export const api = axios.create({
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
  chart_data?: {
    time: string;
    price: number;
  }[];
}

// chart data point type that goes into the CoinData type
// this is used to display the price chart in the CoinDetails page
export interface ChartPoint {
  time: string;
  price: number;
}

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
    const response = await api.get(`/coins/${id}`);

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

export type FilterParams = {
  top?: string;
  price_range?: string;
  gainers?: string;
  losers?: string;
  stablecoins?: string;
  new?: string;
  old?: string;
  page?: string;
  pageSize?: string;
};

export const getFilteredCryptos = async (
  filters: FilterParams
): Promise<{
  data: CryptoData[];
}> => {
  try {
    const adjustedFilters: Record<string, string> = {};

    for (const key in filters) {
      const val = filters[key as keyof FilterParams];
      if (val !== undefined) {
        adjustedFilters[key] = String(val);
      }
    }

    const params = new URLSearchParams(adjustedFilters).toString();
    console.log("Fetching with:", params);

    const res = await api.get(`/cryptos/filtered?${params}`);

    return {
      data: res.data.data,
    };
  } catch (err) {
    console.error("Error fetching filtered cryptos:", err);
    return {
      data: [],
    };
  }
};

// Add a favorite coin
// This will call the backend to add the coin to the user's favorites
export const addFavorite = async (coinId: string): Promise<void> => {
  try {
    await api.post(`/favorites/${coinId}`);
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

// Remove a favorite coin
// This will call the backend to remove the coin from the user's favorites
export const removeFavorite = async (coinId: string): Promise<void> => {
  try {
    await api.delete(`/favorites/${coinId}`);
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

// Get all favorite coins for the logged-in user
// This will call the backend to get the user's favorite coins on the favorites page
export const getFavorites = async (): Promise<CryptoData[]> => {
  try {
    const response = await api.get("/favorites");
    return response.data; // returns full coin objects from your backend
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};
