import { Card, CardHeader, SimpleGrid, Skeleton } from "@chakra-ui/react";

const MediumCryptoCardSkeleton = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="var(--grid-spacing)">
      <Card style={{ padding: "var(--card-padding)", boxShadow: "var(--card-shadow)", borderWidth: "var(--card-border-width)", borderRadius: "var(--card-border-radius)", width: "var(--card-width)" }}>
        <CardHeader>
          <Skeleton height="var(--skeleton-height-sm)" width="var(--skeleton-small-width)" marginBottom="var(--skeleton-margin-bottom)" />
          <Skeleton height="var(--skeleton-height-md)" width="var(--skeleton-medium-width)" marginBottom="var(--skeleton-margin-bottom)" />
          <Skeleton height="var(--skeleton-height-sm)" width="var(--skeleton-large-width)" />
        </CardHeader>
      </Card>
    </SimpleGrid>
  );
};

export default MediumCryptoCardSkeleton;