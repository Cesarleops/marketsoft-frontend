import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getErrorMessage = (error, fallback) => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) return error.message;
  return fallback;
};
