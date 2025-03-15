import { Tr, Td, Skeleton } from "@chakra-ui/react";

const CryptoSkeleton = () => {
  return (
    <Tr>
      <Td>
        <Skeleton height="20px" width="30px" />
      </Td>
      <Td>
        <Skeleton height="24px" width="150px" />
      </Td>
      <Td>
        <Skeleton height="20px" width="80px" />
      </Td>
      <Td>
        <Skeleton height="20px" width="100px" />
      </Td>
      <Td>
        <Skeleton height="20px" width="60px" />
      </Td>
    </Tr>
  );
};

export default CryptoSkeleton;
