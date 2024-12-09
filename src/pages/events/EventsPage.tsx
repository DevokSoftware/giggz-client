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
  Grid,
  GridItem,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import classes from "./EventsPage.module.scss";
import Pagination from "../../components/Pagination";
import SearchBox from "../../components/SearchBox";
import { Link as RouteLink } from "react-router-dom";
import {
  ComedianResponse,
  ComediansGetFiltersParameter,
  EventResponse,
  EventService,
  EventsGetFiltersParameter,
  Pageable,
} from "../../services/openapi";
import useApi from "../../services/useApi";

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
import FormattedDate from "../../components/FormattedDate";
import { displayLocationAddress, isPastDate } from "../../components/utils";

interface ComedianOption extends OptionBase {
  label: any;
  value: number;
  name: string;
}

interface EventFilters {
  name?: string;
  comedian?: ComedianOption;
  city?: string;
  startDate: Date;
  endDate?: Date;
}

const EventsPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isLoading, handleRequest: eventsHandleRequest } = useApi();
  const {
    isLoading: isLoadingWithToken,
    handleRequestWithToken: eventsHandleRequestWithToken,
  } = useApi();
  const { handleRequest: comediansHandleRequest } = useApi();
  const [pageable, setPageable] = useState<Pageable>({
    sort: ["date", "asc"],
    size: 5,
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
      const eventsResponse =
        localStorage.getItem("accessToken") != null
          ? await eventsHandleRequestWithToken(() =>
              EventServiceTemp.eventsGet(updatedPageable, filters)
            )
          : await eventsHandleRequest(
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
  }, [
    eventsHandleRequest,
    // eventsHandleRequestWithToken,
    eventPagination.currentPage,
  ]);

  // Debounce the function to wait for a pause in typing
  const fetchComediansDebounced = debounce(async () => {
    try {
      const comedianFilters: ComediansGetFiltersParameter = {
        name: comedianNameSearch,
      };
      console.log("111");
      const comediansResponse = await comediansHandleRequest(
        ComedianServiceTemp.comediansGet({}, comedianFilters)
      );
      console.log("2222");
      const comediansOptions: ComedianOption[] = [];
      comediansOptions.push({ label: " ", value: -1, name: "" });
      comediansOptions.push(
        ...(comediansResponse?.content?.map((comedian: ComedianResponse) => ({
          label: (
            <HStack>
              <Image
                className={classes.comedian_image}
                // boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
                borderRadius="25px"
                boxSize="25px"
                src={`${process.env.PUBLIC_URL}/comedians/${comedian.picture}.png`}
                alt={comedian.name}
                objectFit="cover"
                cursor="pointer"
              />
              <Text color="green.700" noOfLines={1} fontSize="xs">
                {comedian.name}
              </Text>
            </HStack>
          ),
          value: comedian.id as unknown as number,
          name: comedian.name,
        })) || [])
      );

      setComediansOptions(comediansOptions);
    } catch (error) {
      console.error(error);
    }
  }, 2000); // Set the debounce delay (in milliseconds)

  useEffect(() => {
    fetchComediansDebounced();
  }, [comediansHandleRequest]);

  // useEffect(() => {
  //   fetchComediansDebounced();
  //   return () => {
  //     fetchComediansDebounced.cancel();
  //   };
  // }, [comedianNameSearch]);

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
      height: "35px",
      noOfLines: 1,
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
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Set a high z-index to ensure it's on top
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

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      fetchEvents();
    }
  };

  const setAttendedEvent = async (event: EventResponse) => {
    await eventsHandleRequestWithToken(() =>
      EventService.eventsEventIdAttendedPost(parseInt(event.id, 10), {
        isAttended: !event.isAttendedByLoggedUser,
      })
    );
    fetchEvents();
  };

  const handleClick = (linkUrl?: string) => {
    if (!linkUrl) {
      return;
    }
    window.open(linkUrl, "_blank", "noopener,noreferrer");
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
              onKeyDown={handleKeyPress}
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
              onKeyDown={handleKeyPress}
            />
            <InputGroup borderColor="green.600">
              <InputLeftElement>
                <MdOutlinePerson color="green" />
              </InputLeftElement>
              <Select<ComedianOption, false>
                name="comedians"
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
                filterOption={(option, inputValue) =>
                  // Customize the search logic here
                  option.data.name
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
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

          {isLoading && isLoadingWithToken ? (
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
                  {eventPagination.numberOfResults === 1 ? (
                    <>1 resultado encontrado</>
                  ) : (
                    eventPagination.numberOfResults + " resultados encontrados"
                  )}
                </Text>
              </HStack>
              {events?.length === 0 && (
                <Center>
                  <Text
                    textAlign="left"
                    fontWeight="bold"
                    fontSize="md"
                    color="green.600"
                  >
                    Sem eventos
                  </Text>
                </Center>
              )}
              {events?.map((event, index) => (
                <Flex
                  key={index}
                  // boxShadow="0px 0px 9px 2px rgb(57 124 57 / 20%)"
                  boxShadow="0px 0px 5px 2px rgb(0 8 1 / 30%)"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="20px"
                  cursor="pointer"
                  className={classes.show_card}
                  mb={3}
                  mt={3}
                  ml={2}
                  mr={2}
                  h={{ base: "125px", sm: "130px" }}
                >
                  <HStack w="100px">
                    <Image
                      borderTopLeftRadius="18px"
                      borderBottomLeftRadius="18px"
                      src={event.standup ? event.standup.poster : event.poster}
                      objectFit="cover"
                      w="100%"
                      h="100%"
                      onClick={() => handleClick(event.url)}
                    />
                  </HStack>
                  <VStack alignItems="start" spacing={0} flex="1" ml={5} m={2}>
                    <HStack>
                      {event.standup ? (
                        <RouteLink to={`/standups/${event.standup?.id}`}>
                          <Text
                            textAlign="left"
                            fontWeight="bold"
                            fontSize="md"
                            color="green.700"
                            noOfLines={1}
                          >
                            {event.standup.name}
                          </Text>
                        </RouteLink>
                      ) : (
                        <Text
                          textAlign="left"
                          fontWeight="bold"
                          fontSize="md"
                          color="green.700"
                          noOfLines={1}
                        >
                          {event.name}
                        </Text>
                      )}
                      {/* {isPastDate(event.date) && (
                        <Icon
                          as={FaRegEye}
                          onClick={() => {
                            setAttendedEvent(event);
                          }}
                          color={
                            event.isAttendedByLoggedUser
                              ? "green.500"
                              : "gray.500"
                          }
                          fontSize="xl"
                          padding="0"
                          ml={1}
                        />
                      )} */}
                    </HStack>
                    <VStack alignItems="start" spacing={0} mt={2}>
                      <Text
                        fontSize="sm"
                        color="black"
                        fontWeight="bold"
                        noOfLines={1}
                        textAlign="left"
                      >
                        {event.location?.name}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="black"
                        textAlign="left"
                        noOfLines={1}
                      >
                        {displayLocationAddress(event.location)}
                      </Text>
                    </VStack>
                    {isMobile ? (
                      <HStack mt={3}>
                        {event.comedians?.map((comedian) => (
                          <RouteLink to={`/comedians/${comedian.id}`}>
                            <Image
                              src={`${process.env.PUBLIC_URL}/comedians/${comedian.picture}.png`}
                              boxSize="20px"
                              objectFit="cover"
                              borderRadius="full"
                            />
                          </RouteLink>
                        ))}
                      </HStack>
                    ) : (
                      <Flex mt={3}>
                        {event.comedians?.map((comedian) => (
                          <HStack mr={3}>
                            <Image
                              src={`${process.env.PUBLIC_URL}/comedians/${comedian.picture}.png`}
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
                      </Flex>
                    )}
                  </VStack>

                  <Box m={2}>
                    <FormattedDate date={event.date} />
                  </Box>
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
