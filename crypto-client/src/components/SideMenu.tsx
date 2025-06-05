import { Box, Collapse, Divider, Flex, GridItem, Menu } from "@chakra-ui/react";
import { useState } from "react";
import { FilterParams } from "../services/coingecko";

interface SideMenuProps {
  setFilter: (filter: FilterParams) => void;
  activeFilter: FilterParams;
}

const SideMenu = ({ setFilter, activeFilter }: SideMenuProps) => {
  const [showTopOptions, setShowTopOptions] = useState(true);
  const [showPriceOptions, setShowPriceOptions] = useState(false);

  const isTopActive = ["10", "50", "100"].includes(activeFilter.top || "");
  const isPriceRangeActive = ["under_1", "1_100", "above_100"].includes(activeFilter.price_range || "");

  const getStyle = (key: keyof FilterParams, value: string) => ({
    fontWeight: activeFilter[key] === value ? "bold" : "normal",
    color: activeFilter[key] === value ? "#3182ce" : "inherit",
    display: "inline-flex",
    marginBottom: "4px",
    cursor: "pointer",
    paddingLeft: "15px",
  });

  return (
    <GridItem w="160px" pl="2" pr="2" area={"aside"}>
      <Menu>
        <nav>
          <Box mt={10}>
            <h2 style={{ paddingBottom: "10px", fontWeight: "bold" }}>Cryptocurrencies</h2>
            <ul>
              {/* "Top" Category with Show More */}
              <li
                style={{
                  display: "inline-flex",
                  listStyleType: "none",
                  marginBottom: "4px",
                  cursor: "pointer",
                  borderBottom: isTopActive ? "2px solid #3182ce" : "none", //Underline
                }}
                onClick={() => setShowTopOptions(!showTopOptions)}>
                <Flex align="center" gap={2}>
                  🔝 Top Coins {showTopOptions ? "▲" : "▼"}
                </Flex>
              </li>

              {/* Expandable "Top" Filters */}
              <Collapse in={showTopOptions} animateOpacity>
                <ul>
                  <li style={getStyle("top", "10")} onClick={() => setFilter({ top: "10" })}>
                    Top 10 Coins
                  </li>
                  <li style={getStyle("top", "50")} onClick={() => setFilter({ top: "50" })}>
                    Top 50 Coins
                  </li>
                  <li style={getStyle("top", "100")} onClick={() => setFilter({ top: "100" })}>
                    Top 100 Coins
                  </li>
                </ul>
              </Collapse>

              {/* Price Range with Show More */}
              <Divider />
              <li
                style={{
                  display: "inline-flex",
                  listStyleType: "none",
                  marginBottom: "4px",
                  cursor: "pointer",
                  borderBottom: isPriceRangeActive ? "2px solid #3182ce" : "none", //Underline
                }}
                onClick={() => setShowPriceOptions(!showPriceOptions)}>
                <Flex align="center" gap={2}>
                  💲 Price Range {showPriceOptions ? "▲" : "▼"}
                </Flex>
              </li>

              {/* Expandable Price Range Filters */}
              <Collapse in={showPriceOptions} animateOpacity>
                <ul>
                  <li style={getStyle("price_range", "under_1")} onClick={() => setFilter({ price_range: "under_1" })}>
                    Under $1
                  </li>
                  <li style={getStyle("price_range", "1_100")} onClick={() => setFilter({ price_range: "1_100" })}>
                    $1 - $100
                  </li>
                  <li style={getStyle("price_range", "above_100")} onClick={() => setFilter({ price_range: "above_100" })}>
                    Above $100
                  </li>
                </ul>
              </Collapse>

              {/* 24h Price Change */}
              <Divider />
              <li style={getStyle("gainers", "true")} onClick={() => setFilter({ gainers: "true" })}>
                📈 Only Gainers (24h)
              </li>
              <Divider />
              <li style={getStyle("losers", "true")} onClick={() => setFilter({ losers: "true" })}>
                📉 Only Losers (24h)
              </li>

              {/* Stablecoins Filter */}
              <Divider />
              <li style={getStyle("stablecoins", "true")} onClick={() => setFilter({ stablecoins: "true" })}>
                🏦 Show Only Stablecoins
              </li>

              {/* Coin Age Filter */}
              <Divider />
              <li style={getStyle("new", "true")} onClick={() => setFilter({ new: "true" })}>
                🆕 Show New Coins (Last 6 Months)
              </li>
              <Divider />
              <li style={getStyle("old", "true")} onClick={() => setFilter({ old: "true" })}>
                🏛️ Show Old Coins (Over 5 Years)
              </li>
            </ul>
          </Box>
        </nav>
      </Menu>
    </GridItem>
  );
};

export default SideMenu;
