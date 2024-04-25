import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Image,
  useTheme,
  Center,
  Flex,
  VStack,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  Button,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import classes from "./EventsPage.module.scss";
import Pagination from "../../components/Pagination";
import SearchBox from "../../components/SearchBox";
import { Link as RouteLink } from "react-router-dom";
import {
  ComedianResponse,
  ComedianService,
  ComediansGetFiltersParameter,
  EventResponse,
  EventService,
  EventsGetFiltersParameter,
  Pageable,
} from "../../services/openapi";
import useApi from "../../services/useApi";
import moment from "moment";
import {
  FaCalculator,
  FaLocationArrow,
  FaSearchLocation,
} from "react-icons/fa";
import { InputWithIcon } from "../../components/InputWithIcon";

import { IoCalendarNumberOutline, IoLocationOutline } from "react-icons/io5";
import { PiTextAaThin } from "react-icons/pi";
import { MdOutlinePerson } from "react-icons/md";
import { EventServiceTemp } from "../../services/tempGenerated/EventServiceTemp";
import { ComedianServiceTemp } from "../../services/tempGenerated/ComedianServiceTemp";
import { ChakraStylesConfig, OptionBase, Select } from "chakra-react-select";
import { debounce } from "lodash"; // Import debounce from lodash
import { RangeDatePicker } from "../../components/RangeDatePicker";
import { QueryPagination } from "../../components/types/Types";

interface ComedianOption extends OptionBase {
  label: string;
  value: number;
}

interface EventFilters {
  name?: string;
  comedian?: ComedianOption;
  city?: string;
  startDate: Date;
  endDate?: Date;
}

