import { useEffect, useState } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../services/coingecko";

// custom hook to check and toggle if a coin is marked as favorite
export default function useIsCoinFavorited(coinId: string) {
  // this keeps track of whether the coin is favorited
  const [isFavorited, setIsFavorited] = useState(false);

  // this runs when the component using this hook mounts or when coinId changes
  useEffect(() => {
    // function to check if the current coin is in the favorites list
    const checkFavorite = async () => {
      try {
        // get all favorite coins from backend
        const favorites = await getFavorites();

        // see if any favorite has the same id as the current coin
        const match = favorites.some(fav => fav.id === coinId);

        // update the state with the result
        setIsFavorited(match);
      } catch (err) {
        // show error in console if something goes wrong
        console.error("could not fetch favorites");
      }
    };

    // only check if we have a coin id
    if (coinId) {
      checkFavorite();
    }
  }, [coinId]);

  // function to toggle the favorite state (add or remove)
  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        // if it's already favorited, remove it from the backend
        await removeFavorite(coinId);
        // update the local state
        setIsFavorited(false);
      } else {
        // if it's not favorited, add it to the backend
        await addFavorite(coinId);
        // update the local state
        setIsFavorited(true);
      }
    } catch (err) {
      // show error in console if something goes wrong
      console.error("error toggling favorite:", err);
    }
  };

  // return the state and the function to use in other components
  return { isFavorited, toggleFavorite };
}
