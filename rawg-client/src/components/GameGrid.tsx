import { Text, Box, Image } from "@chakra-ui/react";
import useGames from "../hooks/useGames";

const GameGrid = () => {
  const { games, error } = useGames();
  //   console.log("Games array er:", games);
  return (
    <>
      {error && <Text color="tomato">{error}</Text>}
      <Box as="ul" display="grid" gridTemplateColumns={{ sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }} gap={6} p={0} m={0} listStyleType="none">
        {games.map((game) => {
          //   console.log("Dette er game.image_background:", game.image_background);

          return (
            <Box transition="transform 0.15s ease-in" _hover={{ cursor: "pointer", transform: "scale(1.03)" }} as="li" key={game.id} w="100%" h="auto" m={5} mt={0} borderRadius="md">
              <article>
                <Image borderRadius={10} src={game.background_image} w="100%" />
                <h3>{game.name}</h3>
              </article>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default GameGrid;
