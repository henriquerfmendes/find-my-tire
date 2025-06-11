import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value - 1);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage + 1}
      onChange={handleChange}
      color="standard"
      showFirstButton
      showLastButton
      sx={{
        display: "flex",
        justifyContent: "center",
        '& .MuiPaginationItem-root': {
          color: 'text.primary',
        },
        '& .MuiPaginationItem-root.Mui-selected': {
          backgroundColor: '#444',
          color: 'white',
          '&:hover': {
            backgroundColor: '#232323',
          },
        },
      }}
    />
  );
};

export default Pagination;
