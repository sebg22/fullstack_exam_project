import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Game {
  id: number;
  name: string;
  background_image: string;
}

interface GameResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  //the states and useEffects
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    apiClient
      .get<GameResponse>("/games")
      .then((res) => setGames(res.data.results))
      .catch((err) => setError(err.message));
  }, []);

  return { games, error };
};

export default useGames;
