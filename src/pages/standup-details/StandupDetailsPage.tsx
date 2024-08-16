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
  Standup,
  StandupService,
} from "../../services/openapi";
import "moment/locale/pt-br";
import { EventServiceTemp } from "../../services/tempGenerated/EventServiceTemp";
import classes from "./StandupDetailsPage.module.scss";
import moment from "moment";
const StandupDetailsPage = () => {
  const { handleRequest } = useApi();

  const [standup, setStandup] = useState<Standup>();
  const [events, setEvents] = useState<EventResponse[]>([]);
  const fetchEvents = async () => {
    if (!standupId) {
      return;
    }
    try {
      console.log(parseInt(standupId, 10));
      const eventsResponse = await handleRequest(
        EventServiceTemp.eventsGet(
          {},
          {
            standupId: parseInt(standupId, 10),
          }
        )
      );
      setEvents(eventsResponse?.content || []);
    } catch (error) {
      // TODO handle this errors in a generic way
      console.error(error);
    }
  };

  const { standupId } = useParams();

  const theme = useTheme();

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
              border="2px solid"
              borderColor="green.600"
              borderRadius="20px"
              alignItems="center"
              cursor="pointer"
              className={classes.show_card}
            >
              <VStack alignItems="start" spacing={0} flex="1" ml={3}>
                <HStack justifyContent="space-between" w="100%">
                  <Text fontSize="sm" color="black" fontWeight="bold">
                    {show.location?.name}
                  </Text>
                  <Text fontSize="xs" color="black" ml="auto">
                    {moment(show.date)
                      .locale("pt-br")
                      .format("DD [de] MMMM, y")}
                  </Text>
                </HStack>
                <VStack alignItems="start" spacing={0} mt={2}>
                  <Text fontSize="xs" color="black">
                    {show.location?.street +
                      " " +
                      show.location?.number +
                      ", " +
                      show.location?.city}
                  </Text>
                </VStack>
              </VStack>
            </Flex>
          ))}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default StandupDetailsPage;
