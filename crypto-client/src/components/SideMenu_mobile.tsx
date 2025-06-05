import { Box, Collapse, Divider, Flex, GridItem, Menu } from "@chakra-ui/react";
import { useState } from "react";
import { FilterParams } from "../services/coingecko";

interface SideMenuProps {
  setFilter: (filter: FilterParams) => void;
  activeFilter: FilterParams;
}

const SideMenu_mobile = ({ setFilter, activeFilter }: SideMenuProps) => {
  const [showTopOptions, setShowTopOptions] = useState(true);
  const [showPriceOptions, setShowPriceOptions] = useState(false);

  const isTopActive = ["10", "50", "100"].includes(activeFilter.top || "");
  const isPriceRangeActive = ["under_1", "1_100", "above_100"].includes(activeFilter.price_range || "");

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
                  {/* "Top" Category with Show More */}
                  <li
                    style={{
                      listStyleType: "none",
                      cursor: "pointer",
                      height: "25px",
                      borderBottom: isTopActive ? "2px solid #3182ce" : "none", //Underline
                    }}
                    onClick={() => setShowTopOptions(!showTopOptions)}>
                    <Flex align="center" gap={2}>
                      🔝 Top {showTopOptions ? "▲" : "▼"}
                    </Flex>
                  </li>

                  {/* Expandable "Top" Filters */}
                  <Collapse in={showTopOptions} animateOpacity>
                    <Box as="ul" width={"200px"} p={"5px"}>
                      <li style={getStyle("top", "10")} onClick={() => setFilter({ top: "10" })}>
                        Top 10
                      </li>
                      <li style={getStyle("top", "50")} onClick={() => setFilter({ top: "50" })}>
                        Top 50
                      </li>
                      <li style={getStyle("top", "100")} onClick={() => setFilter({ top: "100" })}>
                        Top 100
                      </li>
                    </Box>
                  </Collapse>

                  {/* Price Range with Show More */}
                  <Divider orientation="vertical" height="25px" />
                  <li
                    style={{
                      listStyleType: "none",
                      cursor: "pointer",
                      borderBottom: isPriceRangeActive ? "2px solid #3182ce" : "none", //Underline
                    }}
                    onClick={() => setShowPriceOptions(!showPriceOptions)}>
                    <Flex align="center" gap={2}>
                      💲 Price {showPriceOptions ? "▲" : "▼"}
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
