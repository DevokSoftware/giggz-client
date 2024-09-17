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
  Container,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import ComediansPage from "./pages/comedians/ComediansPage";
import Navbar from "./components/Navbar";
import "@fontsource/open-sans";
import "@fontsource/raleway";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouteLink,
  Navigate,
  Outlet,
} from "react-router-dom";
import ComedianDetailsPage from "./pages/comedian-details/ComedianDetailsPage";
import EventsPage from "./pages/events/EventsPage";
import StandupDetailsPage from "./pages/standup-details/StandupDetailsPage";
import Homepage from "./pages/homepage/Homepage";

const theme = extendTheme({
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
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
              <Route path="/" element={<Outlet />}>
                <Route path="" element={<Homepage />} />
              </Route>
              <Route path="/comedians" element={<Outlet />}>
                <Route path="" element={<ComediansPage />} />
                <Route
                  path="/comedians/:comedianId"
                  element={<ComedianDetailsPage />}
                />
              </Route>
              <Route path="/standups" element={<Outlet />}>
                <Route
                  path="/standups/:standupId"
                  element={<StandupDetailsPage />}
                />
              </Route>
              <Route path="/shows" element={<Outlet />}>
                <Route path="" element={<EventsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/homepage" />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
};
