interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}

export const usePagination = ({
  totalCount,
  pageSize,
  currentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const getDisplayRange = () => {
    const start = currentPage * pageSize + 1;
    const end = Math.min((currentPage + 1) * pageSize, totalCount);
    return { start, end };
  };

  return {
    totalPages,
    getDisplayRange,
  };
};
