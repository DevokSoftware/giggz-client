import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Text,
  Spinner,
  SimpleGrid,
  Heading,
  Image,
  Button,
  useTheme,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import useApi from "../../../services/useApi";
import {
  ComedianResponse,
  EventResponse,
  UserProfile,
  UserService,
} from "../../../services/openapi";
import moment from "moment";
import { Link as RouteLink } from "react-router-dom";

import classes from "./ProfilePage.module.scss";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { handleRequestWithToken } = useApi();
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [favoriteComedians, setFavoriteComedians] = useState<
    ComedianResponse[]
  >([]);
  const [profile, setProfile] = useState<UserProfile>();
  const [isEventsLoading, setIsEventsLoading] = useState(false);
  const [isComediansLoading, setIsComediansLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const theme = useTheme();
  const fetchAttendedEvents = async () => {
    try {
      setIsEventsLoading(true);
      const attendedEventsResponse = await handleRequestWithToken(() =>
        UserService.meEventsAttendedGet()
      );
      setEvents(attendedEventsResponse || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEventsLoading(false);
    }
  };
  const fetchFavoriteComedians = async () => {
    try {
      setIsComediansLoading(true);
      const favoriteComediansResponse = await handleRequestWithToken(() =>
        UserService.meComediansFavoritesGet()
      );
      setFavoriteComedians(favoriteComediansResponse || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsComediansLoading(false);
    }
  };
  const fetchProfile = async () => {
    try {
      setIsProfileLoading(true);
      const profileResponse = await handleRequestWithToken(() =>
        UserService.meProfileGet()
      );
      setProfile(profileResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendedEvents();
    fetchFavoriteComedians();
    fetchProfile();
  }, [handleRequestWithToken]);

  const isLoading = isEventsLoading || isComediansLoading || isProfileLoading;

  return (
    <Box
      mt={{ base: 2, sm: 3, md: 5, lg: 5 }}
      pl={{ base: 4, sm: 5, md: 10, lg: 20 }}
      pr={{ base: 4, sm: 5, md: 10, lg: 20 }}
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
          <>
            <Text
              fontSize="md"
              color="black"
              textAlign="center"
              mt={{ base: 2, sm: 3, md: 4, lg: 4 }}
              // textTransform="uppercase"
            >
              Comediantes Favoritos
            </Text>
            {favoriteComedians.length === 0 ? (
              <Box textAlign="center">
                <Button
                  fontSize="sm"
                  size="sm"
                  mt="3"
                  w="xs"
                  colorScheme="green"
                  value="Entrar"
                  onClick={() => {
                    navigate("/comedians");
                  }}
                >
                  Adicionar Comediantes
                </Button>
              </Box>
            ) : (
              <SimpleGrid
                mt={2}
                columns={{ base: 2, sm: 3, md: 3, lg: 5 }}
                spacing={2}
                // mt={4}
              >
                {favoriteComedians.map((comedian) => (
                  <RouteLink to={`/comedians/${comedian.id}`}>
                    <Box
                      key={comedian.id}
                      textAlign="center"
                      p={{ base: 1, lg: 2 }}
                    >
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
                          base: "110px",
                          sm: "110px",
                          md: "140px",
                          lg: "140px",
                        }}
                        objectFit="cover"
                      />
                      <Text
                        fontSize="md"
                        color="green.700"
                        mt={{ base: 1, lg: 2 }}
                        noOfLines={2}
                      >
                        {comedian.name}
                      </Text>
                    </Box>
                  </RouteLink>
                ))}
              </SimpleGrid>
            )}
            <Text
              fontSize="md"
              color="black"
              textAlign="center"
              mt={{ base: 4, sm: 4, md: 12, lg: 12 }}
              // textTransform="uppercase"
            >
              Eventos em que marcaste presença
            </Text>
            {events.length === 0 ? (
              <Box textAlign="center">
                <Button
                  mt="3"
                  w="xs"
                  fontSize="sm"
                  size="sm"
                  colorScheme="green"
                  value="Entrar"
                  onClick={() => {
                    navigate("/shows");
                  }}
                >
                  Registar Eventos
                </Button>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 2, sm: 3, md: 3, lg: 5 }} mt={2}>
                {events.map((event) => (
                  <RouteLink
                    to={
                      event.standup
                        ? `/standups/${event.standup.id}`
                        : `/comedians/${
                            event.comedians ? event.comedians[0].id : `/profile`
                          }`
                    }
                  >
                    <Box
                      key={event.id}
                      textAlign="center"
                      p={{ base: 1, lg: 2 }}
                      cursor="pointer"
                    >
                      <Image
                        // className={classes.comedian_image}
                        borderRadius="20px"
                        src={
                          event.standup ? event.standup?.poster : event.poster
                        }
                        alt={event.standup ? event.standup?.name : event.name}
                        mx="auto"
                        boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
                        border={`3px solid ${theme.colors.white}`}
                        boxSize={{
                          base: "110px",
                          sm: "110px",
                          md: "140px",
                          lg: "150px",
                        }}
                        // aspectRatio="2/3"
                        objectFit="cover"
                      />
                      <Text
                        fontSize="md"
                        color="green.700"
                        mt={{ base: 1, lg: 2 }}
                        noOfLines={1}
                      >
                        {event.standup ? event.standup?.name : event.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {moment(event.date).format("DD/MMM/YYYY")}
                      </Text>
                    </Box>
                  </RouteLink>
                ))}
              </SimpleGrid>
            )}
          </>
        </>
      )}
    </Box>
  );
};

export default ProfilePage;
