import { Box, Collapse, Divider, Flex, GridItem, Menu } from "@chakra-ui/react";
import { useState } from "react";

interface SideMenuProps {
  setFilter: (filter: string) => void;
}

const SideMenu = ({ setFilter }: SideMenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTopOptions, setShowTopOptions] = useState(false);
  const [showPriceOptions, setShowPriceOptions] = useState(false);

  return (
    <GridItem w="150px" pl="2" pr="2" area={"aside"}>
      <Menu>
        <nav>
          <Box mt={10}>
            <h2 style={{ paddingBottom: "10px", fontWeight: "bold" }}>Cryptocurrencies</h2>
            <ul>
              {/* "Top" Category with Show More */}
              <li style={{ display: "inline-flex", listStyleType: "none", marginBottom: "4px", cursor: "pointer" }} onClick={() => setShowTopOptions(!showTopOptions)}>
                <Flex align="center" gap={2}>
                  🔝 Top Coins {showTopOptions ? "▲" : "▼"}
                </Flex>
              </li>

              {/* Expandable "Top" Filters */}
              <Collapse in={showTopOptions} animateOpacity>
                <ul>
                  <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer", paddingLeft: "15px" }} onClick={() => setFilter("top10")}>
                    Top 10 Coins
                  </li>
                  <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer", paddingLeft: "15px" }} onClick={() => setFilter("top50")}>
                    Top 50 Coins
                  </li>
                  <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer", paddingLeft: "15px" }} onClick={() => setFilter("top100")}>
                    Top 100 Coins
                  </li>
                </ul>
              </Collapse>

              {/* Price Range with Show More */}
              <Divider />
              <li style={{ display: "inline-flex", listStyleType: "none", marginBottom: "4px", cursor: "pointer" }} onClick={() => setShowPriceOptions(!showPriceOptions)}>
                <Flex align="center" gap={2}>
                  💲 Price Range {showPriceOptions ? "▲" : "▼"}
                </Flex>
              </li>

              {/* Expandable Price Range Filters */}
              <Collapse in={showPriceOptions} animateOpacity>
                <ul>
                  <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer", paddingLeft: "15px" }} onClick={() => setFilter("under1")}>
                    Under $1
                  </li>
                  <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer", paddingLeft: "15px" }} onClick={() => setFilter("1to100")}>
                    $1 - $100
                  </li>
                  <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer", paddingLeft: "15px" }} onClick={() => setFilter("above100")}>
                    Above $100
                  </li>
                </ul>
              </Collapse>

              {/* 24h Price Change */}
              <Divider />
              <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer" }} onClick={() => setFilter("gainers")}>
                📈 Only Gainers (24h)
              </li>
              <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer" }} onClick={() => setFilter("losers")}>
                📉 Only Losers (24h)
              </li>

              {/* Stablecoins Filter */}
              <Divider />
              <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer" }} onClick={() => setFilter("stablecoins")}>
                🏦 Show Only Stablecoins
              </li>

              {/* All-Time High (ATH) Distance */}
              <Divider />
              <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer" }} onClick={() => setFilter("ath")}>
                🚀 Remove Coins 80% Below ATH
              </li>

              {/* Coin Age Filter */}
              <Divider />
              <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer" }} onClick={() => setFilter("newCoins")}>
                🆕 Show New Coins (Last 6 Months)
              </li>
              <li style={{ display: "inline-flex", marginBottom: "4px", cursor: "pointer" }} onClick={() => setFilter("oldCoins")}>
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
