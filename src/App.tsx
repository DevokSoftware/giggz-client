import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  extendTheme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import ComediansPage from "./pages/ComediansPage";
import Navbar from "./components/Navbar";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: "linear-gradient(to right, #f8fbff, #edf7ff)",
      },
    },
  },
});

export const App = () => (
  <div>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Navbar />
        <ComediansPage />
      </Box>
    </ChakraProvider>
  </div>
);
