import { Alert, AlertTitle } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Alert
      severity="error"
      icon={<ErrorOutlineIcon fontSize="inherit" />}
      sx={{
        mb: 3,
        borderRadius: 2,
        "& .MuiAlert-icon": {
          color: "error.main",
        },
        "& .MuiAlert-message": {
          color: "error.dark",
        },
      }}
    >
      <AlertTitle sx={{ fontWeight: "bold" }}>Erro</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorMessage;
