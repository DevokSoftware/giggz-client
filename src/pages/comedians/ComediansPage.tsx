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
} from "@chakra-ui/react";
import classes from "./ComediansPage.module.scss";
import Pagination from "../../components/Pagination";
import SearchBox from "../../components/SearchBox";
import { Link as RouteLink } from "react-router-dom";
import { comediansData } from "../../temp_data";
import { ComedianResponse, ComedianService } from "../../services/openapi";
import { Comedian } from "../../models/Comedian";
import useApi from "../../services/useApi";

const ComediansPage = () => {
  const { isLoading, error, handleRequest } = useApi();

  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredComedians, setFilteredComedians] = useState(comediansData);
  const [comedians, setComedians] = useState<ComedianResponse[]>([]);

  useEffect(() => {
    const fetchComedians = async () => {
      try {
        const comediansResponse = await handleRequest(
          ComedianService.comediansGet()
        );
        setComedians(comediansResponse || []);
      } catch (error) {
        // TODO handle this errors in a generic way
        console.error(error);
      }
    };
    fetchComedians();
  }, [handleRequest]); //TODO: it is being called twice. check if this useEffect is working properly

  const handleSearch = (searchTerm: string) => {
    const filtered = comediansData.filter((comedian) =>
      comedian.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComedians(filtered);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Box>
      <Box
        pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
        pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
        maxW="1300px"
        mx="auto"
      >
        <SearchBox onSearch={handleSearch} />
        <SimpleGrid columns={{ base: 2, sm: 3, md: 3, lg: 4 }} spacing={4}>
          {comedians.map((comedian) => (
            <Box key={comedian.id} p={{ base: 3, lg: 4 }} textAlign="center">
              <RouteLink to={`/comedians/${comedian.id}`}>
                <Image
                  className={classes.comedian_image}
                  boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
                  borderRadius="full"
                  border={`3px solid ${theme.colors.white}`}
                  boxSize={{
                    base: "90px",
                    sm: "100px",
                    lg: "130px",
                  }}
                  src={comedian.picture}
                  alt={comedian.name}
                  mx="auto"
                  objectFit="cover"
                  cursor="pointer"
                />
              </RouteLink>
              <Heading fontSize="sm" color="green.700" mt={{ base: 1, lg: 2 }}>
                {comedian.name}
              </Heading>
            </Box>
          ))}
        </SimpleGrid>
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

export default ComediansPage;
