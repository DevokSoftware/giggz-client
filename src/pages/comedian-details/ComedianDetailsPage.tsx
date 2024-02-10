// ComedianDetailsPage.js

import React from "react";
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
  Badge,
  Button,
  Center,
} from "@chakra-ui/react";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import classes from "../ComediansPage.module.scss";
import Pagination from "../../components/Pagination";
//todo create model for comedian
interface ComedianProps {
  name: string;
  description: string;
}
const ComedianDetailsPage = () => {
  const { comedianId } = useParams();
  const [showType, setShowType] = React.useState("future");
  const comedian = {
    id: 1,
    name: "Pedro Teixeira da Mota",
    description: "Uma descrição muito crazy.",
    image:
      "https://pbs.twimg.com/profile_images/1340074211545665544/Kyp4dDeg_400x400.jpg",
    social: {
      tiktok: "https://www.tiktok.com/@delmotta",
      youtube: "https://www.youtube.com/@PedroTeixeiraDaMota",
      instagram: "https://www.instagram.com/pedrotmota/",
    },
  };

  const theme = useTheme();

  interface Show {
    date: string;
    name: string;
    poster: string;
    location: {
      name: string;
      address: string;
    };
  }

  // Example show data
  const shows: Show[] = [
    {
      date: "10 de Outubro, 22:00h ",
      name: "Pata de Ganso",
      poster:
        "https://comunidadeculturaearte.com/wp-content/uploads/2023/09/Pedro-Teixeira-da-Mota-regressa-aos-palcos-com-espetaculo-22Pata-de-Ganso22.png",
      location: {
        name: "Lisboa Comedy Club",
        address: "Av. Duque de Loulé 3A, 1050-085 Lisboa",
      },
    },
    {
      date: "25 de Abril, 21:00h",
      name: "Pata de Ganso",
      poster:
        "https://comunidadeculturaearte.com/wp-content/uploads/2023/09/Pedro-Teixeira-da-Mota-regressa-aos-palcos-com-espetaculo-22Pata-de-Ganso22.png",
      location: {
        name: "Teatro Villaret",
        address: "Av. Fontes Pereira de Melo 30A, 1050-122 Lisboa",
      },
    },
    {
      date: "25 de Abril, 21:00h",
      name: "Pata de Ganso",
      poster:
        "https://comunidadeculturaearte.com/wp-content/uploads/2023/09/Pedro-Teixeira-da-Mota-regressa-aos-palcos-com-espetaculo-22Pata-de-Ganso22.png",
      location: {
        name: "Teatro Villaret",
        address: "Av. Fontes Pereira de Melo 30A, 1050-122 Lisboa",
      },
    },
  ];

  return (
    <Box maxW="1300px" mx="auto">
      <Box textAlign="center" p={4}>
        <Image
          className={classes.comedian_image}
          borderRadius="full"
          src={comedian.image}
          alt={`${comedian.name}'s image`}
          mx="auto"
          boxShadow="3px 3px 13px 2px rgb(0 128 0 / 20%)"
          border={`2px solid ${theme.colors.green[600]}`}
          //   border={`3px solid ${theme.colors.white}`}
          boxSize={{
            base: "120px",
            sm: "120px",
            md: "150px",
            lg: "200px",
          }}
          objectFit="cover"
        />

        <Flex mt={1} mb={4} justify="center">
          {comedian.social && comedian.social.tiktok && (
            <IconButton
              as="a"
              href={comedian.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              icon={<FaTiktok />}
              variant="ghost"
              fontSize="20px"
              color="green.500"
              mr={1}
            />
          )}
          {comedian.social && comedian.social.youtube && (
            <IconButton
              as="a"
              href={comedian.social.youtube}
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
          {comedian.social && comedian.social.instagram && (
            <IconButton
              as="a"
              href={comedian.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              fontSize="20px"
              color="purple.500"
            />
          )}
        </Flex>
        <Heading size="md" color="green.600">
          {comedian.name}
        </Heading>
        <Text fontSize="md" color="green.500">
          {comedian.description}
        </Text>
      </Box>

      <VStack
        mt={2}
        spacing={4}
        align="stretch"
        mx="auto"
        maxW="800px"
        pl={3}
        pr={3}
      >
        <HStack mt={4} spacing={4} justify="start">
          <Button
            background={showType === "future" ? "green.500" : "white"}
            border={`2px solid ${theme.colors.green[400]}`}
            onClick={() => setShowType("future")}
            borderRadius="20px"
            size="sm"
            color={showType === "future" ? "white" : "green.500"}
            boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
          >
            Próximos eventos
          </Button>
          <Button
            background={showType === "past" ? "green.500" : "white"}
            border={`2px solid ${theme.colors.green[400]}`}
            onClick={() => setShowType("past")}
            borderRadius="20px"
            size="sm"
            color={showType === "past" ? "white" : "green.500"}
            boxShadow="2px 2px 6px 1px rgb(0 128 0 / 20%)"
          >
            Eventos passados
          </Button>
        </HStack>
        {shows.map((show, index) => (
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
                <Text
                  textAlign="left"
                  fontWeight="bold"
                  fontSize="md"
                  color="green.700"
                >
                  {show.name}
                </Text>
                <Text fontSize="xs" color="black" ml="auto">
                  {show.date}
                </Text>
              </HStack>
              <VStack alignItems="start" spacing={0} mt={2}>
                <Text fontSize="sm" color="black" fontWeight="bold">
                  {show.location.name}
                </Text>
                <Text fontSize="xs" color="black">
                  {show.location.address}
                </Text>
              </VStack>
            </VStack>
          </Flex>
        ))}
        <Center>
          <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
        </Center>
      </VStack>
    </Box>
  );
};

export default ComedianDetailsPage;
