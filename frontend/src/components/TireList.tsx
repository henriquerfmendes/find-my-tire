import { Tire } from "../types/tire";
import TireCard from "./TireCard";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

interface TireListProps {
  tires: Tire[];
  isLoading: boolean;
}

const TireList = ({ tires, isLoading }: TireListProps) => {
  if (isLoading && tires.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
        }}
      >
        <Box color="text.primary">
          <CircularProgress color="inherit" />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
          Loading tires...
        </Typography>
      </Box>
    );
  }

  if (tires.length === 0 && !isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
          backgroundColor: "background.default",
          borderRadius: 2,
        }}
      >
        <SentimentDissatisfiedIcon
          sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
        />
        <Typography variant="h6" color="text.secondary" align="center">
          No tires found
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Try adjusting the filters to find what you're looking for.
        </Typography>
      </Box>
    );
  }

  return (
    <Box data-cy="tire-list">
      {isLoading && tires.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Box color="text.primary">
            <CircularProgress color="inherit" size={40} />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Updating...
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {tires.map((tire) => (
          <Grid key={tire.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <TireCard tire={tire} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TireList;
