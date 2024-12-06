// Homepage.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  useTheme,
  Center,
  Flex,
  Stack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import classes from "./Homepage.module.scss";
import { useNavigate } from "react-router-dom";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";
import { FiPlayCircle } from "react-icons/fi";
import { EventResponse, EventService } from "../../services/openapi";
import useApi from "../../services/useApi";
import moment from "moment";

const Homepage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [events, setEvents] = useState<EventResponse[]>([]);
  const { isLoading, handleRequest } = useApi();

  const fetchEvents = async () => {
    try {
      const eventsResponse = await handleRequest(
        EventService.eventsTrendingGet()
      );
      setEvents(eventsResponse || []);
    } catch (error) {
      // TODO handle this errors in a generic way
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [handleRequest]);

  return (
    <>
      <Box
        pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
        pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
        mt={{ base: 1, sm: 2, md: 10, lg: 10 }}
        maxW="1200px"
        mx="auto"
      >
        {/* Hero Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          p={3}
          borderColor="green.600"
          borderRadius="20px"
        >
          <VStack align="center" spacing={4}>
            <Heading size="xl" color="green.500">
              Descobre a comédia como nunca antes
            </Heading>
            <Text
              fontSize="md"
              color="gray.600"
              textAlign={{ base: "justify", md: "center", lg: "center" }}
            >
              Encontra os teus comediantes favoritos, os seus próximos eventos e
              todo o seu conteúdo online num só lugar. Planeia a tua próxima
              noite de comédia hoje!
            </Text>
          </VStack>
        </Flex>

        {/* Features Section */}
        <Box mt={{ base: 2, sm: 2, md: 8, lg: 8 }}>
          {/* <Heading size="md" mb={4} textAlign="center" color="green.600">
            Algumas características:
          </Heading> */}
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing={5}
            pl={{ base: 3, sm: 5, md: 10, lg: 10 }}
            pr={{ base: 3, sm: 5, md: 10, lg: 10 }}
          >
            <Feature
              title="Comediantes"
              description="Explora os perfis dos teus comediantes favoritos com acesso rápido ao seu conteúdo."
              // icon="/comedians/pedroteixeiradamota.png"
              icon={FaPeopleGroup}
            />
            <Feature
              title="Conteúdo"
              description="Links diretos para podcasts, stand-up specials, patreon e vídeos no YouTube."
              // icon="/youtube_icon.png"
              icon={FiPlayCircle}
            />
            {/* <Feature
              title="Descobre novos comediantes"
              description="Aqui podes encontrar novos comediantes e começar a seguir o seu trabalho."
              icon="/magnifyingglass.avif"
            /> */}
            <Feature
              title="Pesquisar eventos"
              description="Encontra eventos numa localização, data ou comediante à tua escolha."
              // icon="/comedy.webp"
              icon={MdEvent}
            />
            {/* <Feature
              title="Stand-Up"
              description="Fica a par dos especiais de stand-up, as datas e localizações da tour."
              icon="/standup.jpg"
            />

            <Feature
              title="Novas funcionalidades em breve"
              description="Muitas outras funcionalidades serão lançadas em breve. Stay tuned!"
              icon="/comingsoon.jpeg"
            /> */}
          </SimpleGrid>

          {/* <HStack spacing={4} justifyContent="center" alignItems="center">
            <Button
              fontSize="sm"
              background="white"
              border={`1px solid ${theme.colors.green[500]}`}
              borderRadius="8px"
              boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
              color="green.500"
              pl="2"
              pr="2"
              _hover={{ background: "green.300" }}
              onClick={() => navigate("/comedians")}
            >
              Encontra Comediantes
            </Button>
            <Button
              fontSize="sm"
              background="white"
              border={`1px solid ${theme.colors.green[500]}`}
              borderRadius="8px"
              boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
              color="green.500"
              pl="2"
              pr="2"
              _hover={{ background: "green.300" }}
              onClick={() => navigate("/shows")}
            >
              Pesquisa Eventos
            </Button>
          </HStack> */}
        </Box>
        {/* Trending Section */}
        <Box mt={{ base: 8, sm: 8, md: 10, lg: 10 }} mb={3}>
          <Heading size="md" mb={4} textAlign="center" color="green.500">
            Eventos em destaque!
          </Heading>

          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="green.600"
              size="xl"
              mt={10}
            />
          ) : (
            <SimpleGrid
              columns={{ base: 1, md: 4 }}
              spacing={5}
              pl={{ base: 3, sm: 5, md: 10, lg: 10 }}
              pr={{ base: 3, sm: 5, md: 10, lg: 10 }}
            >
              {events?.map((event, index) => (
                <TrendingCard event={event} />
              ))}
            </SimpleGrid>
          )}
        </Box>

        {/* Footer */}
      </Box>
      {/* <Box bg="green.600" color="white" py={8} mt="5vh" textAlign="center">
        <Text fontSize="sm">© 2024 Giggz. All rights reserved.</Text>
        <Text fontSize="sm">“A day without laughter is a day wasted.”</Text>
      </Box> */}
    </>
  );
};

const Feature = ({ title, description, icon }: any) => (
  <VStack
    // bg="gray.50"
    p={4}
    boxShadow="0px 0px 9px 2px rgb(57 124 57 / 20%)"
    // border="1px solid"
    // borderColor="green.600"
    borderRadius="20px"
    className={classes.show_card}
    spacing={3}
    textAlign="center"
  >
    {/* <Image src={icon} alt={title} boxSize="80px" borderRadius="10px" /> */}
    <Icon as={icon} fontSize="5xl" padding="0" color="green.700" />
    <Heading size="md" color="green.700">
      {title}
    </Heading>
    <Text fontSize="sm" color="gray.600" textAlign="center">
      {description}
    </Text>
  </VStack>
);

const TrendingCard = ({ event }: { event: EventResponse }) => {
  const formatDate = (date?: string) => {
    const momentDate = moment(date);
    const currentYear = moment().year();
    const formattedDate = momentDate.format("D [de] MMMM"); // e.g., "22 de Janeiro"

    // Add year if it's not the current year
    return momentDate.year() !== currentYear
      ? `${formattedDate}, ${momentDate.year()}`
      : formattedDate;
  };

  return (
    <Flex
      direction="column"
      bg="white"
      overflow="hidden"
      align="center"
      textAlign="center"
      boxShadow="0px 0px 9px 2px rgb(57 124 57 / 20%)"
      // border="1px solid"
      // borderColor="green.600"
      borderRadius="10px"
      className={classes.show_card}
    >
      <Image
        src={
          event?.comedians
            ? `${process.env.PUBLIC_URL}/comedians/${event?.comedians[0].picture}.png`
            : ""
        }
        alt={"title"}
        objectFit="cover"
        w="100%"
        h="200px"
      />
      <Box p={4}>
        <Heading size="md" color="green.700" noOfLines={2}>
          {event.standup ? event.standup?.name : event.name}
        </Heading>
        <Text fontSize="sm" color="gray.600" mt={2}>
          {event.location?.city + ", " + formatDate(event.date)}
        </Text>
      </Box>
    </Flex>
  );
};
export default Homepage;
