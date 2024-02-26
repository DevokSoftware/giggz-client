import React from "react";
import { Box, Button, ButtonGroup, Flex, useTheme } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalElements: number;
  pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalElements,
  pageSize,
}: PaginationProps) => {
  const theme = useTheme();

  const generatePageNumbers = () => {
    const visiblePages = 4;
    const totalVisiblePages = Math.min(visiblePages, totalPages);

    const pages = [];
    let startPage = Math.max(
      currentPage - Math.floor(totalVisiblePages / 2),
      1
    );
    let endPage = startPage + totalVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - totalVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  if (totalPages === 1) {
    return <></>;
  }

  return (
    <Box mt={4} mb={4} textAlign="center">
      <Flex alignItems="center">
        <ButtonGroup>
          {currentPage > 1 && (
            <>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                bgColor="white"
                color="green.600"
                border={`1px solid ${theme.colors.green[600]}`}
                _hover={{ bgColor: "green.700" }}
              >
                &lt;
              </Button>
            </>
          )}
          {generatePageNumbers().map((page) => (
            <Button
              key={page}
              bgColor={currentPage === page ? "green.600" : "white"}
              color={currentPage === page ? "white" : "green.600"}
              border={`1px solid ${theme.colors.green[600]}`}
              _hover={{ bgColor: "green.700", color: "white" }}
              cursor="pointer"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          {currentPage < totalPages && (
            <>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                border={`1px solid ${theme.colors.green[600]}`}
                bgColor="white"
                color="green.600"
                _hover={{ bgColor: "green.700" }}
              >
                &gt;
              </Button>
            </>
          )}
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Pagination;
