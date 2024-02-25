// SearchComponent.js
import React, { KeyboardEventHandler, useState } from "react";
import { Input, Button, Flex } from "@chakra-ui/react";

interface SearchProps {
  onSearch: (page: string) => void;
}

const SearchBox: React.FC<SearchProps> = ({ onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" mb={4} mt={3}>
      <Input
        size="sm"
        maxW="400px"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        borderColor="green.600"
        color="green.600"
        borderRadius="15px"
        placeholder="Procurar comediante..."
        // Add following css in to a css class
        sx={{
          "&::placeholder": {
            color: "gray.400",
          },
        }}
        _hover={{ borderColor: "green.600" }}
        _focus={{ borderColor: "green.600", boxShadow: "none" }}
        onKeyDown={handleKeyPress}
      />
    </Flex>
  );
};

export default SearchBox;
