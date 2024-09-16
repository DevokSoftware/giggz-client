import { useCallback, useState } from "react";
import { ApiError, OpenAPI } from "../services/openapi";

export function useApi() {
  const [error, setError] = useState<ApiError | undefined>(undefined);
  const [isLoading, setIsloading] = useState<boolean>(true);

  //OpenAPI.BASE = process.env.REACT_APP_API_ENDPOINT as string;
  OpenAPI.BASE = "http://localhost:8080/api";
  const handleRequest = useCallback(async function <T>(request: Promise<T>) {
    setIsloading(true);
    try {
      const response = await request;
      setError(undefined);
      return response;
    } catch (error: any) {
      setError(error);
    } finally {
      setIsloading(false);
    }
  }, []);

  function dismissError() {
    setError(undefined);
  }

  return { dismissError, error, isLoading, handleRequest };
}

export default useApi;
