import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface TireDetailSectionProps {
  title: string;
  children: ReactNode;
}

const TireDetailSection = ({ title, children }: TireDetailSectionProps) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" gutterBottom sx={{ mb: 2, color: (theme) => theme.palette.text.primary }}>
      {title}
    </Typography>
    {children}
  </Box>
);

export default TireDetailSection; 