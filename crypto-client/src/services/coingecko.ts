import axios from "axios";

const BASE_URL = "https://service-fullstack-exam-project-server.onrender.com";

const coingeckoApi = axios.create({
  baseURL: BASE_URL,
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

// Hent top 10 til forsiden
export const getTopCryptos = async (): Promise<CryptoData[]> => {
  try {
    const response = await coingeckoApi.get("/cryptos", {
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
    const response = await coingeckoApi.get("/cryptos");
    return response.data;
  } catch (error) {
    console.error("Error fetching all cryptocurrencies:", error);
    return [];
  }
};
