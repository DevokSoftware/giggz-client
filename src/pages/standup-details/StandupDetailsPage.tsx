// ComedianDetailsPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";

import useApi from "../../services/useApi";
import {
  EventResponse,
  EventService,
  EventsGetFiltersParameter,
  Pageable,
  Standup,
  StandupService,
} from "../../services/openapi";
import "moment/locale/pt-br";
import { EventServiceTemp } from "../../services/tempGenerated/EventServiceTemp";
import classes from "./StandupDetailsPage.module.scss";
import moment from "moment";
import FormattedDate from "../../components/FormattedDate";
import Pagination from "../../components/Pagination";
import { QueryPagination } from "../../components/types/Types";
import { displayLocationAddress, isPastDate } from "../../components/utils";
import { FaRegEye } from "react-icons/fa";
const StandupDetailsPage = () => {
  const theme = useTheme();
  const { isLoading: isLoadingStandup, handleRequest: handleRequestStandup } =
    useApi();
  const {
    isLoading: isLoadingStandupEvents,
    handleRequest: handleRequestStandupEvents,
  } = useApi();
  const { isLoading: isLoadingWithToken, handleRequestWithToken } = useApi();
  const { standupId } = useParams();
  const [standup, setStandup] = useState<Standup>();
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [eventPagination, setEventPagination] = useState<QueryPagination>({
    currentPage: 1,
  });
  const [eventsPageable, setEventsPageable] = useState<Pageable>({
    sort: ["date", "asc"],
    size: 5,
    page: 0,
  });

  const fetchEvents = async () => {
    if (!standupId) {
      return;
    }
    try {
      const updatedPageable = {
        ...eventsPageable,
        page: eventPagination.currentPage - 1,
      };

      const eventsResponse =
        localStorage.getItem("accessToken") != null
          ? await handleRequestWithToken(() =>
              EventServiceTemp.eventsGet(updatedPageable, {
                standupId: parseInt(standupId, 10),
              })
            )
          : await handleRequestStandupEvents(
              EventServiceTemp.eventsGet(updatedPageable, {
                standupId: parseInt(standupId, 10),
              })
            );
      setEventsPageable(updatedPageable);
      setEventPagination({
        ...eventPagination,
        numberOfResults: eventsResponse?.totalElements || 0,
        totalPages: eventsResponse?.totalPages || 0,
      });
      setEvents(eventsResponse?.content || []);
    } catch (error) {
      // TODO handle this errors in a generic way
      console.error(error);
    }
  };
  const handlePageChange = (page: number) => {
    setEventPagination({
      ...eventPagination,
      currentPage: page,
    });
  };

  useEffect(() => {
    if (standupId) {
      const fetchStandup = async () => {
        try {
          const standupResponse = await handleRequestStandup(
            StandupService.standupsStandupIdGet(parseInt(standupId, 10))
          );
          setStandup(standupResponse);
        } catch (error) {
          // TODO handle this errors in a generic way
          console.error(error);
        }
      };
      fetchStandup();
      fetchEvents();
    }
  }, [handleRequestStandup]);

  useEffect(() => {
    fetchEvents();
  }, [eventPagination.currentPage]);

  const setAttendedEvent = async (event: EventResponse) => {
    await handleRequestWithToken(() =>
      EventService.eventsEventIdAttendedPost(parseInt(event.id, 10), {
        isAttended: !event.isAttendedByLoggedUser,
      })
    );
    fetchEvents();
  };

  if (standup == null) {
    return <></>;
  }

  return isLoadingStandup ? (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="green.600"
      size="xl"
    />
  ) : (
    <Box mt={{ base: 2, sm: 3, md: 5, lg: 5 }}>
      <Box
        pl={{ base: 4, sm: 5, md: 10, lg: 20 }}
        pr={{ base: 4, sm: 5, md: 10, lg: 20 }}
        maxW="1000px"
        mx="auto"
      >
        <Box mx="auto" textAlign="center">
          <Image
            // className={classes.comedian_image}
            borderRadius="20px"
            src={standup.poster}
            mx="auto"
            boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
            border={`3px solid ${theme.colors.white}`}
            maxH={{
              base: "180px",
              sm: "180px",
              md: "250px",
              lg: "270px",
            }}
            // objectFit="cover"
          />

          <Heading size="md" color="green.700" mt={5} textTransform="uppercase">
            {standup.name}
          </Heading>
          <Box mx="auto" textAlign="left">
            <Text fontSize="sm" mt={7} color="gray.600" textAlign="justify">
              {standup.description?.split("\n\n").map((paragraph, index) => (
                <p key={index} style={{ marginBottom: "1em" }}>
                  {paragraph}
                </p>
              ))}
            </Text>
          </Box>
        </Box>

        <VStack spacing={4} align="stretch" mt={10}>
          <Heading textAlign="left" size="md" color="green.600">
            Todas as datas:
          </Heading>
          {isLoadingStandupEvents && isLoadingWithToken ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="green.600"
              size="xl"
              mx="auto"
            />
          ) : (
            <>
              {events?.length === 0 && (
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
              {events?.map((show, index) => (
                <Flex
                  key={index}
                  p={2}
                  // boxShadow="0px 0px 9px 2px rgb(57 124 57 / 20%)"
                  boxShadow="0px 0px 5px 2px rgb(0 8 1 / 30%)"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="15px"
                  alignItems="center"
                  cursor="pointer"
                  className={classes.show_card}
                >
                  <VStack alignItems="start" spacing={0} flex="1" ml={3}>
                    <HStack>
                      <Text
                        fontSize="sm"
                        color="black"
                        fontWeight="bold "
                        noOfLines={1}
                        textAlign="left"
                      >
                        {show.location?.name}
                      </Text>
                      {/* {isPastDate(show.date) && (
                        <Icon
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
                        />
                      )} */}
                    </HStack>
                    <Text fontSize="xs" color="black" mt={1}>
                      {displayLocationAddress(show.location)}
                    </Text>
                  </VStack>
                  <FormattedDate date={show.date} />
                </Flex>
              ))}
              <Center>
                <Pagination
                  currentPage={eventPagination.currentPage}
                  totalPages={eventPagination.totalPages || 0}
                  onPageChange={handlePageChange}
                />
              </Center>
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default StandupDetailsPage;
