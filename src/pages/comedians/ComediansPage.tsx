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
import { ComedianServiceTemp } from "../../services/tempGenerated/ComedianServiceTemp";
import { QueryPagination } from "../../components/types/Types";

const ComediansPage = () => {
  const { isLoading, error, handleRequest } = useApi();

  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageable, setPageable] = useState<Pageable>({
    sort: ["name", "asc"],
    size: 16,
    page: 0,
  });
  const [filters, setFilters] = useState<ComediansGetFiltersParameter>({});
  const [comedians, setComedians] = useState<ComedianResponse[]>([]);
  const [comedianPagination, setComedianPagination] = useState<QueryPagination>(
    {
      currentPage: 1,
    }
  );

  const fetchComedians = async () => {
    try {
      const updatedPageable = {
        ...pageable,
        page: comedianPagination.currentPage - 1,
      };
      const comediansResponse = await handleRequest(
        ComedianServiceTemp.comediansGet(updatedPageable, filters)
      );
      setPageable(updatedPageable);
      setComedians(comediansResponse?.content || []);
      setComedianPagination({
        ...comedianPagination,
        numberOfResults: comediansResponse?.totalElements || 0,
        totalPages: comediansResponse?.totalPages || 0,
      });
    } catch (error) {
      // TODO handle this errors in a generic way
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComedians();
  }, [handleRequest, comedianPagination.currentPage, filters]); //TODO: it is being called twice. check if this useEffect is working properly

  const handleSearch = (searchTerm: string) => {
    setFilters({
      ...filters,
      name: searchTerm,
    });
  };

  const handlePageChange = (page: number) => {
    setComedianPagination({
      ...comedianPagination,
      currentPage: page,
    });
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
                columns={{ base: 2, sm: 2, md: 3, lg: 4 }}
                spacing={{ base: 3, lg: 4 }}
              >
                {comedians.map((comedian) => (
                  <Box
                    key={comedian.id}
                    p={{ base: 2, lg: 4 }}
                    textAlign="center"
                  >
                    <Box
                      boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
                      borderRadius="25px"
                      border={`3px solid ${theme.colors.white}`}
                      boxSize={{
                        base: "165px",
                        sm: "165px",
                        lg: "230px",
                      }}
                      transition="transform 0.3s ease-out"
                      _hover={{ transform: "scale(1.05)" }}
                      pb={3}
                    >
                      <RouteLink to={`/comedians/${comedian.id}`}>
                        <Image
                          className={classes.comedian_image}
                          // boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
                          borderRadius="25px"
                          // border={`3px solid ${theme.colors.white}`}
                          w="100%"
                          h="90%"
                          src={`${process.env.PUBLIC_URL}/comedians/${comedian.picture}.png`}
                          alt={comedian.name}
                          mx="auto"
                          objectFit="cover"
                          cursor="pointer"
                          borderBottomRadius="0"
                        />
                      </RouteLink>
                      <Heading
                        fontSize="sm"
                        color="gray.600"
                        // color="grey.500"
                        mt={{ base: 1, lg: 2 }}
                        noOfLines={1}
                      >
                        {comedian.name}
                      </Heading>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </>
          )}

          <Center>
            <Pagination
              currentPage={comedianPagination.currentPage}
              totalPages={comedianPagination.totalPages || 0}
              onPageChange={handlePageChange}
            />
          </Center>
        </>
      </Box>
    </Box>
  );
};

export default ComediansPage;
