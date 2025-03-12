import { Box, Img, Link } from "@chakra-ui/react";

//props which is sent from the parent component
interface props {
  img: string;
  label: string;
  title: string;
  description: string;
}

const LargeGuide = ({ img, label, title, description }: props) => {
  return (
    <>
      <Link w="100%" m="20px" display="block" _hover={{ textDecoration: "none" }} href="/">
        <Img w="100%" mb="10px" h="300px" src={img} alt="" />
        <Box>
          <span>{label}</span>
        </Box>
        <Box my="5px" fontWeight={600} fontSize={28}>
          <h3>{title}</h3>
        </Box>
        <p>{description}</p>
      </Link>
    </>
  );
};

export default LargeGuide;
