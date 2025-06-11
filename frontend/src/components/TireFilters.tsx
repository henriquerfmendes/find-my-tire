import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Collapse,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import { TireFilters as TireFiltersType } from "../types/tire";

interface TireFiltersProps {
  onApplyFilters: (filters: TireFiltersType) => void;
  isLoading?: boolean;
}

const TireFilters = ({
  onApplyFilters,
  isLoading = false,
}: TireFiltersProps) => {
  const [filters, setFilters] = useState<TireFiltersType>({
    make: "",
    model: "",
    status: "",
  });
  const [expanded, setExpanded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isSubmitting) {
      setIsSubmitting(false);
    }
  }, [isLoading, isSubmitting]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFilters((prev) => ({
        ...prev,
        [name]: value as string | number | undefined,
      }));
    }
  };

  const handleApplyFilters = () => {
    setIsSubmitting(true);
    const nonEmptyFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          acc[key as keyof TireFiltersType] = value;
        }
        return acc;
      },
      {} as TireFiltersType
    );

    onApplyFilters(nonEmptyFilters);
  };

  const handleClear = () => {
    setFilters({
      make: "",
      model: "",
      status: "",
    });
    setIsSubmitting(true);
    onApplyFilters({});
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          mb: expanded ? 2 : 0,
          border: 0,
        }}
        onClick={toggleExpanded}
      >
        <Typography
          variant="h6"
          color="secondary.main"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <FilterListIcon sx={{ mr: 1 }} />
          Filters
        </Typography>
        <IconButton size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Manufacturer"
              name="make"
              value={filters.make || ""}
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
              size="small"
              disabled={isLoading || isSubmitting}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#444",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "text.primary",
                },
              }}
              data-cy="filter-make"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label="Model"
              name="model"
              value={filters.model || ""}
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
              size="small"
              disabled={isLoading || isSubmitting}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#444",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "text.primary",
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl
              fullWidth
              size="small"
              disabled={isLoading || isSubmitting}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#444",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "text.primary",
                },
              }}
            >
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                name="status"
                value={filters.status || ""}
                label="Status"
                onChange={handleChange}
                data-cy="filter-status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="INVENTORY">In stock</MenuItem>
                <MenuItem value="ANALYSIS">Under analysis</MenuItem>
                <MenuItem value="INSTALLED">Installed</MenuItem>
                <MenuItem value="DISPOSAL">Discarded</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleClear}
                startIcon={<ClearIcon />}
                color="primary"
                disabled={isLoading || isSubmitting}
                data-cy="clear-filters-button"
              >
                Clear
              </Button>
              <Button
                variant="contained"
                onClick={handleApplyFilters}
                startIcon={
                  isLoading || isSubmitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <FilterListIcon />
                  )
                }
                color="primary"
                disabled={isLoading || isSubmitting}
                data-cy="apply-filters-button"
              >
                {isLoading || isSubmitting ? "Applying..." : "Apply Filters"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

export default TireFilters;
