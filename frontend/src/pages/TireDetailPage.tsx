import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTireStore from "../store/tireStore";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TireDetailHeader from "../components/tireDetail/TireDetailHeader";
import TireDetailSection from "../components/tireDetail/TireDetailSection";
import TireDetailTable from "../components/tireDetail/TireDetailTable";
import TireNotFound from "../components/tireDetail/TireNotFound";

const TireDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { selectedTire, fetchTireById, isLoading, error, clearSelectedTire } =
    useTireStore();

  useEffect(() => {
    if (id) {
      fetchTireById(parseInt(id));
    }

    return () => {
      clearSelectedTire();
    };
  }, [id, fetchTireById, clearSelectedTire]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
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
                <ErrorOutlineIcon
                  sx={{ fontSize: 64, color: "error.main", mb: 2 }}
                />
                <Typography variant="h5" component="h1" gutterBottom>
                  Error loading tire details
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {error}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleGoBack}
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
  }

  if (!selectedTire) {
    return <TireNotFound onBack={handleGoBack} />;
  }

  const formatTireSize = () => {
    const { width, height, rim } = selectedTire.tireSize;
    return `${width}-${height}-${rim}`;
  };

  const statusColorMap: Record<
    string,
    "success" | "warning" | "info" | "error" | "default"
  > = {
    INVENTORY: "success",
    ANALYSIS: "warning",
    INSTALLED: "info",
    DISPOSAL: "error",
  };

  const statusLabelMap: Record<string, string> = {
    INVENTORY: "In stock",
    ANALYSIS: "Under analysis",
    INSTALLED: "Installed",
    DISPOSAL: "Discarded",
  };

  const getStatusColor = () => statusColorMap[selectedTire.status] || "default";
  const getStatusLabel = () =>
    statusLabelMap[selectedTire.status] || selectedTire.status;

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        <TireDetailHeader
          make={selectedTire.make.name}
          model={selectedTire.model.name}
          statusLabel={getStatusLabel()}
          statusColor={getStatusColor()}
          isNew={!!selectedTire.newTire}
          onBack={handleGoBack}
        />
        <Paper
          sx={{
            p: 0,
            mb: 4,
            boxShadow: 3,
            bgcolor: (theme) => theme.palette.background.paper,
            borderRadius: 4,
          }}
          data-cy="tire-details"
        >
          <Box sx={{ p: 3 }}>
            <TireDetailSection title="Basic Information">
              <TireDetailTable
                rows={[
                  { label: "Manufacturer", value: selectedTire.make.name },
                  { label: "Model", value: selectedTire.model.name },
                  { label: "Size", value: formatTireSize() },
                  { label: "Status", value: getStatusLabel() },
                  {
                    label: "New Tire",
                    value: selectedTire.newTire ? "Yes" : "No",
                  },
                  {
                    label: "Retreads",
                    value: `${selectedTire.timesRetreaded}/${selectedTire.maxRetreadsExpected}`,
                  },
                  {
                    label: "Additional ID",
                    value: selectedTire.additionalId || "N/A",
                  },
                  {
                    label: "Company Group",
                    value: selectedTire.companyGroupName,
                  },
                  { label: "Branch", value: selectedTire.branchOfficeName },
                  {
                    label: "Current Life Cycle",
                    value: selectedTire.currentLifeCycle,
                  },
                  {
                    label: "Registration Date",
                    value: selectedTire.createdAt
                      ? new Date(selectedTire.createdAt).toLocaleDateString(
                          "en-US"
                        )
                      : "N/A",
                  },
                  {
                    label: "Serial Number",
                    value: selectedTire.serialNumber,
                  },
                  { label: "DOT", value: selectedTire.dot },
                ]}
              />
            </TireDetailSection>

            <TireDetailSection title="Tread Depth">
              <TireDetailTable
                rows={[
                  {
                    label: "Central Inner Depth",
                    value: selectedTire.middleInnerTreadDepth,
                  },
                  {
                    label: "Outer Depth",
                    value: selectedTire.outerTreadDepth,
                  },
                  {
                    label: "Central Outer Depth",
                    value: selectedTire.middleOuterTreadDepth,
                  },
                  {
                    label: "Inner Depth",
                    value: selectedTire.innerTreadDepth,
                  },
                ]}
              />
            </TireDetailSection>

            {selectedTire.currentRetread && (
              <TireDetailSection title="Retread Information">
                <TireDetailTable
                  rows={[
                    {
                      label: "Manufacturer",
                      value: selectedTire.currentRetread.make.name,
                    },
                    {
                      label: "Model",
                      value: selectedTire.currentRetread.model.name,
                    },
                    {
                      label: "Cost",
                      value: new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(selectedTire.currentRetread.retreadCost),
                    },
                  ]}
                />
              </TireDetailSection>
            )}

            {selectedTire.analysis && (
              <TireDetailSection title="Analysis Information">
                <TireDetailTable
                  rows={[
                    {
                      label: "Retreader",
                      value: selectedTire.analysis.recapperName,
                    },
                    {
                      label: "Retreader ID",
                      value: selectedTire.analysis.recapperId,
                    },
                    {
                      label: "Pickup ID",
                      value: selectedTire.analysis.recapperPickUpId || "N/A",
                    },
                    {
                      label: "Reason",
                      value: selectedTire.analysis.reason || "N/A",
                    },
                  ]}
                />
              </TireDetailSection>
            )}

            <TireDetailSection title="Financial Information">
              <TireDetailTable
                rows={[
                  {
                    label: "Purchase Cost",
                    value: new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(selectedTire.purchaseCost),
                  },
                ]}
              />
            </TireDetailSection>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default TireDetailPage;
