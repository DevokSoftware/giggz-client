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

import ComediansPage from "./pages/comedians/ComediansPage";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouteLink,
  Navigate,
  Outlet,
} from "react-router-dom";
import ComedianDetailsPage from "./pages/comedian-details/ComedianDetailsPage";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: "linear-gradient(to right, #f8fbff, #edf7ff)",
      },
    },
  },
});

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box textAlign="center" fontSize="xl">
          <Navbar />
          <Box pt={20}>
            <Routes>
              <Route path="/" element={<Navigate to="/comedians" />} />
              <Route path="/comedians" element={<Outlet />}>
                <Route path="" element={<ComediansPage />} />
                <Route
                  path="/comedians/:comedianId"
                  element={<ComedianDetailsPage />}
                />
              </Route>
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
};
