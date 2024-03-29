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
} from "@chakra-ui/react";
import classes from "./ComediansPage.module.scss";
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

const ComediansPage = () => {
  const { isLoading, error, handleRequest } = useApi();

  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageable, setPageable] = useState<Pageable>({});
  const [filters, setFilters] = useState<ComediansGetFiltersParameter>({});
  const [comedians, setComedians] = useState<ComedianResponse[]>([]);
  const [filteredComedians, setFilteredComedians] = useState(comedians);

  useEffect(() => {
    const fetchComedians = async () => {
      try {
        const comediansResponse = await handleRequest(
          ComedianService.comediansGet(pageable, filters)
        );
        setComedians(comediansResponse?.content || []);
        setFilteredComedians(comediansResponse?.content || []);
      } catch (error) {
        // TODO handle this errors in a generic way
        console.error(error);
      }
    };
    fetchComedians();
  }, [handleRequest]); //TODO: it is being called twice. check if this useEffect is working properly

  const handleSearch = (searchTerm: string) => {
    const filtered = comedians.filter((comedian) =>
      comedian.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComedians(filtered);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Box mt={{ base: 2, sm: 3, md: 10, lg: 10 }}>
      <Box
        pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
        pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
        maxW="1300px"
        mx="auto"
      >
        <>
          <SearchBox onSearch={handleSearch} />
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
              <SimpleGrid
                columns={{ base: 2, sm: 3, md: 3, lg: 4 }}
                spacing={4}
              >
                {filteredComedians.map((comedian) => (
                  <Box
                    key={comedian.id}
                    p={{ base: 3, lg: 4 }}
                    textAlign="center"
                  >
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
                        src={"data:image/jpeg;base64," + comedian.picture}
                        alt={comedian.name}
                        mx="auto"
                        objectFit="cover"
                        cursor="pointer"
                      />
                    </RouteLink>
                    <Heading
                      fontSize="sm"
                      color="green.700"
                      mt={{ base: 1, lg: 2 }}
                    >
                      {comedian.name}
                    </Heading>
                  </Box>
                ))}
              </SimpleGrid>
            </>
          )}

          {/* <Center>
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={handlePageChange}
              />
            </Center> */}
        </>
      </Box>
    </Box>
  );
};

export default ComediansPage;
