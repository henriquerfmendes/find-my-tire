import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { getTires, getTireById } from "../services/tireService";
import api from "../services/api";

jest.mock("../services/api");

describe("TireService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getTires", () => {
    it("should call the API with the correct parameters", async () => {
      const mockResponse = {
        content: [],
        pageSize: 10,
        pageNumber: 0,
        totalElements: 0,
        totalPages: 0,
        numberOfElements: 0,
      };

      (api.get as jest.MockedFunction<typeof api.get>).mockResolvedValueOnce({
        data: mockResponse,
      });

      const params = new URLSearchParams();
      params.append("status", "active");
      params.append("sort", "serialNumber,asc");

      await getTires(params);

      expect(api.get).toHaveBeenCalledWith("/tires", { params });
      expect(api.get).toHaveBeenCalledTimes(1);
    });

    it("should return the response data correctly", async () => {
      const mockResponse = {
        content: [
          { id: 1, serialNumber: "ABC123" },
          { id: 2, serialNumber: "DEF456" },
        ],
        pageSize: 10,
        pageNumber: 0,
        totalElements: 2,
        totalPages: 1,
        numberOfElements: 2,
      };

      (api.get as jest.MockedFunction<typeof api.get>).mockResolvedValueOnce({
        data: mockResponse,
      });

      const result = await getTires();

      expect(result).toEqual(mockResponse);
      expect(result.content).toHaveLength(2);
      expect(result.content[0].serialNumber).toBe("ABC123");
    });

    it("should throw an error when the response does not contain data", async () => {
      (api.get as jest.MockedFunction<typeof api.get>).mockResolvedValueOnce(
        {}
      );

      await expect(getTires()).rejects.toThrow("Invalid response format");
    });

    it("should propagate API errors with formatted message", async () => {
      (api.get as jest.MockedFunction<typeof api.get>).mockRejectedValueOnce(
        new Error("Network error")
      );

      await expect(getTires()).rejects.toThrow("Network error");
    });
  });

  describe("getTireById", () => {
    it("should call the API with the correct ID", async () => {
      (api.get as jest.MockedFunction<typeof api.get>).mockResolvedValueOnce({
        data: { id: 123, serialNumber: "ABC123" },
      });

      await getTireById(123);

      expect(api.get).toHaveBeenCalledWith("/tires/123");
      expect(api.get).toHaveBeenCalledTimes(1);
    });

    it("should return the tire data correctly", async () => {
      const mockTire = { id: 123, serialNumber: "ABC123" };

      (api.get as jest.MockedFunction<typeof api.get>).mockResolvedValueOnce({
        data: mockTire,
      });

      const result = await getTireById(123);

      expect(result).toEqual(mockTire);
      expect(result.id).toBe(123);
      expect(result.serialNumber).toBe("ABC123");
    });

    it("should format the error message correctly", async () => {
      (api.get as jest.MockedFunction<typeof api.get>).mockRejectedValueOnce(
        new Error("Not found")
      );

      await expect(getTireById(999)).rejects.toThrow(
        "Error fetching tire: Not found"
      );
    });
  });
});
