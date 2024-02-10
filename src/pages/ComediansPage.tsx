// ComediansListPage.js
import React, { useState } from "react";
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
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";
import { Link as RouteLink } from "react-router-dom";

// Sample data for comedians with images
const comediansData = [
  {
    id: 1,
    name: "Pedro Teixeira da Mota",
    description: "A funny comedian.",
    image:
      "https://pbs.twimg.com/profile_images/1340074211545665544/Kyp4dDeg_400x400.jpg", // Example image, replace with actual image URL
  },
  {
    id: 2,
    name: "Vítor Sá",
    description: "A funny comedian.",
    image:
      "https://media.licdn.com/dms/image/C4D03AQF9w0POJ8CiHg/profile-displayphoto-shrink_800_800/0/1661855607791?e=2147483647&v=beta&t=Bksi6LhyyCVgQ9wc5K_fhYyUWKgdl1FuU30iO0EWz5g", // Example image, replace with actual image URL
  },
  {
    id: 3,
    name: "Ricardo Araújo Pereira",
    description: "A funny comedian.",
    image:
      "https://www.vip.pt/wp-content/uploads/2023/11/Destaque-VIP-2023-11-20T134409.896.jpg", // Example image, replace with actual image URL
  },
  {
    id: 4,
    name: "Bruno Nogueira",
    description: "A funny comedian.",
    image:
      "https://media.licdn.com/dms/image/C4D12AQFUhVRySsUkXQ/article-cover_image-shrink_720_1280/0/1590082795380?e=2147483647&v=beta&t=a5nbs9kFb8VKyRwyIfDqZAD8W_f8F4ypMW_B2F5p7FA", // Example image, replace with actual image URL
  },
  {
    id: 5,
    name: "João Pedro Pereira",
    description: "A funny comedian.",
    image:
      "https://bucket.ruc.pt/wp-content/uploads/2022/02/22110114/Captura-de-ecra%CC%83-2022-02-22-a%CC%80s-10.32.16.png", // Example image, replace with actual image URL
  },
  {
    id: 6,
    name: "André Pinheiro",
    description: "A funny comedian.",
    image:
      "https://www.festivalf.pt/util/imgLoader2.ashx?w=500&h=500&img=/upload_files/client_id_1/website_id_6/ArtistasHome/2022/Stand%20Up/Andre%20Pinheiro%20Festival%20F.png", // Example image, replace with actual image URL
  },
  {
    id: 7,
    name: "Salvador Martinha",
    description: "A funny comedian.",
    image:
      "https://m.media-amazon.com/images/M/MV5BNTUyMmI4MTgtYTg1Yi00YzJjLTg0YmEtZWI1ZDM1YmNjYTk4XkEyXkFqcGdeQXVyNjYzNDE4ODA@._V1_.jpg", // Example image, replace with actual image URL
  },
  {
    id: 8,
    name: "Carlos Coutinho Vilhena",
    description: "A funny comedian.",
    image: "https://ovilaverdense.b-cdn.net/2023/09/transferir-1.jpeg", // Example image, replace with actual image URL
  },
  {
    id: 9,
    name: "Diogo Batáguas",
    description: "A funny comedian.",
    image:
      "https://www.cm-almada.pt/sites/default/files/styles/image_main_news_events/public/2023-11/Falsos%20Lentos%20202308122929_0.jpg?h=fae764ac&itok=PdZkhUrQ", // Example image, replace with actual image URL
  },
  {
    id: 10,
    name: "Manuel Cardoso",
    description: "A funny comedian.",
    image:
      "https://comunidadeculturaearte.com/wp-content/uploads/2021/06/Manuel-Cardoso.png", // Example image, replace with actual image URL
  },
];

const ComediansPage = () => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  const [filteredComedians, setFilteredComedians] = useState(comediansData);

  const handleSearch = (searchTerm: string) => {
    // Implement your search logic here, for now, just filter by name
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
        <SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {filteredComedians.map((comedian) => (
            <Box key={comedian.id} p={4} textAlign="center">
              <RouteLink to={`/comedians/${comedian.id}`}>
                <Image
                  className={classes.comedian_image}
                  borderRadius="full"
                  // border={`2px solid ${theme.colors.green[600]}`}
                  border={`3px solid ${theme.colors.white}`}
                  boxSize={{
                    base: "90px",
                    sm: "90px",
                    md: "100px",
                    lg: "120px",
                  }}
                  src={comedian.image}
                  alt={comedian.name}
                  mx="auto"
                  mb={3}
                  objectFit="cover"
                  cursor="pointer"
                />
              </RouteLink>
              <Heading fontSize="md" color="green.600">
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
