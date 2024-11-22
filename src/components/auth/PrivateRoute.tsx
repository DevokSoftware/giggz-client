import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authUtils";

interface PrivateRouteProps {
  redirectPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectPath }) => {
  const { isAuthenticated } = useAuth();
  const [authStatus, setAuthStatus] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("accessToken");
      setAuthStatus(token !== null && token !== "");
    };

    checkAuthStatus();
  }, [isAuthenticated]);

  // If authStatus is null, we're still checking the authentication, so show a loading state
  if (authStatus === null) {
    return <div>Loading...</div>; // Or some kind of loading spinner
  }

  // If authenticated, render the Outlet, otherwise redirect
  return authStatus ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default PrivateRoute;
