import { useCallback, useState } from "react";
import {
  ApiError,
  AuthenticationService,
  OpenAPI,
  UserService,
} from "../services/openapi";
import { useNavigate } from "react-router-dom";

export function useApi() {
  const [error, setError] = useState<ApiError | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getAccessToken = () => localStorage.getItem("accessToken") || "";
  const getRefreshToken = () => localStorage.getItem("refreshToken") || "";
  const navigate = useNavigate();

  function handleLogout() {
    //TODO maybe redirect to login page
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }

  OpenAPI.BASE = process.env.REACT_APP_API_ENDPOINT as string;
  const handleRequest = useCallback(async function <T>(request: Promise<T>) {
    OpenAPI.TOKEN = "";
    setIsLoading(true);
    try {
      const response = await request;
      setError(undefined);
      return response;
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRequestWithToken = useCallback(async function <T>(
    request: () => Promise<T>
  ) {
    setIsLoading(true);
    try {
      OpenAPI.TOKEN = getAccessToken();
      const response = await request();
      setError(undefined);
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        // Check for token expiration (Unauthorized)
        // Try to refresh the token
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          try {
            OpenAPI.TOKEN = "";
            const token = await AuthenticationService.authRefreshPost({
              refreshToken,
            });
            if (token == null) {
              return;
              //TODO handleLogout();
            }
            localStorage.setItem("accessToken", token.accessToken);
            localStorage.setItem("refreshToken", token.refreshToken);
            OpenAPI.TOKEN = token.accessToken;
            const retryResponse = await request();
            setError(undefined);
            return retryResponse;
          } catch (refreshError) {
            console.log(refreshError);
            // Handle refresh token failure (e.g., log out the user)
            handleLogout();
          } finally {
            setIsLoading(false);
          }
        } else {
          // No refresh token available, log out the user
          handleLogout();
        }
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  },
  []);

  return { error, isLoading, handleRequest, handleRequestWithToken };
}

export default useApi;
