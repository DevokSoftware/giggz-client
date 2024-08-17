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
  Image,
  SimpleGrid,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";

import useApi from "../../services/useApi";
import {
  EventResponse,
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
const StandupDetailsPage = () => {
  const theme = useTheme();
  const { handleRequest } = useApi();
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

      const eventsResponse = await handleRequest(
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
          const standupResponse = await handleRequest(
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
  }, [handleRequest]);

  useEffect(() => {
    fetchEvents();
  }, [eventPagination.currentPage]);

  if (standup == null) {
    return <></>;
  }

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={4}>
      <GridItem colSpan={{ base: 5, md: 2 }}>
        <Box mx="auto">
          <Box textAlign="center" p={4}>
            <Image
              // className={classes.comedian_image}
              borderRadius="20px"
              src={standup.poster}
              mx="auto"
              //modify this boxShadow
              boxShadow="3px 3px 13px 2px rgb(0 128 0 / 20%)"
              border={`1px solid ${theme.colors.green[600]}`}
              boxSize={{
                base: "120px",
                sm: "120px",
                md: "150px",
                lg: "200px",
              }}
              objectFit="cover"
            />

            <Heading size="md" color="green.700" mt={5}>
              {standup.name}
            </Heading>
            <Box maxW="400px" mx="auto" textAlign="left">
              <Text fontSize="xs" mt={3} color="green.600" textAlign="justify">
                {standup.description?.split("\n\n").map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: "1em" }}>
                    {paragraph}
                  </p>
                ))}
              </Text>
            </Box>
          </Box>
        </Box>
      </GridItem>

      <GridItem colSpan={{ base: 5, md: 3 }} padding={5}>
        <VStack spacing={4} align="stretch" maxW="700px">
          <Heading textAlign="left" size="md" color="green.600">
            Todas as datas:
          </Heading>
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
              boxShadow="0px 0px 9px 2px rgb(57 124 57 / 20%)"
              border="1px solid"
              borderColor="green.600"
              borderRadius="15px"
              alignItems="center"
              cursor="pointer"
              className={classes.show_card}
            >
              <VStack alignItems="start" spacing={0} flex="1" ml={3}>
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
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default StandupDetailsPage;