const EventsPage = () => {
  const { isLoading, handleRequest: eventsHandleRequest } = useApi();
  const { handleRequest: comediansHandleRequest } = useApi();
  const [pageable, setPageable] = useState<Pageable>({
    sort: ["date", "asc"],
    size: 12,
    page: 0,
  });
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [eventFilters, setEventFilters] = useState<EventFilters>({
    startDate: new Date(),
  });

  const [eventPagination, setEventPagination] = useState<QueryPagination>({
    currentPage: 1,
  });

  const [comedianNameSearch, setComedianNameSearch] = useState<string>("");
  const [comediansOptions, setComediansOptions] = useState<ComedianOption[]>();

  const fetchEvents = async () => {
    try {
      const filters: EventsGetFiltersParameter = {
        name: eventFilters?.name,
        city: eventFilters?.city,
        comedianId:
          eventFilters?.comedian?.value && eventFilters?.comedian?.value > 0
            ? eventFilters?.comedian?.value
            : undefined,
        dateFrom:
          eventFilters?.startDate != null
            ? eventFilters?.startDate.toISOString()
            : undefined,
        dateTo:
          eventFilters?.endDate != null
            ? eventFilters?.endDate.toISOString()
            : undefined,
      };

      const updatedPageable = {
        ...pageable,
        page: eventPagination.currentPage - 1,
      };
      const eventsResponse = await eventsHandleRequest(
        EventServiceTemp.eventsGet(updatedPageable, filters)
      );
      setPageable(updatedPageable);
      setEvents(eventsResponse?.content || []);
      setEventPagination({
        ...eventPagination,
        numberOfResults: eventsResponse?.totalElements || 0,
        totalPages: eventsResponse?.totalPages || 0,
      });
    } catch (error) {
      // TODO handle this errors in a generic way
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [eventsHandleRequest, eventPagination.currentPage]);

  // Debounce the function to wait for a pause in typing
  const fetchComediansDebounced = debounce(async () => {
    try {
      const comedianFilters: ComediansGetFiltersParameter = {
        name: comedianNameSearch,
      };
      const comediansResponse = await comediansHandleRequest(
        ComedianServiceTemp.comediansGet({}, comedianFilters)
      );
      const comediansOptions: ComedianOption[] = [];
      comediansOptions.push({ label: " ", value: -1 });
      comediansOptions.push(
        ...(comediansResponse?.content?.map((comedian: ComedianResponse) => ({
          label: comedian.name,
          value: comedian.id as unknown as number,
        })) || [])
      );

      setComediansOptions(comediansOptions);
    } catch (error) {
      console.error(error);
    }
  }, 2000); // Set the debounce delay (in milliseconds)

  useEffect(() => {
    fetchComediansDebounced();
    return () => {
      fetchComediansDebounced.cancel();
    };
  }, [comedianNameSearch]);

  const handlePageChange = (page: number) => {
    setEventPagination({
      ...eventPagination,
      currentPage: page,
    });
  };

  const chakraStyles: ChakraStylesConfig<ComedianOption> = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "sm",
      height: "30px",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "gray.400",
      fontSize: "sm",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "green.700",
      fontSize: "sm",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "green.700",
      fontSize: "sm",
      marginLeft: "25px",
    }),
    inputContainer: (provided, state) => ({
      ...provided,
      marginLeft: "25px",
    }),
  };

  const onChangeDate = (dates: any) => {
    const [start, end] = dates;
    setEventFilters((prevFilters) => ({
      ...prevFilters,
      startDate: start,
      endDate: end,
    }));
  };

  return (
    <Box mt={{ base: 2, sm: 3, md: 5, lg: 5 }}>
      <Box
        pl={{ base: 1, sm: 5, md: 10, lg: 20 }}
        pr={{ base: 1, sm: 5, md: 10, lg: 20 }}
        maxW="1000px"
        mx="auto"
      >
        <>
          <SimpleGrid
            spacing={3}
            ml={2}
            mr={2}
            columns={{ base: 2, sm: 3, md: 3, lg: 4 }}
          >
            <InputWithIcon
              icon={PiTextAaThin}
              onChange={(value) =>
                setEventFilters((prevFilters) => ({
                  ...prevFilters,
                  name: value,
                }))
              }
              value={eventFilters.name}
              placeholder="Nome"
            />
            <InputWithIcon
              icon={IoLocationOutline}
              onChange={(value) =>
                setEventFilters((prevFilters) => ({
                  ...prevFilters,
                  city: value,
                }))
              }
              value={eventFilters.city}
              placeholder="Cidade"
            />
            <InputGroup borderColor="green.600">
              <InputLeftElement>
                <MdOutlinePerson color="green" />
              </InputLeftElement>
              <Select<ComedianOption, false>
                name="colors"
                placeholder="Comediante"
                options={comediansOptions}
                onInputChange={(e) => setComedianNameSearch(e)}
                className={classes.selectComedian}
                useBasicStyles
                chakraStyles={chakraStyles}
                value={eventFilters.comedian}
                onChange={(value) =>
                  setEventFilters((prevFilters) => ({
                    ...prevFilters,
                    comedian: value || undefined,
                  }))
                }
              />
            </InputGroup>

            <InputGroup borderColor="green.600">
              <InputLeftElement>
                <IoCalendarNumberOutline color="green" />
              </InputLeftElement>
              <RangeDatePicker
                startDate={eventFilters.startDate}
                endDate={eventFilters.endDate}
                onChange={onChangeDate}
                placeholder="Data"
              />
            </InputGroup>
          </SimpleGrid>

          <HStack mt={3} justifyContent="end" mr={3}>
            <Button
              size="sm"
              background="white"
              border={`2px solid green`}
              borderRadius="10px"
              color="green.500"
              _selected={{ color: "white", background: "green.500" }}
              onClick={fetchEvents}
            >
              Pesquisar
            </Button>
          </HStack>

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
              <HStack mt={3} justifyContent="end" mr={3}>
                <Text fontSize="xs" color="gray.400">
                  {eventPagination.numberOfResults} resultados encontrados
                </Text>
              </HStack>
              {events?.length === 0 && (
                <Center>
                  <Text
                    textAlign="left"
                    fontWeight="bold"
                    fontSize="sm"
                    color="green.600"
                  >
                    Sem eventos
                  </Text>
                </Center>
              )}
              {events?.map((event, index) => (
                <Flex
                  key={index}
                  p={2}
                  boxShadow="0px 0px 9px 2px rgb(57 124 57 / 20%)"
                  border="2px solid"
                  borderColor="green.600"
                  borderRadius="20px"
                  cursor="pointer"
                  className={classes.show_card}
                  m={2}
                >
                  <Image
                    src={event.poster}
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
                        {event.name}
                      </Text>
                      {/* TODO - use moment to translate the date */}
                      <Text fontSize="xs" color="black" ml="auto">
                        {moment(event.date)
                          .locale("pt-br")
                          .format("DD [de] MMMM, y")}
                      </Text>
                    </HStack>
                    <VStack alignItems="start" spacing={0} mt={2}>
                      {/* TODO - add location as an Entity in BE */}
                      <Text fontSize="sm" color="black" fontWeight="bold">
                        {event.location?.name}
                      </Text>
                      <Text fontSize="xs" color="black">
                        {event.location?.street +
                          " " +
                          event.location?.number +
                          ", " +
                          event.location?.city}
                      </Text>
                    </VStack>
                    <Box mt={3}>
                      {event.comedians?.map((comedian, index) => (
                        <HStack>
                          <Image
                            src={comedian.picture}
                            boxSize="20px"
                            objectFit="cover"
                            borderRadius="full"
                          />
                          <RouteLink to={`/comedians/${comedian.id}`}>
                            <Text fontSize="sm" color="green.600">
                              {comedian.name}
                            </Text>
                          </RouteLink>
                        </HStack>
                      ))}
                    </Box>
                  </VStack>
                </Flex>
              ))}
            </>
          )}
          <Center>
            <Pagination
              currentPage={eventPagination.currentPage}
              totalPages={eventPagination.totalPages || 0}
              onPageChange={handlePageChange}
            />
          </Center>
        </>
      </Box>
    </Box>
  );
};

export default EventsPage;
