import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getTires, getTireById } from "../services/tireService";
import { Tire, TireFilters } from "../types/tire";
import {
  applyFiltersLocally,
  calculatePagination,
  haveFiltersChanged,
} from "../utils/filterUtils";
import { API_CONFIG, UI_CONFIG } from "../services/configService";

interface TireState {
  allTires: Tire[];
  displayTires: Tire[];
  selectedTire: Tire | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  displayPageSize: number;
  totalPages: number;
  filters: TireFilters;

  fetchTires: (page?: number, filters?: TireFilters) => Promise<void>;
  fetchTireById: (id: number) => Promise<void>;
  setFilters: (filters: TireFilters) => void;
  setPage: (page: number) => void;
  clearSelectedTire: () => void;
}

const useTireStore = create<TireState>()(
  persist(
    (set, get) => ({
      allTires: [],
      displayTires: [],
      selectedTire: null,
      isLoading: false,
      error: null,
      totalCount: 0,
      currentPage: 0,
      displayPageSize: UI_CONFIG.pageSize,
      totalPages: 0,
      filters: {},

      fetchTires: async (page: number = 0, newFilters?: TireFilters) => {
        set({ isLoading: true, error: null });
        try {
          const filtersToUse =
            newFilters !== undefined ? newFilters : get().filters;

          const filtersChanged = haveFiltersChanged(
            filtersToUse,
            get().filters
          );
          const needToFetchTires =
            filtersChanged || get().allTires.length === 0;

          if (!needToFetchTires) {
            const filteredTires = applyFiltersLocally(
              get().allTires,
              filtersToUse
            );
            const { displayTires, validPage, totalPages, totalCount } =
              calculatePagination(filteredTires, get().displayPageSize, page);

            set({
              displayTires,
              currentPage: validPage,
              totalPages,
              totalCount,
              isLoading: false,
              filters: filtersToUse,
            });
            return;
          }

          const params = new URLSearchParams();
          params.append("pageNumber", "0");
          params.append("pageSize", API_CONFIG.pageSize.toString());
          params.append("companyId", API_CONFIG.companyId.toString());
          params.append(
            "branchOfficesId",
            API_CONFIG.branchOfficeId.toString()
          );

          const response = await getTires(params);

          const filteredTires = applyFiltersLocally(
            response.content,
            filtersToUse
          );
          const { displayTires, validPage, totalPages, totalCount } =
            calculatePagination(filteredTires, get().displayPageSize, page);

          set({
            allTires: response.content,
            displayTires,
            totalCount,
            currentPage: validPage,
            totalPages,
            filters: filtersToUse,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching tires:", error);
          set({
            error:
              error instanceof Error
                ? error.message
                : "Unknown error fetching tires",
            isLoading: false,
            displayTires: [],
            allTires: [],
          });
        }
      },

      fetchTireById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const tire = await getTireById(id);
          if (!tire) {
            set({ selectedTire: null, error: null });
            return;
          }
          set({ selectedTire: tire, isLoading: false });
        } catch (error) {
          console.error("Error fetching tire details:", error);
          set({
            error:
              error instanceof Error
                ? error.message
                : "Unknown error fetching tire details",
            isLoading: false,
          });
        }
      },

      setFilters: (filters: TireFilters) => {
        get().fetchTires(0, filters);
      },

      setPage: (page: number) => {
        get().fetchTires(page);
        window.scrollTo(0, 0);
      },

      clearSelectedTire: () => {
        set({ selectedTire: null });
      },
    }),
    {
      name: "tire-store",
      partialize: (state) => ({
        filters: state.filters,
        currentPage: state.currentPage,
      }),
    }
  )
);

export const selectPaginationInfo = (state: TireState) => ({
  currentPage: state.currentPage,
  displayPageSize: state.displayPageSize,
  totalCount: state.totalCount,
  totalPages: state.totalPages,
});

export const selectLoadingState = (state: TireState) => ({
  isLoading: state.isLoading,
  error: state.error,
});

export const selectTireFilters = (state: TireState) => state.filters;

export default useTireStore;
