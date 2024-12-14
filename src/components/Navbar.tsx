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
  Icon,
} from "@chakra-ui/react";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { FaInstagram, FaTwitter, FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { MdEvent } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { useAuth } from "./auth/authUtils";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const logoutUser = () => {
    handleLogout();
    navigate("/login");
    onClose();
  };
  return (
    <Box bg="green.600" p={4} position="fixed" width="100%" zIndex="1000">
      <Flex alignItems="center">
        <RouteLink to="/">
          <Heading
            size="lg"
            color="white"
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            Giggz
          </Heading>
        </RouteLink>

        {isDesktop ? (
          <>
            <HStack ml={8} spacing={8}>
              <Link as={RouteLink} to="/comedians" color="white">
                <HStack>
                  <Icon as={FaPeopleGroup} fontSize="xl" padding="0" />
                  <Text fontSize="md">Comediantes</Text>
                </HStack>
              </Link>
              <Link as={RouteLink} to="/shows" color="white">
                <HStack>
                  <Icon as={MdEvent} fontSize="xl" padding="0" />
                  <Text fontSize="md">Eventos</Text>
                </HStack>
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
              {localStorage.getItem("accessToken") && (
                <IconButton
                  as="a"
                  aria-label="Logout"
                  onClick={() => logoutUser()}
                  icon={<CiLogout />}
                  variant="ghost"
                  fontSize="25px"
                  color="white"
                  cursor="pointer"
                />
              )}
            </HStack>
          </>
        ) : (
          <>
            <HStack justifyContent="flex-end" w="100%">
              <IconButton
                icon={<FaBars />}
                onClick={onOpen}
                variant="ghost"
                color="white"
                aria-label="Open menu"
                fontSize="2xl"
              />
            </HStack>
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
                  <Heading
                    size="2xl"
                    color="green.600"
                    fontWeight="bold"
                    letterSpacing="wide"
                    textTransform="uppercase"
                  >
                    Giggz
                  </Heading>
                </DrawerHeader>
                <DrawerBody mt={4}>
                  <VStack spacing={6} align="start">
                    <Link
                      as={RouteLink}
                      to="/comedians"
                      color="green.600"
                      onClick={onClose}
                    >
                      <HStack>
                        <Icon as={FaPeopleGroup} fontSize="2xl" padding="0" />
                        <Text fontSize="lg" fontWeight="semibold">
                          Comediantes
                        </Text>
                      </HStack>
                    </Link>
                    <Link
                      as={RouteLink}
                      to="/shows"
                      color="green.600"
                      onClick={onClose}
                    >
                      <HStack>
                        <Icon as={MdEvent} fontSize="2xl" padding="0" />
                        <Text fontSize="lg" fontWeight="semibold">
                          Eventos
                        </Text>
                      </HStack>
                    </Link>
                    <Link
                      as={RouteLink}
                      to="/profile"
                      color="green.600"
                      onClick={onClose}
                    >
                      <HStack>
                        <Icon as={CgProfile} fontSize="2xl" padding="0" />
                        <Text fontSize="lg" fontWeight="semibold">
                          Perfil
                        </Text>
                      </HStack>
                    </Link>
                  </VStack>
                </DrawerBody>
                <DrawerFooter justifyContent="flex-start">
                  <VStack spacing={4} align="start" w="100%">
                    {/* Social Media Icons
                    <HStack margin="auto">
                      <Icon
                        as={FaInstagram}
                        fontSize="xl"
                        padding="0"
                        color="green.600"
                      />
                      <Icon
                        as={FaTwitter}
                        fontSize="xl"
                        padding="0"
                        color="green.600"
                        ml={2}
                      />
                    </HStack> */}

                    {/* Logout */}
                    {localStorage.getItem("accessToken") && (
                      <HStack onClick={() => logoutUser()} mt={3}>
                        <Icon
                          as={CiLogout}
                          fontSize="xl"
                          padding="0"
                          color="green.600"
                        />
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="green.600"
                        >
                          Logout
                        </Text>
                      </HStack>
                    )}
                  </VStack>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
