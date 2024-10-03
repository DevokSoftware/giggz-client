// Navbar.js
import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Link,
  Heading,
  Text,
  HStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { FaInstagram, FaTwitter, FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });

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

        {isDesktop ? (
          <>
            <HStack ml={8} spacing={6}>
              <Link as={RouteLink} to="/comedians" color="white">
                <Text fontSize="md">Comediantes</Text>
              </Link>
              <Link as={RouteLink} to="/shows" color="white">
                <Text fontSize="md">Eventos</Text>
              </Link>
            </HStack>
            <Spacer />
            <HStack spacing={4}>
              {/* <IconButton
                as="a"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                icon={<FaInstagram />}
                variant="ghost"
                fontSize="25px"
                color="white"
              />
              <IconButton
                as="a"
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                icon={<FaTwitter />}
                variant="ghost"
                fontSize="25px"
                color="white"
              /> */}
              <Link as={RouteLink} to="/profile">
                <IconButton
                  as="a"
                  aria-label="Profile"
                  icon={<CgProfile />}
                  variant="ghost"
                  fontSize="25px"
                  color="white"
                />
              </Link>
            </HStack>
          </>
        ) : (
          <>
            <IconButton
              icon={<FaBars />}
              onClick={onOpen}
              variant="ghost"
              color="white"
              aria-label="Open menu"
            />
            <Drawer isOpen={isOpen} onClose={onClose} placement="left">
              <DrawerOverlay />
              <DrawerContent
                bg="white"
                borderRight="2px solid"
                borderColor="green.600"
                boxShadow="lg"
                p={4}
              >
                <DrawerCloseButton />
                <DrawerHeader
                  borderBottomWidth="1px"
                  borderBottomColor="green.600"
                >
                  <Text fontSize="2xl" color="green.600" fontWeight="bold">
                    GIGGZ
                  </Text>
                </DrawerHeader>
                <DrawerBody>
                  <VStack spacing={4} align="start">
                    <Link as={RouteLink} to="/comedians" color="green.600">
                      <Text fontSize="md" fontWeight="semibold">
                        Comediantes
                      </Text>
                    </Link>
                    <Link as={RouteLink} to="/shows" color="green.600">
                      <Text fontSize="md" fontWeight="semibold">
                        Eventos
                      </Text>
                    </Link>
                    <HStack spacing={4} mt={6}>
                      {/* <IconButton
                        as="a"
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        icon={<FaInstagram />}
                        variant="outline"
                        fontSize="24px"
                        color="green.600"
                      />
                      <IconButton
                        as="a"
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        icon={<FaTwitter />}
                        variant="outline"
                        fontSize="24px"
                        color="green.600"
                      /> */}
                      <Link as={RouteLink} to="/profile" color="green.600">
                        <IconButton
                          as="a"
                          aria-label="Profile"
                          icon={<CgProfile />}
                          variant="outline"
                          fontSize="24px"
                          color="green.600"
                        />
                      </Link>
                    </HStack>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
