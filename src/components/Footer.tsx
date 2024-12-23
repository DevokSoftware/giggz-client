// Footer.js
import React from "react";
import {
  Box,
  Flex,
  Text,
  Link,
  Icon,
  HStack,
  VStack,
  useBreakpointValue,
  Center,
  AbsoluteCenter,
  IconButton,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { Link as RouteLink } from "react-router-dom";

const Footer = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box bg="green.600" color="white" py={4} mt={12}>
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
        mx="auto"
        px={4}
      >
        {/* Left Section */}
        <VStack alignItems={isDesktop ? "flex-start" : "center"} spacing={2}>
          {/* <Text fontSize="lg" fontWeight="bold" letterSpacing="wide">
            Giggz
          </Text> */}
          {/* <Text fontSize="sm">
            © {new Date().getFullYear()} Giggz. Todos os direitos reservados.
          </Text> */}
        </VStack>

        {/* Center Section */}
        <HStack
          spacing={8}
          mt={isDesktop ? 0 : 4}
          justifyContent={isDesktop ? "center" : "center"}
        >
          <Text fontSize="xs" color="white">
            This is a beta version. We’re improving and appreciate your
            feedback!
          </Text>
        </HStack>

        {/* Right Section */}
        <HStack spacing={1} mt={isDesktop ? 0 : 4} ml={2}>
          <IconButton
            as={FaInstagram}
            boxSize={6}
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            textAlign="center"
            aria-label="Instagram"
            variant="ghost"
            color="white"
            cursor="pointer"
          />
          <IconButton
            as={FaTwitter}
            boxSize={6}
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            textAlign="center"
            aria-label="Twitter"
            variant="ghost"
            color="white"
            cursor="pointer"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
