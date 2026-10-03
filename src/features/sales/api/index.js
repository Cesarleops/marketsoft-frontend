import { httpClient } from "../../shared/http-client";

export const getSales= async () => {
  const response = await httpClient.get("/sales");
  return response.data;
};

export const getSale= async (id) => {
  const response = await httpClient.get(`/sales/${id}`);
  return response.data;
};

export const createSale = async (data) => {
  const response = await httpClient.post("/sales", data);
  return response.data;
};

export const updateSale = async (id, data) => {
  const response = await httpClient.put(`/sales/${id}`, data);
  return response.data;
};

export const deleteSale = async (id) => {
  const response = await httpClient.delete(`/sales/${id}`);
  return response.data;
};
