import React from "react";
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import moment from "moment";

interface FormattedDateProps {
  date?: string;
}

const FormattedDate = ({ date }: FormattedDateProps) => {
  const day = moment(date).format("DD");
  const month = moment(date).format("MMM").toUpperCase();
  const year = moment(date).format("YY");

  const isMobile = useBreakpointValue({ base: true, md: false });
  return !isMobile ? (
    <Box textAlign="center" maxW="80px">
      <Text
        bg="green.500"
        color="white"
        fontSize="xs"
        fontWeight="bold"
        paddingX={2}
        borderRadius="5px 5px 0 0"
      >
        {month + " " + year}
      </Text>
      <Text
        fontSize="2xl"
        color="black"
        fontWeight="bold"
        borderRadius="0 0 5px 5px"
        border="1px solid"
        borderColor="gray.200"
        paddingX={3}
        paddingY={1}
      >
        {day}
      </Text>
    </Box>
  ) : (
    <Box textAlign="center" maxW="60px">
      <Text
        bg="green.500"
        color="white"
        fontSize="xs"
        fontWeight="bold"
        paddingX={1}
        borderRadius="5px 5px 0 0"
      >
        {month + " " + year}
      </Text>
      <Text
        fontSize="sm"
        color="black"
        fontWeight="bold"
        borderRadius="0 0 5px 5px"
        border="1px solid"
        borderColor="gray.200"
        paddingX={1}
        paddingY={1}
      >
        {day}
      </Text>
    </Box>
  );
};

export default FormattedDate;
