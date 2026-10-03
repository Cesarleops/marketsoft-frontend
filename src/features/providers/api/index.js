import { httpClient } from "../../shared/http-client";

export const getProviders = async () => {
  try {
    const response = await httpClient.get("/providers");
    return response.data;
  } catch (error) {
    throw new Error("No se pudieron obtener los proveedores");
  }
};
