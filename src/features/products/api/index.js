import { httpClient } from "../../shared/http-client";

export const getProducts = async () => {
  const response = await httpClient.get("/products");
  return response.data;
};

export const getProduct = async (id) => {
  const response = await httpClient.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await httpClient.post("/products", data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await httpClient.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await httpClient.delete(`/products/${id}`);
  return response.data;
};
