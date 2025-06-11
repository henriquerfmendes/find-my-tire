import { useEffect, useState } from "react";
import useTireStore from "../store/tireStore";
import TireList from "../components/TireList";
import TireFilters from "../components/TireFilters";
import Pagination from "../components/Pagination";
import { Container, Box, Typography, Paper, Alert } from "@mui/material";
import { formatDisplayCount } from "../utils/filterUtils";

const TireListPage = () => {
  const {
    displayTires,
    fetchTires,
    setPage,
    setFilters,
    isLoading,
    error,
    totalCount,
    currentPage,
    displayPageSize,
    totalPages,
  } = useTireStore();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      fetchTires();
      setIsInitialized(true);
    }
  }, [fetchTires, isInitialized]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Box
      id="box-tirelistpage"
      sx={{
        bgcolor: (theme) => theme.palette.background.default,
        minHeight: "100vh",
        py: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box 
          sx={{ 
            color: (theme) => theme.palette.text.primary,
            padding: 3,
            borderRadius: 2,
            mb: 2
          }}
        >
          <Typography variant="h4" color="text.primary">Tire Catalog</Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper 
          sx={{ 
            backgroundColor: (theme) => theme.palette.background.paper,
            border: '1px solid #444',
            borderRadius: 2,
            mb: 3,
            p: 2
          }}
        >
          <TireFilters onApplyFilters={setFilters} isLoading={isLoading} />
        </Paper>

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {!isLoading &&
              totalCount > 0 &&
              formatDisplayCount(currentPage, displayPageSize, totalCount)}
          </Typography>
        </Box>

        <TireList tires={displayTires} isLoading={isLoading} />

        {totalPages > 1 && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TireListPage;
