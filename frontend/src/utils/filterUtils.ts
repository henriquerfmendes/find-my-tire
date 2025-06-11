import { Tire, TireFilters } from '../types/tire';

export const formatDisplayCount = (
  currentPage: number,
  pageSize: number,
  totalCount: number
): string => {
  const start = currentPage * pageSize + 1;
  const end = Math.min((currentPage + 1) * pageSize, totalCount);
  return `Showing ${start}-${end} of ${totalCount} tires`;
};

export const applyFiltersLocally = (tires: Tire[], filters: TireFilters): Tire[] => {
  if (!tires || tires.length === 0) {
    return [];
  }
  
  const hasFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== ''
  );
  
  if (!hasFilters) {
    return tires;
  }
  
  return tires.filter(tire => {
    if (filters.make && filters.make.trim() !== '') {
      const makeName = tire.make?.name?.toLowerCase() || '';
      if (!makeName.includes(filters.make.toLowerCase())) {
        return false;
      }
    }
    
    if (filters.model && filters.model.trim() !== '') {
      const modelName = tire.model?.name?.toLowerCase() || '';
      if (!modelName.includes(filters.model.toLowerCase())) {
        return false;
      }
    }
    
    if (filters.status && filters.status.trim() !== '') {
      if (tire.status !== filters.status) {
        return false;
      }
    }
    
    return true;
  });
};

export const calculatePagination = (
  filteredTires: Tire[],
  pageSize: number,
  requestedPage: number
) => {
  const totalPages = Math.ceil(filteredTires.length / pageSize);
  const validPage = requestedPage < totalPages ? requestedPage : 0;
  
  const startIndex = validPage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredTires.length);
  const displayTires = filteredTires.slice(startIndex, endIndex);
  
  return {
    displayTires,
    validPage,
    totalPages,
    totalCount: filteredTires.length
  };
};

export const haveFiltersChanged = (newFilters: TireFilters, currentFilters: TireFilters): boolean => {
  return Object.keys(newFilters).some(
    key => newFilters[key as keyof TireFilters] !== currentFilters[key as keyof TireFilters]
  );
}; 