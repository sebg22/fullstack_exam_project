import { Link } from "@chakra-ui/react";
import logo from "../assets/logo.png";

//props which is sent from the parent component
interface props {
  label: string;
  title: string;
  description: string;
}

const LargeGuide = ({ label, title, description }: props) => {
  return (
    <>
      <Link bg="blue" display="block" _hover={{ textDecoration: "none" }} href="/">
        <img src={logo} alt="Logo" />
        <span>{label}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
    </>
  );
};

export default LargeGuide;
