import { Table, Thead, Tbody, Tr, Th, TableContainer, Text, Center, Spinner } from "@chakra-ui/react";
// import useCryptos from "../hooks/useCrypto";
import CryptoRow from "./CryptoRow";
import CryptoSkeleton from "./CryptoRowSkeleton";
import useTopCryptos from "../hooks/useTopCryptos";

const CryptoTable = () => {
  const { cryptos, loading, error } = useTopCryptos(); // Get data using our custom hook

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return <Text color="tomato">{error}</Text>; // Show error message if fetching fails
  }

  return (
    <TableContainer>
      <Table bg="white" borderRadius="md" boxShadow="md" color="black">
        <Thead>
          <Tr>
            <Th>Coin</Th>
            <Th>Price</Th>
            <Th>Chart</Th>
            <Th>Change</Th>
            <Th>Market Cap</Th>
            <Th>Volume (24h)</Th>
            <Th>Supply</Th>
            <Th>Trade</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading
            ? // If data is still loading, display 10 skeleton rows as placeholders
              Array.from({ length: 10 }).map((_, index) => <CryptoSkeleton key={index} />)
            : // Once the data is fetched, map over the cryptos and render each row
              cryptos.map((coin) => <CryptoRow key={coin.id} coin={coin} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable;
