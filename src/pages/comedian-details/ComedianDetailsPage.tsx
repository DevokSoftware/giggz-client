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
} from "@chakra-ui/react";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import classes from "../ComediansPage.module.scss";
//todo create model for comedian
interface ComedianProps {
  name: string;
  description: string;
}
const ComedianDetailsPage = () => {
  const { comedianId } = useParams();
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
    place: string;
    city: string;
  }

  // Example show data
  const shows: Show[] = [
    {
      date: "2023-01-15",
      name: "Crazy Laughter Night",
      place: "Comedy Theater",
      city: "New York",
    },
    {
      date: "2023-03-22",
      name: "Laugh Fest",
      place: "Funny Hall",
      city: "Los Angeles",
    },
    // Add more shows as needed
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

        {/* Social Icons */}
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
        <Heading color="green.600">{comedian.name}</Heading>
        <Text color="green.500">{comedian.description}</Text>

        <Text color="gray.500" mt={20}>
          TODO - Add here cards with previous and future shows
        </Text>

        {/* <VStack
          mt={8}
          spacing={4}
          align="stretch"
          mx="auto"
          justifyContent="center"
        >
          {shows.map((show, index) => (
            <Box
              key={index}
              p={2} // Adjusted padding
              boxShadow="md"
              border="2px solid"
              borderColor="green.600"
              borderRadius="20px"
            >
              <HStack spacing={2}>
                <Badge colorScheme="green" fontSize="sm">
                  {show.date}
                </Badge>
                <Text fontWeight="bold" fontSize="md" color="green.600">
                  {show.name}
                </Text>
              </HStack>
              <Text fontSize="sm" color="green.500">
                {show.place}
              </Text>
              <Text fontSize="sm" color="green.500">
                {show.city}
              </Text>
            </Box>
          ))}
        </VStack> */}
      </Box>
    </Box>
  );
};

export default ComedianDetailsPage;
