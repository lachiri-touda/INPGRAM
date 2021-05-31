import AsyncStorage from "@react-native-community/async-storage";

// Setup config/headers and token
export const tokenConfig = () => {
  // Get token from localstorage
  const token = AsyncStorage.getItem("token");

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["auth-token"] = token;
  }

  return config;
};

export const isLogedIn = () => {
  return true;
};
