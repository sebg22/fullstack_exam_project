import { useState } from "react";

export type Filters = Record<string, any>;

export const useCryptoFilters = (initialFilters: Filters = { top: "10" }) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  // Optional: a helper to reset filters or update multiple filters
  const updateFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return { filters, setFilters: updateFilters };
};
