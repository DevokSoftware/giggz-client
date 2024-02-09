// Navbar.js
import React from "react";
import { Box, Flex, Spacer, Link, Button, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="green.600" p={4} position="fixed" width="100%" zIndex="1000">
      <Flex alignItems="center">
        <Heading
          size="lg"
          color="white"
          fontFamily="monospace" //Define the font family
          fontWeight="bold"
          letterSpacing="wide"
          textTransform="uppercase"
        >
          Giggz
        </Heading>
        <Spacer />
        {/* <Box>
          <Link color="white" mr={4}>
            Home
          </Link>
        </Box>
        <Button colorScheme="whiteAlpha">Sign In</Button> */}
      </Flex>
    </Box>
  );
};

export default Navbar;
