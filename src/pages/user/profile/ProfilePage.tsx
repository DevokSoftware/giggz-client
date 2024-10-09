import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Text,
  Spinner,
  SimpleGrid,
  Heading,
  Image,
} from "@chakra-ui/react";
import useApi from "../../../services/useApi";
import { EventResponse, UserService } from "../../../services/openapi";
import moment from "moment";

const ProfilePage: React.FC = () => {
  const { isLoading, handleRequestWithToken, handleRequest } = useApi();
  const [events, setEvents] = useState<EventResponse[]>([]);

  useEffect(() => {
    const fetchStandup = async () => {
      try {
        const attendedEventsResponse = await handleRequestWithToken(() =>
          UserService.meEventsAttendedGet()
        );
        setEvents(attendedEventsResponse || []);
        // const standupResponse = await handleRequestWithToken(UserService.profileGet());
      } catch (error) {
        console.error(error);
      }
    };
    fetchStandup();
  }, [handleRequest]);

  return (
    <Box mt={{ base: 2, sm: 3, md: 10, lg: 10 }}>
      <Box
        pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
        pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
        maxW="1300px"
        mx="auto"
      >
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.600"
            size="xl"
          />
        ) : (
          <>
            <Text fontSize="md" color="green.700" textAlign="left">
              John Smith, este são os eventos em que marcaste presença!
            </Text>

            <SimpleGrid
              columns={{ base: 2, sm: 4, md: 5, lg: 6 }}
              spacing={4}
              mt={{ base: 2, sm: 3, md: 4, lg: 4 }}
            >
              {events.map((event) => (
                <Box key={event.id} p={{ base: 3, lg: 4 }} textAlign="center">
                  <Image
                    // className={classes.comedian_image}
                    boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
                    borderRadius="15px"
                    // border={`3px solid ${theme.colors.white}`}
                    boxSize={{
                      base: "90px",
                      sm: "100px",
                      lg: "130px",
                    }}
                    src={event.standup ? event.standup?.poster : event.poster}
                    alt={event.standup ? event.standup?.name : event.name}
                    mx="auto"
                    objectFit="cover"
                    cursor="pointer"
                  />
                  <Heading
                    fontSize="sm"
                    color="green.700"
                    mt={{ base: 1, lg: 2 }}
                  >
                    {event.standup ? event.standup?.name : event.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    {moment(event.date).format("DD/MMM/YYYY")}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
