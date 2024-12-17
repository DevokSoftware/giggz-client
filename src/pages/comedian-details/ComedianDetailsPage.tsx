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
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaRegEye,
} from "react-icons/fa";
import classes from "./ComedianDetails.module.scss";
import useApi from "../../services/useApi";
import {
  ComedianEventResponse,
  ComedianResponse,
  ComedianService,
  ComediansComedianIdEventsGetFiltersParameter,
  ContentResponse,
  EventResponse,
  EventService,
  Pageable,
} from "../../services/openapi";
import moment from "moment";
import "moment/locale/pt-br";
import { ComedianServiceTemp } from "../../services/tempGenerated/ComedianServiceTemp";
import { Link as RouteLink } from "react-router-dom";
import FormattedDate from "../../components/FormattedDate";
import Pagination from "../../components/Pagination";
import { QueryPagination } from "../../components/types/Types";
import {
  displayLocationAddress,
  openTabWithExternUrl,
} from "../../components/utils";

const ComedianDetailsPage = () => {
  const { handleRequest: handleRequestComedian } = useApi();

  const { handleRequest: handleRequestComedianEvents } = useApi();
  const { isLoading, handleRequestWithToken } = useApi();
  const [comedian, setComedian] = useState<ComedianResponse>();

  const [futureComedianEvents, setFutureComedianEvents] =
    useState<ComedianEventResponse[]>();
  const [pastComedianEvents, setPastComedianEvents] =
    useState<ComedianEventResponse[]>();

  const [pastEventsPagination, setPastEventsPagination] =
    useState<QueryPagination>({
      currentPage: 1,
    });

  const [futureEventsPagination, setFutureEventsPagination] =
    useState<QueryPagination>({
      currentPage: 1,
    });

  const [pastEventsPageable, setPastEventsPageable] = useState<Pageable>({
    sort: ["date", "asc"],
    size: 5,
    page: 0,
  });

  const [futureEventsPageable, setFutureEventsPageable] = useState<Pageable>({
    sort: ["date", "asc"],
    size: 5,
    page: 0,
  });

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
    }
  }, [handleRequestComedian]);

  const fetchFutureEvents = async () => {
    if (comedianId) {
      try {
        const filters: ComediansComedianIdEventsGetFiltersParameter = {
          dateFrom: new Date().toISOString(),
        };
        const updatedPageable = {
          ...futureEventsPageable,
          page: futureEventsPagination.currentPage - 1, // Adjusted for 0-based indexing in the backend
        };
        const eventsResponse = await handleRequestComedianEvents(
          ComedianServiceTemp.comediansComedianIdEventsGet(
            parseInt(comedianId, 10),
            updatedPageable,
            filters
          )
        );
        setFutureEventsPageable(updatedPageable);
        setFutureEventsPagination({
          ...futureEventsPagination,
          numberOfResults: eventsResponse?.totalElements || 0,
          totalPages: eventsResponse?.totalPages || 0,
        });
        setFutureComedianEvents(eventsResponse?.content || []);
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
          ...pastEventsPageable,
          page: pastEventsPagination.currentPage - 1, // Adjusted for 0-based indexing in the backend
        };

        const eventsResponse = await handleRequestComedianEvents(
          ComedianServiceTemp.comediansComedianIdEventsGet(
            parseInt(comedianId, 10),
            updatedPageable,
            filters
          )
        );
        setPastEventsPageable(updatedPageable);
        setPastEventsPagination({
          ...pastEventsPagination,
          numberOfResults: eventsResponse?.totalElements || 0,
          totalPages: eventsResponse?.totalPages || 0,
        });
        setPastComedianEvents(eventsResponse?.content || []);
      } catch (error) {
        // TODO handle this errors in a generic way
        console.error(error);
      }
    }
  };
  const handlePastEventsPageChange = (page: number) => {
    setPastEventsPagination({
      ...pastEventsPagination,
      currentPage: page,
    });
  };
  const handleFutureEventsPageChange = (page: number) => {
    setFutureEventsPagination({
      ...futureEventsPagination,
      currentPage: page,
    });
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

  useEffect(() => {
    fetchFutureEvents();
  }, [futureEventsPagination.currentPage]);

  useEffect(() => {
    fetchPastEvents();
  }, [pastEventsPagination.currentPage]);

  const setAttendedEvent = async (event: EventResponse) => {
    await handleRequestWithToken(() =>
      EventService.eventsEventIdAttendedPost(parseInt(event.id, 10), {
        isAttended: !event.isAttendedByLoggedUser,
      })
    );
    fetchPastEvents();
    fetchFutureEvents();
  };

  if (comedian == null) {
    return <></>;
  }

  return (
    <Box maxW="1300px" mx="auto">
      <Box textAlign="center" p={4}>
        <Image
          className={classes.comedian_image}
          borderRadius="25px"
          src={`${process.env.PUBLIC_URL}/comedians/${comedian.picture}.png`}
          alt={`${comedian.name}'s image`}
          mx="auto"
          //modify this boxShadow
          // boxShadow="3px 3px 13px 2px rgb(0 128 0 / 20%)"
          boxShadow="0px 0px 5px 2px rgb(0 8 1 / 45%)"
          border={`2px solid ${theme.colors.gray[200]}`}
          // border={`2px solid ${theme.colors.green[600]}`}
          boxSize={{
            base: "170px",
            sm: "170px",
            md: "190px",
            lg: "200px",
          }}
          objectFit="cover"
        />
        <Heading mt={4} size="md" color="green.700">
          {comedian.name}
        </Heading>

        <Flex justify="center">
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
              ml={0.5}
              mr={0.5}
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
              ml={0.5}
              mr={0.5}
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
              ml={0.5}
              mr={0.5}
            />
          )}
          {comedian && comedian.twitter && (
            <IconButton
              as="a"
              href={comedian.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="ghost"
              fontSize="20px"
              color="blue.500"
              ml={0.5}
              mr={0.5}
            />
          )}
        </Flex>
      </Box>

      <Tabs
        maxW="800px"
        mx="auto"
        variant="soft-rounded"
        colorScheme="green"
        size="sm"
      >
        <TabList pl={3} pr={3} justifyContent="center">
          <HStack spacing={3}>
            {
              <Tab
                fontSize="xs"
                background="white"
                border={`2px solid ${theme.colors.green[500]}`}
                borderRadius="8px"
                color="green.500"
                // boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
                _selected={{ color: "white", background: "green.400" }}
                pl="2"
                pr="2"
              >
                Conteúdos
              </Tab>
            }
            {futureComedianEvents?.length !== 0 && (
              <Tab
                fontSize="xs"
                background="white"
                border={`2px solid ${theme.colors.green[500]}`}
                borderRadius="8px"
                color="green.500"
                // boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
                _selected={{ color: "white", background: "green.400" }}
                pl="2"
                pr="2"
              >
                Próx. Eventos
              </Tab>
            )}
            {pastComedianEvents?.length !== 0 && (
              <Tab
                fontSize="xs"
                background="white"
                border={`2px solid ${theme.colors.green[500]}`}
                borderRadius="8px"
                color="green.500"
                // boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
                _selected={{ color: "white", background: "green.400" }}
                pl="2"
                pr="2"
              >
                Eventos Passados
              </Tab>
            )}
          </HStack>
        </TabList>
        <TabPanels>
          <TabPanel>
            {comedian.contents?.length !== 0 ? (
              <SimpleGrid
                columns={{ base: 2, sm: 3, md: 3, lg: 3 }}
                spacing={{ base: 3, md: 4, lg: 4 }}
              >
                {comedian.contents?.map((content) => (
                  <Link href={content.url} isExternal>
                    <Box
                      p={1}
                      textAlign="center"
                      boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
                      backgroundColor="white"
                      borderRadius="15px"
                      border={`1px solid ${theme.colors.gray[200]}`}
                      h="100%" // Make the box height equal for all grid items
                      display="flex" // Use flexbox to align content inside
                      flexDirection="column" // Stack elements vertically
                      justifyContent="space-between"
                    >
                      <Image
                        p={1}
                        className={classes.content_image}
                        boxSize={{
                          base: "60px",
                          sm: "60px",
                          md: "80px",
                          lg: "80px",
                        }}
                        src={getContentIcon(content.contentType)}
                        mx="auto"
                        cursor="pointer"
                      />
                      <Tooltip label={content.name} fontSize="sm">
                        <Heading
                          fontSize="sm"
                          color="gray.600"
                          mb={1}
                          noOfLines={1}
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {content.name}
                        </Heading>
                      </Tooltip>
                    </Box>
                  </Link>
                ))}
              </SimpleGrid>
            ) : (
              <Text
                fontWeight="bold"
                fontSize="xs"
                color="green.600"
                noOfLines={1}
              >
                Os conteúdos online de {comedian.name} serão adicionados em
                breve!
              </Text>
            )}
          </TabPanel>

          {futureComedianEvents?.length !== 0 && (
            <TabPanel>
              <VStack spacing={{ base: 3, lg: 4 }} align="stretch">
                <>
                  {futureComedianEvents?.map((show, index) => (
                    <Flex
                      key={index}
                      boxShadow="0px 0px 5px 2px rgb(0 8 1 / 30%)"
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="20px"
                      cursor="pointer"
                      className={classes.show_card}
                      h={{ base: "110px", sm: "100px" }}
                      backgroundColor="white"
                    >
                      <HStack w="100px">
                        <Image
                          borderTopLeftRadius="18px"
                          borderBottomLeftRadius="18px"
                          src={
                            show.standup ? show.standup?.poster : show.poster
                          }
                          objectFit="cover"
                          w="100%"
                          h="100%"
                          onClick={() => openTabWithExternUrl(show.url)}
                        />
                      </HStack>
                      <VStack
                        alignItems="start"
                        spacing={0}
                        flex="1"
                        ml={3}
                        m={2}
                      >
                        <HStack justifyContent="space-between" w="100%">
                          {show.standup ? (
                            <RouteLink to={`/standups/${show.standup?.id}`}>
                              <Text
                                textAlign="left"
                                fontWeight="bold"
                                fontSize="md"
                                color="green.700"
                                noOfLines={1}
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
                              noOfLines={1}
                            >
                              {show.name}
                            </Text>
                          )}
                        </HStack>
                        <VStack alignItems="start" spacing={0} mt={2}>
                          <Text
                            textAlign="left"
                            fontSize="sm"
                            color="black"
                            fontWeight="bold"
                            noOfLines={1}
                          >
                            {show.location?.name}
                          </Text>
                          <Text
                            textAlign="left"
                            fontSize="xs"
                            color="black"
                            noOfLines={1}
                          >
                            {displayLocationAddress(show.location)}
                          </Text>
                        </VStack>
                      </VStack>
                      <Box m={2}>
                        <FormattedDate date={show.date} />
                      </Box>
                    </Flex>
                  ))}
                  <Center>
                    <Pagination
                      currentPage={futureEventsPagination.currentPage}
                      totalPages={futureEventsPagination.totalPages || 0}
                      onPageChange={handleFutureEventsPageChange}
                    />
                  </Center>
                </>
              </VStack>
            </TabPanel>
          )}
          {pastComedianEvents?.length !== 0 && (
            <TabPanel>
              <VStack spacing={{ base: 3, lg: 4 }} align="stretch">
                <>
                  {pastComedianEvents?.map((show, index) => (
                    <Flex
                      key={index}
                      boxShadow="0px 0px 5px 2px rgb(0 8 1 / 30%)"
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="20px"
                      cursor="pointer"
                      className={classes.show_card}
                      h={{ base: "110px", sm: "100px" }}
                      backgroundColor="white"
                    >
                      <HStack w="100px">
                        <Image
                          borderTopLeftRadius="18px"
                          borderBottomLeftRadius="18px"
                          src={
                            show.standup ? show.standup?.poster : show.poster
                          }
                          objectFit="cover"
                          w="100%"
                          h="100%"
                          onClick={() => openTabWithExternUrl(show.url)}
                        />
                      </HStack>
                      <VStack
                        alignItems="start"
                        spacing={0}
                        flex="1"
                        ml={3}
                        m={2}
                      >
                        <HStack>
                          <>
                            {show.standup ? (
                              <RouteLink to={`/standups/${show.standup?.id}`}>
                                <Text
                                  textAlign="left"
                                  fontWeight="bold"
                                  fontSize="md"
                                  color="green.700"
                                  noOfLines={1}
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
                                noOfLines={1}
                              >
                                {show.name}
                              </Text>
                            )}
                            {/* <Icon
                              as={FaRegEye}
                              onClick={() => {
                                setAttendedEvent(show);
                              }}
                              color={
                                show.isAttendedByLoggedUser
                                  ? "green.500"
                                  : "gray.500"
                              }
                              fontSize="xl"
                              padding="0"
                              ml={1}
                            /> */}
                          </>
                        </HStack>
                        <VStack alignItems="start" spacing={0} mt={2}>
                          <Text
                            textAlign="left"
                            fontSize="sm"
                            color="black"
                            fontWeight="bold"
                            noOfLines={1}
                          >
                            {show.location?.name}
                          </Text>
                          <Text
                            textAlign="left"
                            fontSize="xs"
                            color="black"
                            noOfLines={1}
                          >
                            {displayLocationAddress(show.location)}
                          </Text>
                        </VStack>
                      </VStack>
                      <Box m={2}>
                        <FormattedDate date={show.date} />
                      </Box>
                    </Flex>
                  ))}
                  <Center>
                    <Pagination
                      currentPage={pastEventsPagination.currentPage}
                      totalPages={pastEventsPagination.totalPages || 0}
                      onPageChange={handlePastEventsPageChange}
                    />
                  </Center>
                </>
              </VStack>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ComedianDetailsPage;
