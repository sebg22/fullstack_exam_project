import axios from "axios";

const API_KEY = "CG-TaEdhsvdcW4G5HdmeJHgLM1B"
const BASE_URL = "https://api.coingecko.com/api/v3";

const coingeckoApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-cg-demo-api-key": API_KEY, // CoinGecko API Key
  },
});

// Define a TypeScript type for cryptocurrencies
export interface Crypto {
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
export const getTopCryptos = async (): Promise<Crypto[]> => {
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
