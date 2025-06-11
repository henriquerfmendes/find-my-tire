import api from "./api";
import { Tire, TireListResponse } from "../types/tire";

export const getTires = async (
  params = new URLSearchParams()
): Promise<TireListResponse> => {
  try {
    const response = await api.get("/tires", { params });

    if (!response.data) {
      throw new Error("Invalid response format");
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const getTireById = async (id: number): Promise<Tire> => {
  try {
    const response = await api.get(`/tires/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching tire: ${error.message}`);
    }
    throw error;
  }
};
