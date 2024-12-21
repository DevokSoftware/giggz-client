export interface QueryPagination {
  currentPage: number;
  totalPages?: number;
  numberOfResults?: number;
  trigger?: number; // trick to trigger the useEffect and reset pagination
}
