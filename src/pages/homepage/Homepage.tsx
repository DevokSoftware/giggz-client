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
  Spinner,
  Grid,
  GridItem,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";
import Pagination from "../../components/Pagination";
import SearchBox from "../../components/SearchBox";
import { Link as RouteLink } from "react-router-dom";
import {
  ComedianResponse,
  ComedianService,
  ComediansGetFiltersParameter,
  Pageable,
} from "../../services/openapi";
import useApi from "../../services/useApi";
import { ComedianServiceTemp } from "../../services/tempGenerated/ComedianServiceTemp";
import { QueryPagination } from "../../components/types/Types";
import { InputWithIcon } from "../../components/InputWithIcon";
import { PiVoicemail } from "react-icons/pi";
import { CiMail } from "react-icons/ci";

const Homepage = () => {
  const theme = useTheme();
  return (
    <Box mt={{ base: 2, sm: 3, md: 10, lg: 10 }}>
      {/* <Heading color="green.600">Giggz</Heading>
      <Heading color="green.600">a plataforma de comédia em Portugal.</Heading> */}
      {/* <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={4}
        mt="7"
      >
        <GridItem textAlign="center">
          <Text size="xl" color="green.600">
            Encontra os teus comediantes.
          </Text>
          <Image
            boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
            borderRadius="20px"
            border={`1px solid ${theme.colors.green[500]}`}
            src="/test.PNG"
            objectFit="cover"
            cursor="pointer"
            mx="auto"
            maxW="700px"
          />
        </GridItem>
      </Grid>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={4}
        mt="7"
      >
        <GridItem textAlign="center">
          <Text size="xl" color="green.600">
            Encontra todos os eventos de stand up a acontecer perto de ti.
          </Text>

          <Image
            boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
            borderRadius="20px"
            border={`1px solid ${theme.colors.green[500]}`}
            src="/test2.PNG"
            objectFit="cover"
            cursor="pointer"
            mx="auto"
            maxW="700px"
          />
        </GridItem>
      </Grid> */}

      <Text size="xl" color="green.600">
        Encontra os teus comediantes.
      </Text>

      <Text size="md" color="green.600" mt={10}>
        Giggz, a plataforma de comédia em Portugal.
      </Text>
      <Text size="md" color="green.600">
        Brevemente..
      </Text>

      <Box mx="auto" maxW={{ base: "300px", md: "500px" }} mt={5}>
        <InputWithIcon
          icon={CiMail}
          onChange={() => {}}
          value=""
          placeholder="E-mail"
        />
      </Box>
      {/* <Image
        boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
        borderRadius="20px"
        border={`1px solid ${theme.colors.green[500]}`}
        src="/test.PNG"
        objectFit="cover"
        cursor="pointer"
        mx="auto"
        maxW="700px"
      /> */}
      {/* 
      <Text size="xl" color="green.600">
        Encontra todos os eventos de stand up a acontecer perto de ti.
      </Text>

      <Image
        boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
        borderRadius="20px"
        border={`1px solid ${theme.colors.green[500]}`}
        src="/test2.PNG"
        objectFit="cover"
        cursor="pointer"
        mx="auto"
        maxW="700px"
      /> */}
    </Box>
  );
};

export default Homepage;
