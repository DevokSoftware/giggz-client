// Navbar.js
import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Link,
  Button,
  Heading,
  Text,
  HStack,
  Center,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
const Navbar = () => {
  return (
    <Box bg="green.600" p={4} position="fixed" width="100%" zIndex="1000">
      <Flex alignItems="center">
        <RouteLink to="/">
          <Heading
            size="lg"
            color="white"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            Giggz
          </Heading>
        </RouteLink>
        <HStack ml={8} spacing={6}>
          <Link as={RouteLink} to="/comedians" color="white">
            <Text fontSize="md">Comediantes</Text>
          </Link>
          <Link as={RouteLink} to="/shows" color="white">
            <Text fontSize="md">Eventos</Text>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
