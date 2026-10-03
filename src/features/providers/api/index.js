import { httpClient } from "../../shared/http-client";

export const getProviders = async () => {
  const response = await httpClient.get("/providers");
  return response.data;
};

export const getProvider = async (id) => {
  const response = await httpClient.get(`/providers/${id}`);
  return response.data;
};

export const createProvider = async (data) => {
  const response = await httpClient.post("/providers", data);
  return response.data;
};

export const updateProvider = async (id, data) => {
  const response = await httpClient.put(`/providers/${id}`, data);
  return response.data;
};

export const deleteProvider = async (id) => {
  const response = await httpClient.delete(`/providers/${id}`);
  return response.data;
};
