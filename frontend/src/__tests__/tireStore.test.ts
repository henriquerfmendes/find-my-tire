import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { act } from "@testing-library/react";
import useTireStore from "../store/tireStore";
import { Tire, TireListResponse } from "../types/tire";

jest.mock("../services/tireService", () => ({
  getTires: jest.fn(),
  getTireById: jest.fn(),
}));

import { getTires, getTireById } from "../services/tireService";

const resetStore = () => {
  const { setState } = useTireStore;
  const initialState = {
    allTires: [],
    displayTires: [],
    selectedTire: null,
    isLoading: false,
    error: null,
    filters: {
      make: "",
      model: "",
      status: "",
      page: 1,
      limit: 10,
    },
    totalCount: 0,
    totalPages: 0,
    currentPage: 0,
  };

  act(() => {
    setState(initialState);
  });
};

describe("useTireStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useTireStore());

    expect(result.current.allTires).toEqual([]);
    expect(result.current.displayTires).toEqual([]);
    expect(result.current.selectedTire).toBe(null);
    expect(result.current.filters).toEqual({
      make: "",
      model: "",
      status: "",
      page: 1,
      limit: 10,
    });
  });

  it("should fetch tires successfully", async () => {
    const mockTires = {
      content: [
        { id: 1, serialNumber: "ABC123", make: { name: "Continental" } },
        { id: 2, serialNumber: "DEF456", make: { name: "Pirelli" } },
      ],
      pageSize: 10,
      pageNumber: 0,
      numberOfElements: 2,
      totalElements: 2,
      totalPages: 1,
    };

    (getTires as jest.MockedFunction<typeof getTires>).mockResolvedValue(
      mockTires as TireListResponse
    );

    const { result } = renderHook(() => useTireStore());

    await act(async () => {
      result.current.fetchTires();
    });

    expect(result.current.allTires).toEqual(mockTires.content);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(getTires).toHaveBeenCalledTimes(1);
  });

  it("should handle errors when fetching tires", async () => {
    const errorMessage = "Failed to load tires";
    (getTires as jest.MockedFunction<typeof getTires>).mockRejectedValue(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useTireStore());

    await act(async () => {
      result.current.fetchTires();
    });

    expect(result.current.allTires).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it("should fetch a specific tire by ID", async () => {
    const mockTire = {
      id: 1,
      serialNumber: "ABC123",
      make: { name: "Continental" },
      model: { name: "ContiPremium" },
      status: "INVENTORY",
    };

    (getTireById as jest.MockedFunction<typeof getTireById>).mockResolvedValue(
      mockTire as Tire
    );

    const { result } = renderHook(() => useTireStore());

    await act(async () => {
      result.current.fetchTireById(1);
    });

    expect(result.current.selectedTire).toEqual(mockTire);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(getTireById).toHaveBeenCalledWith(1);
  });

  it("should clear the selected tire", async () => {
    const { result } = renderHook(() => useTireStore());

    await act(async () => {
      useTireStore.setState({
        selectedTire: { id: 1, serialNumber: "ABC123" } as Tire,
      });
    });

    expect(result.current.selectedTire).not.toBe(null);

    await act(async () => {
      result.current.clearSelectedTire();
    });

    expect(result.current.selectedTire).toBe(null);
  });
});
