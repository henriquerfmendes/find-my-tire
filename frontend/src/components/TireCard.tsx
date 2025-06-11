import { Tire } from "../types/tire";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Grid,
  Button,
} from "@mui/material";

interface TireCardProps {
  tire: Tire;
}

const statusColorMap: Record<string, "success" | "warning" | "info" | "error" | "default"> = {
  INVENTORY: "success",
  ANALYSIS: "warning",
  INSTALLED: "success",
  DISPOSAL: "error",
};

const statusLabelMap: Record<string, string> = {
  INVENTORY: "In stock",
  ANALYSIS: "Under analysis",
  INSTALLED: "Installed",
  DISPOSAL: "Discarded",
};

const TireCard = ({ tire }: TireCardProps) => {
  const getStatusLabel = () => statusLabelMap[tire.status] || tire.status;

  const getStatusColor = () => statusColorMap[tire.status] || "default";

  const formatTireSize = () => {
    const { width, height, rim } = tire.tireSize;
    return `${width}/${height}-${rim}`;
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)",
          borderColor: "primary.main",
        },
      }}
      component={Link}
      to={`/tire/${tire.id}`}
      style={{ textDecoration: "none" }}
      data-cy="tire-card"
    >
      <CardHeader
        title={
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            {tire.serialNumber}
          </Typography>
        }
        action={
          <Chip
            label={getStatusLabel()}
            color={getStatusColor()}
            size="small"
            sx={{ fontWeight: "medium" }}
            data-cy="tire-status"
          />
        }
        sx={{
          background: (theme) => theme.palette.cardHeader,
          p: 1.5,
          pb: 1,
        }}
      />

      <CardContent sx={{ flexGrow: 1, pt: 2, bgcolor: "background.paper" }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Manufacturer
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "medium", color: "text.primary" }}
              data-cy="tire-make"
            >
              {tire.make.name}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Model
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "medium", color: "text.primary" }}
            >
              {tire.model.name}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Size
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "medium", color: "text.primary" }}
            >
              {formatTireSize()}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Retreads
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "medium", color: "text.primary" }}
            >
              {tire.timesRetreaded}/{tire.maxRetreadsExpected}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", p: 2, pt: 0 }}>
        <Button
          size="small"
          color="inherit"
          variant="contained"
        >
          View details
        </Button>
      </CardActions>
    </Card>
  );
};

export default TireCard;
