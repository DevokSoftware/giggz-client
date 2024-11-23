// Homepage.js
import React from "react";
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
} from "@chakra-ui/react";
import classes from "./Homepage.module.scss";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <Box
        pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
        pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
        mt={{ base: 2, sm: 3, md: 4, lg: 4 }}
        maxW="1300px"
        mx="auto"
      >
        {/* Hero Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          p={3}
          mb={8}
          borderColor="green.600"
          borderRadius="20px"
        >
          <VStack align="center" spacing={4}>
            <Heading size="xl" color="green.500">
              Descobre a comédia como nunca antes
            </Heading>
            <Text fontSize="md" color="gray.600">
              Encontra os teus comediantes favoritos, os seus próximos eventos e
              todo o seu conteúdo online num só lugar. Planeia a tua próxima
              noite de comédia hoje!
            </Text>
            <HStack spacing={4}>
              <Button
                fontSize="sm"
                background="green.400"
                border={`2px solid ${theme.colors.green[500]}`}
                borderRadius="8px"
                boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
                color="white"
                pl="2"
                pr="2"
                _hover={{ background: "green.300" }}
                onClick={() => navigate("/comedians")}
              >
                Encontra Comediantes
              </Button>
              <Button
                fontSize="sm"
                background="green.400"
                border={`2px solid ${theme.colors.green[500]}`}
                borderRadius="8px"
                boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
                color="white"
                pl="2"
                pr="2"
                _hover={{ background: "green.300" }}
                onClick={() => navigate("/shows")}
              >
                Pesquisa Eventos
              </Button>
            </HStack>
          </VStack>
        </Flex>

        {/* Features Section */}
        <Box mt="5vh">
          {/* <Heading size="md" mb={4} textAlign="center" color="green.600">
            Algumas características:
          </Heading> */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} mb={10}>
            <Feature
              title="Comediantes"
              description="Explora os perfis dos teus comediantes favoritos com acesso rápido ao seu conteúdo."
              icon="/comedians/pedroteixeiradamota.png"
            />
            <Feature
              title="Conteúdo"
              description="Links diretos para podcasts, stand-up specials e vídeos no YouTube."
              icon="/youtube_icon.png"
            />
            <Feature
              title="Descobre novos comediantes"
              description="Aqui podes encontrar novos comediantes e começar a seguir o seu trabalho."
              icon="/magnifyingglass.avif"
            />
            <Feature
              title="Pesquisar eventos"
              description="Encontra eventos por localização, data ou comediante."
              icon="/comedy.webp"
            />
            <Feature
              title="Stand-Up"
              description="Fica a par dos especiais de stand-up, as datas e localizações da tour."
              icon="/standup.jpg"
            />

            <Feature
              title="Novas funcionalidades em breve"
              description="Muitas outras funcionalidades serão lançadas em breve. Stay tuned!"
              icon="/comingsoon.jpeg"
            />
          </SimpleGrid>
        </Box>
        {/* Trending Section */}
        <Box mt="5vh">
          <Heading size="md" mb={4} textAlign="center" color="green.600">
            Trending Now
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <TrendingCard
              title="Andre Pinheiro"
              description="Doubles - Freakshow - Dec 10th, Lisbon"
              image="/comedians/andrepinheiro.png"
            />
            <TrendingCard
              title="Joana Marques"
              description="Extremamente Desagradável ao vivo - Jan 18th, Lisbon"
              image="/comedians/joanamarques.png"
            />
            <TrendingCard
              title="Diogo Batáguas"
              description="Conteúdo do Batáguas - Mar 20th, Porto"
              image="/comedians/diogobataguas.png"
            />
          </SimpleGrid>
        </Box>
        {/* Footer */}
      </Box>
      <Box bg="green.600" color="white" py={8} mt="5vh" textAlign="center">
        <Text fontSize="sm">© 2024 Giggz. All rights reserved.</Text>
        <Text fontSize="sm">“A day without laughter is a day wasted.”</Text>
      </Box>
    </>
  );
};

const Feature = ({ title, description, icon }: any) => (
  <VStack
    bg="gray.50"
    p={6}
    boxShadow="0px 0px 9px 2px rgb(57 124 57 / 20%)"
    // border="1px solid"
    borderColor="green.600"
    borderRadius="20px"
    className={classes.show_card}
    spacing={4}
    textAlign="center"
  >
    <Image src={icon} alt={title} boxSize="80px" borderRadius="10px" />
    <Heading size="md" color="green.500">
      {title}
    </Heading>
    <Text fontSize="sm" color="gray.600">
      {description}
    </Text>
  </VStack>
);

const TrendingCard = ({ title, description, image }: any) => (
  <Flex
    direction="column"
    bg="white"
    overflow="hidden"
    align="center"
    textAlign="center"
    boxShadow="0px 0px 9px 2px rgb(57 124 57 / 20%)"
    border="1px solid"
    borderColor="green.600"
    borderRadius="20px"
    className={classes.show_card}
  >
    <Image src={image} alt={title} objectFit="cover" w="100%" h="200px" />
    <Box p={4}>
      <Heading size="md" color="green.500">
        {title}
      </Heading>
      <Text fontSize="sm" color="gray.600" mt={2}>
        {description}
      </Text>
    </Box>
  </Flex>
);

export default Homepage;
