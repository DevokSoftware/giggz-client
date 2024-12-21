import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  useTheme,
  Flex,
  Spinner,
  useBreakpointValue,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import useApi from "../../services/useApi";
import { NewsContent, NewsService, Standup } from "../../services/openapi";
import { Link as RouteLink } from "react-router-dom";
const NewsPage = () => {
  const theme = useTheme();
  const { isLoading, handleRequest } = useApi();
  const [standups, setStandups] = useState<Standup[]>([]);
  const [youtubeContent, setYoutubeContent] = useState<NewsContent[]>([]);
  const [podcastsContent, setPodcastsContent] = useState<NewsContent[]>([]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const fetchNews = async () => {
    try {
      const newsResponse = await handleRequest(NewsService.newsGet());

      setStandups(newsResponse?.standups || []);
      //fillYoutubeThumbnail(newsResponse?.youtube);
      setYoutubeContent(newsResponse?.youtube || []);
      setPodcastsContent(newsResponse?.podcasts || []);
    } catch (error) {
      // TODO handle this errors in a generic way
      console.error(error);
    }
  };

  // TODO fetch youtube metadata in future
  // const fetchYouTubeThumbnail = async (youtubeUrl?: string) => {
  //   const oembedUrl = `https://www.youtube.com/oembed?url=${youtubeUrl}&format=json`;
  //   try {
  //     const response = await fetch(oembedUrl);
  //     if (!response.ok) {
  //       return "/youtube_icon.png";
  //     }
  //     const data = await response.json();
  //     console.log(1);
  //     return data.thumbnail_url;
  //   } catch (error) {
  //     console.error("Error fetching YouTube metadata:", error);
  //     throw error;
  //   }
  // };

  // async function fillYoutubeThumbnail(youtubeList?: ContentResponse[]) {
  //   if (!youtubeList) {
  //     setYoutubeContent([]);
  //     return;
  //   }

  //   const updatedList = await Promise.all(
  //     youtubeList.map(async (youtube) => {
  //       const thumbnailUrl = await fetchYouTubeThumbnail(youtube.url);
  //       return { ...youtube, url: thumbnailUrl };
  //     })
  //   );

  //   setYoutubeContent(updatedList);
  // }

  useEffect(() => {
    fetchNews();
  }, [handleRequest]);

  return (
    <Box
      mt={{ base: 2, sm: 3, md: 5, lg: 5 }}
      pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
      pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
      maxW="1300px"
      mx="auto"
    >
      <>
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
            <Text
              fontSize="md"
              color="black"
              textAlign="center"
              mt={{ base: 2, sm: 3, md: 4, lg: 4 }}
              ml={2}
              // textTransform="uppercase"
            >
              Os últimos standups anunciados...
            </Text>

            <SimpleGrid
              columns={{ base: 2, sm: 3, md: 3, lg: 5 }}
              mt={2}
              spacing={5}
              // borderTop={`1px solid ${theme.colors.gray[100]}`}
              // borderBottom={`1px solid ${theme.colors.gray[100]}`}
            >
              {standups.map((standup) => (
                <RouteLink to={`/comedians/${standup?.comedian?.id}`}>
                  <Box
                    key={standup.id}
                    textAlign="center"
                    p={{ base: 1, lg: 2 }}
                  >
                    <Image
                      // className={classes.comedian_image}
                      borderRadius="20px"
                      src={standup?.poster}
                      alt={standup?.name}
                      mx="auto"
                      boxShadow="0px 0px 5px 2px rgb(0 8 1 / 25%)"
                      border={`3px solid ${theme.colors.white}`}
                      boxSize={{
                        base: "110px",
                        sm: "110px",
                        md: "140px",
                        lg: "150px",
                      }}
                      // aspectRatio="2/3"
                      objectFit="cover"
                    />
                    <Text
                      fontSize="md"
                      color="green.700"
                      mt={{ base: 1, lg: 2 }}
                      noOfLines={1}
                    >
                      {standup?.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {standup?.comedian?.name}
                    </Text>
                  </Box>
                </RouteLink>
              ))}
            </SimpleGrid>

            <Text
              fontSize="md"
              color="black"
              mt={{ base: 6, sm: 6, md: 12, lg: 12 }}
              textAlign="center"
              ml={2}
            >
              ...novos conteúdos no Youtube...
            </Text>

            <SimpleGrid
              columns={{ base: 1, sm: 3, md: 3, lg: 5 }}
              // borderTop={`1px solid ${theme.colors.gray[100]}`}
              // borderBottom={`1px solid ${theme.colors.gray[100]}`}
            >
              {youtubeContent.map((youtube) => (
                <Link href={youtube.url} isExternal>
                  <Box key={youtube.id} textAlign="center" p={{ base: 1 }}>
                    {!isMobile ? (
                      <>
                        <Image
                          p={1}
                          boxSize={{
                            base: "80px",
                            sm: "80px",
                            md: "100px",
                            lg: "100px",
                          }}
                          src={"/youtube_icon.png"}
                          mx="auto"
                          cursor="pointer"
                        />
                        <Tooltip label={youtube.name} fontSize="sm">
                          <Text
                            fontSize="md"
                            color="green.700"
                            noOfLines={1}
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {youtube.name}
                          </Text>
                        </Tooltip>
                        <Text fontSize="sm" color="gray.500">
                          {youtube.comedians != null
                            ? youtube.comedians[0].name
                            : ""}
                        </Text>
                      </>
                    ) : (
                      <Flex>
                        <Image
                          p={1}
                          boxSize={{
                            base: "80px",
                            sm: "80px",
                            md: "100px",
                            lg: "100px",
                          }}
                          src={"/youtube_icon.png"}
                          mx="auto"
                          cursor="pointer"
                          flex="0 0 20%" // Image takes 20% of the row
                        />
                        <Flex
                          flex="1" // Takes the remaining space
                          direction="column" // Stacks text elements vertically
                          justifyContent="center" // Vertically centers the text
                          pl={4} // Adds spacing between the image and text
                        >
                          <Tooltip label={youtube.name} fontSize="sm">
                            <Text
                              fontSize="md"
                              color="green.700"
                              noOfLines={1}
                              overflow="hidden"
                              textOverflow="ellipsis"
                              textAlign="start"
                            >
                              {youtube.name}
                            </Text>
                          </Tooltip>
                          <Text
                            fontSize="sm"
                            color="gray.500"
                            textAlign="start"
                          >
                            {youtube.comedians != null
                              ? youtube.comedians[0].name
                              : ""}
                          </Text>
                        </Flex>
                      </Flex>
                    )}
                  </Box>
                </Link>
              ))}
            </SimpleGrid>

            <Text
              fontSize="md"
              color="black"
              textAlign="center"
              mt={{ base: 7, sm: 7, md: 14, lg: 14 }}
              ml={2}
            >
              ... e os mais recentes podcasts.
            </Text>

            <SimpleGrid
              columns={{ base: 1, sm: 3, md: 3, lg: 5 }}
              mt={2}
              mb={4}
              // borderTop={`1px solid ${theme.colors.gray[100]}`}
              // borderBottom={`1px solid ${theme.colors.gray[100]}`}
            >
              {podcastsContent.map((podcast) => (
                <Link href={podcast.url} isExternal>
                  <Box key={podcast.id} p={1} textAlign="center">
                    {!isMobile ? (
                      <>
                        <Image
                          p={1}
                          boxSize={{
                            base: "70px",
                            sm: "70px",
                            md: "90px",
                            lg: "90px",
                          }}
                          src={"/spotify_icon.png"}
                          mx="auto"
                          cursor="pointer"
                        />
                        <Tooltip label={podcast.name} fontSize="sm">
                          <Text
                            fontSize="md"
                            color="green.700"
                            mt={2}
                            noOfLines={1}
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {podcast.name}
                          </Text>
                        </Tooltip>
                        <Text fontSize="sm" color="gray.500">
                          {podcast.comedians != null
                            ? podcast.comedians[0].name
                            : ""}
                        </Text>
                      </>
                    ) : (
                      <Flex ml={1}>
                        <Image
                          p={1}
                          boxSize={{
                            base: "70px",
                            sm: "70px",
                            md: "90px",
                            lg: "90px",
                          }}
                          src={"/spotify_icon.png"}
                          mx="auto"
                          cursor="pointer"
                          flex="0 0 20%" // Image takes 20% of the row
                        />
                        <Flex
                          flex="1" // Takes the remaining space
                          direction="column" // Stacks text elements vertically
                          justifyContent="center" // Vertically centers the text
                          pl={4} // Adds spacing between the image and text
                        >
                          <Tooltip label={podcast.name} fontSize="sm">
                            <Text
                              fontSize="md"
                              color="green.700"
                              noOfLines={1}
                              overflow="hidden"
                              textOverflow="ellipsis"
                              textAlign="start"
                            >
                              {podcast.name}
                            </Text>
                          </Tooltip>
                          <Text
                            fontSize="sm"
                            color="gray.500"
                            textAlign="start"
                          >
                            {podcast.comedians != null
                              ? podcast.comedians[0].name
                              : ""}
                          </Text>
                        </Flex>
                      </Flex>
                    )}
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          </>
        )}
      </>
    </Box>
  );
};

export default NewsPage;
