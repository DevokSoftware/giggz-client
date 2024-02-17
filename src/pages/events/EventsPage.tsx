// ComediansListPage.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Image,
  useTheme,
  Center,
  Flex,
  VStack,
  HStack,
  Select,
} from "@chakra-ui/react";
import classes from "./EventsPage.module.scss";
import Pagination from "../../components/Pagination";
import SearchBox from "../../components/SearchBox";
import { Link as RouteLink } from "react-router-dom";
import {
  ComedianResponse,
  ComedianService,
  EventResponse,
  EventService,
} from "../../services/openapi";
import useApi from "../../services/useApi";
import moment from "moment";

const EventsPage = () => {
  const { isLoading, error, handleRequest } = useApi();

  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<EventResponse[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResponse = await handleRequest(EventService.eventsGet());
        setEvents(eventsResponse || []);
      } catch (error) {
        // TODO handle this errors in a generic way
        console.error(error);
      }
    };
    fetchEvents();
  }, [handleRequest]); //TODO: it is being called twice. check if this useEffect is working properly

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Box mt={{ base: 2, sm: 3, md: 10, lg: 20 }}>
      <Box
        pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
        pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
        maxW="1300px"
        mx="auto"
      >
        <Text color="black" fontSize="xs" mb={3}>
          TODO// adicionar filtros aqui
        </Text>
        {events?.map((event, index) => (
          <Flex
            key={index}
            p={2}
            boxShadow="0px 0px 9px 2px rgb(57 124 57 / 20%)"
            border="2px solid"
            borderColor="green.600"
            borderRadius="20px"
            cursor="pointer"
            className={classes.show_card}
            m={3}
          >
            <Image
              src={event.poster}
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
                  {event.name}
                </Text>
                {/* TODO - use moment to translate the date */}
                <Text fontSize="xs" color="black" ml="auto">
                  {moment(event.date)
                    .locale("pt-br")
                    .format("DD [de] MMMM, HH:mm[h]")}
                </Text>
              </HStack>
              <VStack alignItems="start" spacing={0} mt={2}>
                {/* TODO - add location as an Entity in BE */}
                <Text fontSize="sm" color="black" fontWeight="bold">
                  {event.location?.name}
                </Text>
                <Text fontSize="xs" color="black">
                  {event.location?.street +
                    " " +
                    event.location?.number +
                    ", " +
                    event.location?.city}
                </Text>
              </VStack>
              <Box mt={3}>
                {event.comedians?.map((comedian, index) => (
                  <HStack>
                    <Image
                      src={comedian.picture}
                      boxSize="20px"
                      objectFit="cover"
                      borderRadius="full"
                    />
                    <RouteLink to={`/comedians/${comedian.id}`}>
                      <Text fontSize="sm" color="green.600">
                        {comedian.name}
                      </Text>
                    </RouteLink>
                  </HStack>
                ))}
              </Box>
            </VStack>
          </Flex>
        ))}
      </Box>
      <Center>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={handlePageChange}
        />
      </Center>
    </Box>
  );
};

export default EventsPage;
