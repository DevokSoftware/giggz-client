import { AuthenticationService } from "../../services/openapi";
import useApi from "../../services/useApi";

export function useAuth() {
  const { error, isLoading, handleRequest } = useApi();

  // Function to check if the user is authenticated
  const isAuthenticated = async (): Promise<boolean> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return false;
    }

    try {
      await handleRequest(
        AuthenticationService.validateToken("Bearer " + token)
      ); // Use handleRequest for the API call
      return true; // Token is valid
    } catch (error) {
      localStorage.removeItem("accessToken"); // Token invalid, remove it
      localStorage.removeItem("refreshToken");
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return { isAuthenticated, handleLogout, isLoading, error };
}
