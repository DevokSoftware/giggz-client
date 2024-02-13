// ComedianDetailsPage.js

import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  IconButton,
  useTheme,
  VStack,
  HStack,
  Badge,
  Button,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import { FaTiktok, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import classes from "./ComedianDetails.module.scss";
import Pagination from "../../components/Pagination";
import { Comedian } from "../../models/Comedian";
import { Show } from "../../models/Show";
import { Content } from "../../models/Content";
import { comedian, contents, shows } from "../../temp_data";
//todo create model for comedian
interface ComedianProps {
  name: string;
  description: string;
}
const ComedianDetailsPage = () => {
  const { comedianId } = useParams();
  const [showType, setShowType] = React.useState("future");
  const theme = useTheme();

  const getContentIcon = (contentType: string) => {
    switch (contentType) {
      case "SPOTIFY":
        return "/spotify_icon.png";
      case "YOUTUBE":
        return "/youtube_icon.png";
      case "PATREON":
        return "/patreon_icon.webp";
    }
  };

  return (
    <Box maxW="1300px" mx="auto">
      <Box textAlign="center" p={4}>
        <Image
          className={classes.comedian_image}
          borderRadius="full"
          src={comedian.image}
          alt={`${comedian.name}'s image`}
          mx="auto"
          //modify this boxShadow
          boxShadow="3px 3px 13px 2px rgb(0 128 0 / 20%)"
          border={`2px solid ${theme.colors.green[600]}`}
          boxSize={{
            base: "120px",
            sm: "120px",
            md: "150px",
            lg: "200px",
          }}
          objectFit="cover"
        />

        <Flex mt={1} mb={4} justify="center">
          {comedian.social && comedian.social.instagram && (
            <IconButton
              as="a"
              href={comedian.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              fontSize="20px"
              color="purple.500"
            />
          )}
          {comedian.social && comedian.social.tiktok && (
            <IconButton
              as="a"
              href={comedian.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              icon={<FaTiktok />}
              variant="ghost"
              fontSize="20px"
              color="black"
              mr={1}
            />
          )}
          {comedian.social && comedian.social.youtube && (
            <IconButton
              as="a"
              href={comedian.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              icon={<FaYoutube />}
              variant="ghost"
              fontSize="20px"
              color="red.500"
              mr={1}
            />
          )}
          {comedian.social && comedian.social.twitter && (
            <IconButton
              as="a"
              href={comedian.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              icon={<FaTwitter />}
              variant="ghost"
              fontSize="20px"
              color="blue.500"
              mr={1}
            />
          )}
        </Flex>
        <Heading size="md" color="green.700">
          {comedian.name}
        </Heading>
        <Text fontSize="md" color="green.500">
          {comedian.description}
        </Text>
      </Box>

      <Tabs
        mt={4}
        maxW="800px"
        mx="auto"
        variant="soft-rounded"
        colorScheme="green"
        size="sm"
      >
        <TabList pl={3} pr={3} justifyContent="center">
          <HStack spacing={4}>
            <Tab
              background="white"
              border={`2px solid ${theme.colors.green[400]}`}
              borderRadius="10px"
              color="green.500"
              boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
              _selected={{ color: "white", background: "green.500" }}
            >
              Conteúdos Digitais
            </Tab>
            <Tab
              background="white"
              border={`2px solid ${theme.colors.green[400]}`}
              borderRadius="10px"
              color="green.500"
              boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
              _selected={{ color: "white", background: "green.500" }}
            >
              Eventos
            </Tab>
          </HStack>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 3, lg: 4 }} spacing={4}>
              {contents.map((content) => (
                <Box p={2} textAlign="center">
                  <Link href={content.url} isExternal>
                    <Image
                      boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
                      className={classes.content_image}
                      borderRadius="full"
                      border={`3px solid ${theme.colors.white}`}
                      boxSize={{
                        base: "70px",
                        sm: "70px",
                        md: "80px",
                        lg: "90px",
                      }}
                      src={getContentIcon(content.contenttype)}
                      mx="auto"
                      objectFit="cover"
                      cursor="pointer"
                    />
                  </Link>
                  <Heading
                    fontSize="sm"
                    color="green.600"
                    mt={{ base: 1, lg: 2 }}
                  >
                    {content.name}
                  </Heading>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {/* <HStack spacing={4} justify="start">
                <Button
                  background={showType === "future" ? "green.500" : "white"}
                  border={`2px solid ${theme.colors.green[400]}`}
                  onClick={() => setShowType("future")}
                  borderRadius="20px"
                  size="sm"
                  color={showType === "future" ? "white" : "green.500"}
                  boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
                >
                  Próximos eventos
                </Button>
                <Button
                  background={showType === "past" ? "green.500" : "white"}
                  border={`2px solid ${theme.colors.green[400]}`}
                  onClick={() => setShowType("past")}
                  borderRadius="20px"
                  size="sm"
                  color={showType === "past" ? "white" : "green.500"}
                  boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
                >
                  Eventos passados
                </Button>
              </HStack> */}
              {shows.map((show, index) => (
                <Flex
                  key={index}
                  p={2}
                  boxShadow="0px 0px 9px 2px rgb(57 124 57 / 20%)"
                  border="2px solid"
                  borderColor="green.600"
                  borderRadius="20px"
                  alignItems="center"
                  cursor="pointer"
                  className={classes.show_card}
                >
                  <Image
                    src={show.poster}
                    boxSize="70px"
                    objectFit="cover"
                    borderRadius="full"
                  />
                  <VStack alignItems="start" spacing={0} flex="1" ml={3}>
                    <HStack justifyContent="space-between" w="100%">
                      <Text
                        textAlign="left"
                        fontWeight="bold"
                        fontSize="md"
                        color="green.700"
                      >
                        {show.name}
                      </Text>
                      <Text fontSize="xs" color="black" ml="auto">
                        {show.date}
                      </Text>
                    </HStack>
                    <VStack alignItems="start" spacing={0} mt={2}>
                      <Text fontSize="sm" color="black" fontWeight="bold">
                        {show.location.name}
                      </Text>
                      <Text fontSize="xs" color="black">
                        {show.location.address}
                      </Text>
                    </VStack>
                  </VStack>
                </Flex>
              ))}
              <Center>
                <Pagination
                  currentPage={1}
                  totalPages={10}
                  onPageChange={() => {}}
                />
              </Center>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ComedianDetailsPage;
