import { httpClient } from "../../shared/http-client";

export const getUsers = async () => {
  const response = await httpClient.get("/users");
  return response.data;
};

export const getUser = async (id) => {
  const response = await httpClient.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await httpClient.post("/users", data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await httpClient.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await httpClient.delete(`/users/${id}`);
  return response.data;
};
