import { Table, Thead, Tbody, Tr, Th, TableContainer, Text, Center, Spinner, Td } from "@chakra-ui/react";
import CryptoRow from "./CryptoRow";
import CryptoSkeleton from "./CryptoRowSkeleton";
import { CryptoData } from "../services/crypto";

interface Props {
  cryptos: CryptoData[];
  loading: boolean;
  error: string;
}

const CryptoTable = ({ cryptos, loading, error }: Props) => {
  if (error) {
    return <Text color="tomato">{error}</Text>;
  }

  return (
    <TableContainer whiteSpace="normal" padding={{ md: 5 }}>
      <Table bg="cardBg" borderRadius="md" boxShadow="md" color="black">
        <Thead>
          <Tr>
            <Th pl={{ base: 20, md: 20 }} pr={0}>
              Coin
            </Th>
            <Th p={{ base: 2, xl: 6 }}>Price</Th>
            <Th
              display="none"
              sx={{
                "@media screen and (min-width: 960px)": {
                  display: "table-cell",
                },
              }}>
              Chart
            </Th>
            <Th p={{ base: 2, xl: 6 }}>Change</Th>
            <Th
              display="none"
              sx={{
                "@media screen and (min-width: 960px)": {
                  display: "table-cell",
                },
              }}>
              Market Cap
            </Th>
            <Th
              display="none"
              sx={{
                "@media screen and (min-width: 960px)": {
                  display: "table-cell",
                },
              }}>
              Volume (24h)
            </Th>
            <Th
              display="none"
              sx={{
                "@media screen and (min-width: 960px)": {
                  display: "table-cell",
                },
              }}>
              Supply
            </Th>
            <Th
              display="none"
              sx={{
                "@media screen and (min-width: 960px)": {
                  display: "table-cell",
                },
              }}>
              Trade
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            // Show skeleton rows while loading
            Array.from({ length: 10 }).map((_, index) => <CryptoSkeleton key={index} />)
          ) : cryptos.length > 0 ? (
            // Show actual data when loaded
            cryptos.map((coin) => <CryptoRow key={coin.id} coin={coin} />)
          ) : (
            // Show a fallback message if there’s no data
            <Tr>
              <Td colSpan={8}>
                <Center py={10}>
                  <Text>No cryptocurrencies found.</Text>
                </Center>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable;
