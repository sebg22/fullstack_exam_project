import { Card, CardBody, CardHeader, SimpleGrid, Skeleton, SkeletonText } from "@chakra-ui/react";

const MediumCryptoCardSkeleton = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      <Card p={4} shadow="md" borderWidth="2px" borderRadius="25px" width="90%">
        <CardHeader>
          <Skeleton height="24px" width="50px" mb={2} />
          <Skeleton height="28px" width="80px" mb={2} />
          <Skeleton height="24px" width="100px" />
        </CardHeader>
      </Card>
    </SimpleGrid>
  );
};

export default MediumCryptoCardSkeleton;
