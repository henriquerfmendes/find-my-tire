import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface TireNotFoundProps {
  onBack: () => void;
  message?: string;
}

const TireNotFound = ({
  onBack,
  message = "The requested tire could not be found.",
}: TireNotFoundProps) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      p: 3,
    }}
  >
    <Container maxWidth="md">
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, md: 8, lg: 6 }}>
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <WarningAmberIcon sx={{ fontSize: 64, color: "warning.main", mb: 2 }} />
            <Typography variant="h5" component="h1" gutterBottom>
              Tire not found
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {message}
            </Typography>
            <Button
              variant="contained"
              onClick={onBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default TireNotFound; 