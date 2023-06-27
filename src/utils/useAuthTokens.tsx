import { useState } from "react";

const useAuthTokens = () => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

    const saveTokens = (accessToken, refreshToken) => {
      console.log(accessToken+" "+refreshToken);
    setAccessToken(accessToken);
      setRefreshToken(refreshToken);
  };

  const getTokens = () => {
      return { accessToken, refreshToken };
      
  };

  return { saveTokens, getTokens };
};

export default useAuthTokens;