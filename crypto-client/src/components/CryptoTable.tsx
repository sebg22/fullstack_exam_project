import { Table, Thead, Tbody, Tr, Th, TableContainer, Text, Center, Spinner } from "@chakra-ui/react";
import CryptoRow from "./CryptoRow";
import CryptoSkeleton from "./CryptoRowSkeleton";
import { CryptoData } from "../services/coingecko";

interface Props {
  cryptos: CryptoData[];
  loading: boolean;
  error: string;
}

const CryptoTable = ({ cryptos, loading, error }: Props) => {
  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return <Text color="tomato">{error}</Text>;
  }

  return (
    <TableContainer whiteSpace="normal">
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
          {cryptos.length > 0
            ? cryptos.map((coin) => <CryptoRow key={coin.id} coin={coin} />)
            : // Show some skeleton rows or a message when no data is present
              Array.from({ length: 10 }).map((_, index) => <CryptoSkeleton key={index} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable;
