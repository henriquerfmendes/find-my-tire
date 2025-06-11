import { Box, Typography, Stack, Chip, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface TireDetailHeaderProps {
  make: string;
  model: string;
  statusLabel: string;
  statusColor: string;
  isNew: boolean;
  onBack: () => void;
}

const TireDetailHeader = ({
  make,
  model,
  statusLabel,
  statusColor,
  isNew,
  onBack,
}: TireDetailHeaderProps) => (
  <>
    <Button
      variant="contained"
      onClick={onBack}
      startIcon={<ArrowBackIcon />}
      sx={{ mb: 3, mt: 3 }}
      data-cy="back-button"
    >
      Back to list
    </Button>
    <Box
      sx={{
        mb: 0,
        p: 3,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        background: (theme) => theme.palette.cardHeader,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: (theme) => theme.palette.text.primary }}
      >
        {make} {model}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Chip
          label={statusLabel}
          color={
            statusColor as "success" | "warning" | "info" | "error" | "default"
          }
          size="small"
          sx={{ fontWeight: "medium" }}
        />
        {isNew && <Chip label="New" color="default" size="small" />}
      </Stack>
    </Box>
  </>
);

export default TireDetailHeader;
