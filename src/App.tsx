import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";

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
  Navigate,
  Outlet,
} from "react-router-dom";
import ComedianDetailsPage from "./pages/comedian-details/ComedianDetailsPage";
import EventsPage from "./pages/events/EventsPage";
import StandupDetailsPage from "./pages/standup-details/StandupDetailsPage";
import Homepage from "./pages/homepage/Homepage";
import OAuth2RedirectHandler from "./components/auth/OAuth2RedirectHandler";
import PrivateRoute from "./components/auth/PrivateRoute";
import ProfilePage from "./pages/user/profile/ProfilePage";
import LoginPage from "./pages/signup/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import NewsPage from "./pages/news/NewsPage";

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
              <Route
                path="/profile"
                element={<PrivateRoute redirectPath="/login" />}
              >
                <Route path="" element={<ProfilePage />} />
              </Route>

              <Route
                path="/oauth2/redirect"
                element={<OAuth2RedirectHandler />}
              ></Route>
              <Route path="/" element={<Navigate to="/homepage" />} />
              <Route path="*" element={<Navigate to="/homepage" />} />
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

              <Route path="/signup" element={<Outlet />}>
                <Route path="" element={<SignUpPage />} />
              </Route>
              <Route path="/login" element={<Outlet />}>
                <Route path="" element={<LoginPage />} />
              </Route>
              <Route path="/homepage" element={<Outlet />}>
                <Route path="" element={<Homepage />} />
              </Route>

              <Route path="/news" element={<Outlet />}>
                <Route path="" element={<NewsPage />} />
              </Route>
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
};
