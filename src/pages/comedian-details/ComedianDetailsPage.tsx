// ComedianDetailsPage.js

import React, { useEffect, useState } from "react";
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
import useApi from "../../services/useApi";
import {
  ComedianEventResponse,
  ComedianResponse,
  ComedianService,
  ComediansComedianIdEventsGetFiltersParameter,
  ContentResponse,
  Pageable,
} from "../../services/openapi";
import moment from "moment";
import "moment/locale/pt-br";
import { ComedianServiceTemp } from "../../services/tempGenerated/ComedianServiceTemp";
import { Link as RouteLink } from "react-router-dom";
import FormattedDate from "../../components/FormattedDate";

interface ComedianProps {
  name: string;
  description: string;
}
const ComedianDetailsPage = () => {
  const { handleRequest: handleRequestComedian } = useApi();

  const {
    isLoading,
    error,
    handleRequest: handleRequestComedianEvents,
  } = useApi();
  const [comedian, setComedian] = useState<ComedianResponse>();

  const [futureComedianEvents, setFutureComedianEvents] =
    useState<ComedianEventResponse[]>();
  const [currentFutureEventsPage, setFutureEventsPage] = useState(1);

  const [pageableFutureEvents, setPageableFutureEvents] = useState<Pageable>({
    sort: ["date", "asc"],
    size: 10,
    page: 0,
  });
  const [totalFutureEventsPages, setTotalFutureEventsPages] = useState(0);
  const [pastComedianEvents, setPastComedianEvents] =
    useState<ComedianEventResponse[]>();
  const [currentPastEventsPage, setPastEventsPage] = useState(1);

  const [pageablePastEvents, setPageablePastEvents] = useState<Pageable>({
    sort: ["date", "asc"],
    size: 10,
    page: 0,
  });
  const [totalPastEventsPages, setTotalPastEventsPages] = useState(0);

  const { comedianId } = useParams();
  // const [showType, setShowType] = React.useState("future");
  const theme = useTheme();

  useEffect(() => {
    if (comedianId) {
      const fetchComedians = async () => {
        try {
          const comedianResponse = await handleRequestComedian(
            ComedianService.comediansComedianIdGet(parseInt(comedianId, 10))
          );
          setComedian(comedianResponse);
        } catch (error) {
          // TODO handle this errors in a generic way
          console.error(error);
        }
      };
      fetchComedians();
      fetchFutureEvents();
      fetchPastEvents();
    }
  }, [handleRequestComedian]);

  const fetchFutureEvents = async () => {
    if (comedianId) {
      try {
        const filters: ComediansComedianIdEventsGetFiltersParameter = {
          dateFrom: new Date().toISOString(),
        };
        const updatedPageable = {
          ...pageableFutureEvents,
          page: currentFutureEventsPage - 1, // Adjusted for 0-based indexing in the backend
        };
        const eventsResponse = await handleRequestComedianEvents(
          ComedianServiceTemp.comediansComedianIdEventsGet(
            parseInt(comedianId, 10),
            updatedPageable,
            filters
          )
        );
        setPageableFutureEvents(updatedPageable);
        setFutureComedianEvents(eventsResponse?.content || []);
        setTotalFutureEventsPages(eventsResponse?.totalPages || 0);
      } catch (error) {
        // TODO handle this errors in a generic way
        console.error(error);
      }
    }
  };
  const fetchPastEvents = async () => {
    if (comedianId) {
      try {
        const filters: ComediansComedianIdEventsGetFiltersParameter = {
          dateTo: new Date().toISOString(),
        };
        const updatedPageable = {
          ...pageablePastEvents,
          page: currentPastEventsPage - 1, // Adjusted for 0-based indexing in the backend
        };
        const eventsResponse = await handleRequestComedianEvents(
          ComedianServiceTemp.comediansComedianIdEventsGet(
            parseInt(comedianId, 10),
            updatedPageable,
            filters
          )
        );
        setPageablePastEvents(updatedPageable);
        setPastComedianEvents(eventsResponse?.content || []);
        setTotalPastEventsPages(eventsResponse?.totalPages || 0);
      } catch (error) {
        // TODO handle this errors in a generic way
        console.error(error);
      }
    }
  };

  const getContentIcon = (contentType: ContentResponse.contentType) => {
    switch (contentType) {
      case "SPOTIFY":
        return "/spotify_icon.png";
      case "YOUTUBE":
        return "/youtube_icon.png";
      case "PATREON":
        return "/patreon_icon.webp";
    }
  };

  if (comedian == null) {
    return <></>;
  }

  return (
    <Box maxW="1300px" mx="auto">
      <Box textAlign="center" p={4}>
        <Image
          className={classes.comedian_image}
          borderRadius="full"
          src={comedian.picture}
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
          {comedian && comedian.instagram && (
            <IconButton
              as="a"
              href={comedian.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              fontSize="20px"
              color="purple.500"
            />
          )}
          {comedian && comedian.tiktok && (
            <IconButton
              as="a"
              href={comedian.tiktok}
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
          {comedian && comedian.youtube && (
            <IconButton
              as="a"
              href={comedian.youtube}
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
          {comedian && comedian.twitter && (
            <IconButton
              as="a"
              href={comedian.twitter}
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
              border={`2px solid ${theme.colors.green[500]}`}
              borderRadius="10px"
              color="green.500"
              boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
              _selected={{ color: "white", background: "green.400" }}
            >
              Conteúdos Digitais
            </Tab>
            <Tab
              background="white"
              border={`2px solid ${theme.colors.green[500]}`}
              borderRadius="10px"
              color="green.500"
              boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
              _selected={{ color: "white", background: "green.400" }}
            >
              Próximos Eventos
            </Tab>
            <Tab
              background="white"
              border={`2px solid ${theme.colors.green[500]}`}
              borderRadius="10px"
              color="green.500"
              boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
              _selected={{ color: "white", background: "green.400" }}
            >
              Eventos Passados
            </Tab>
          </HStack>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 3, lg: 4 }} spacing={4}>
              {comedian.contents?.map((content) => (
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
                      src={getContentIcon(content.contentType)}
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
              {futureComedianEvents?.length === 0 && (
                <Center>
                  <Text
                    textAlign="left"
                    fontWeight="bold"
                    fontSize="sm"
                    color="green.600"
                  >
                    Sem eventos
                  </Text>
                </Center>
              )}
              {futureComedianEvents?.map((show, index) => (
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
                      {show.standup ? (
                        <RouteLink to={`/standups/${show.standup?.id}`}>
                          <Text
                            textAlign="left"
                            fontWeight="bold"
                            fontSize="md"
                            color="green.700"
                          >
                            {show.standup.name}
                          </Text>
                        </RouteLink>
                      ) : (
                        <Text
                          textAlign="left"
                          fontWeight="bold"
                          fontSize="md"
                          color="green.700"
                        >
                          {show.name}
                        </Text>
                      )}
                    </HStack>
                    <VStack alignItems="start" spacing={0} mt={2}>
                      <Text fontSize="sm" color="black" fontWeight="bold">
                        {show.location?.name}
                      </Text>
                      <Text fontSize="xs" color="black">
                        {show.location?.street +
                          " " +
                          show.location?.number +
                          ", " +
                          show.location?.city}
                      </Text>
                    </VStack>
                  </VStack>
                  <FormattedDate date={show.date} />
                </Flex>
              ))}
              <Center>
                {/* <Pagination
                  currentPage={1}
                  totalPages={10}
                  onPageChange={() => {}}
                /> */}
              </Center>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {pastComedianEvents?.length === 0 && (
                <Center>
                  <Text
                    textAlign="left"
                    fontWeight="bold"
                    fontSize="sm"
                    color="green.600"
                  >
                    Sem eventos
                  </Text>
                </Center>
              )}
              {pastComedianEvents?.map((show, index) => (
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
                      {show.standup ? (
                        <RouteLink to={`/standups/${show.standup?.id}`}>
                          <Text
                            textAlign="left"
                            fontWeight="bold"
                            fontSize="md"
                            color="green.700"
                          >
                            {show.standup.name}
                          </Text>
                        </RouteLink>
                      ) : (
                        <Text
                          textAlign="left"
                          fontWeight="bold"
                          fontSize="md"
                          color="green.700"
                        >
                          {show.name}
                        </Text>
                      )}
                    </HStack>
                    <VStack alignItems="start" spacing={0} mt={2}>
                      {/* TODO - add location as an Entity in BE */}
                      <Text fontSize="sm" color="black" fontWeight="bold">
                        {show.location?.name}
                      </Text>
                      <Text fontSize="xs" color="black">
                        {show.location?.street +
                          " " +
                          show.location?.number +
                          ", " +
                          show.location?.city}
                      </Text>
                    </VStack>
                  </VStack>

                  <FormattedDate date={show.date} />
                </Flex>
              ))}
              <Center>
                {/* <Pagination
                  currentPage={1}
                  totalPages={10}
                  onPageChange={() => {}}
                /> */}
              </Center>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ComedianDetailsPage;
