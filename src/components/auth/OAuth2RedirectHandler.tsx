import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OAuth2RedirectHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getUrlParameter = (name: string): string => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const accessToken = getUrlParameter("accessToken");
  const refreshToken = getUrlParameter("refreshToken");
  const error = getUrlParameter("error");

  React.useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      if (window.opener) {
        window.opener.location.href = "/profile";
      }
    }
    window.close();
  }, [accessToken, refreshToken, error]);

  return null; // This component does not render anything
};

export default OAuth2RedirectHandler;
