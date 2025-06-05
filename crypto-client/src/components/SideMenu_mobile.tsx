import { Box, Divider, Flex, Menu, Select } from "@chakra-ui/react";
import { FilterParams } from "../services/coingecko";

interface SideMenuProps {
  setFilter: (filter: FilterParams) => void;
  activeFilter: FilterParams;
}

const SideMenu_mobile = ({ setFilter, activeFilter }: SideMenuProps) => {
  const getStyle = (key: keyof FilterParams, value: string) => ({
    fontWeight: activeFilter[key] === value ? "bold" : "normal",
    color: activeFilter[key] === value ? "#3182ce" : "inherit",
    display: "inline-flex",
    cursor: "pointer",
  });

  return (
    <>
      <Flex>
        <Menu>
          <Box as="nav" width="100%">
            <Box mt={10}>
              <h2 style={{ paddingBottom: "10px", fontWeight: "bold" }}>Cryptocurrencies</h2>
              <ul>
                <Flex bg={"blackAlpha.100"} flexWrap={"wrap"} justifyContent={"space-evenly"}>
                  <Select placeholder="🔝 Show top" w="150px">
                    <option style={getStyle("top", "10")} onClick={() => setFilter({ top: "10" })}>
                      Top 10
                    </option>
                    <option style={getStyle("top", "50")} onClick={() => setFilter({ top: "50" })}>
                      Top 50
                    </option>
                    <option style={getStyle("top", "100")} onClick={() => setFilter({ top: "100" })}>
                      Top 100
                    </option>
                  </Select>

                  <Select placeholder="💲 Price" w="150px">
                    <option style={getStyle("price_range", "under_1")} onClick={() => setFilter({ price_range: "under_1" })}>
                      Under $1
                    </option>
                    <option style={getStyle("price_range", "1_100")} onClick={() => setFilter({ price_range: "1_100" })}>
                      $1 - $100
                    </option>
                    <option style={getStyle("price_range", "above_100")} onClick={() => setFilter({ price_range: "above_100" })}>
                      Above $100
                    </option>
                  </Select>

                  {/* 24h Price Change */}
                  <Divider orientation="vertical" height="25px" />
                  <li style={getStyle("gainers", "true")} onClick={() => setFilter({ gainers: "true" })}>
                    📈 Gainers
                  </li>
                  <Divider orientation="vertical" height="25px" />
                  <li style={getStyle("losers", "true")} onClick={() => setFilter({ losers: "true" })}>
                    📉 Losers
                  </li>

                  {/* Stablecoins Filter */}
                  <Divider orientation="vertical" height="25px" />
                  <li style={getStyle("stablecoins", "true")} onClick={() => setFilter({ stablecoins: "true" })}>
                    🏦 Stable
                  </li>

                  {/* Coin Age Filter */}
                  <Divider orientation="vertical" height="25px" />
                  <li style={getStyle("new", "true")} onClick={() => setFilter({ new: "true" })}>
                    🆕 New
                  </li>
                  <Divider orientation="vertical" height="25px" />
                  <li style={getStyle("old", "true")} onClick={() => setFilter({ old: "true" })}>
                    🏛️ Old
                  </li>
                </Flex>
              </ul>
            </Box>
          </Box>
        </Menu>
      </Flex>{" "}
      <Divider borderBottomWidth="4px" width="100%" height="8px" />
    </>
  );
};

export default SideMenu_mobile;
