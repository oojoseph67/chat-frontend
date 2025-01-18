import { useState } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export interface ToastSnackbarProp {
  type: "success" | "error" | "info" | "warning";
  message: string;
  open: boolean;
  onClose: () => void;
}

export default function ToastSnackbar({
  type,
  message,
  open,
  onClose,
}: ToastSnackbarProp) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

// Example usage in any component
// const [isToastOpen, setIsToastOpen] = useState(false);

// // Show toast
// const showError = () => setIsToastOpen(true);

// // In your JSX
// <ToastSnackbar
//   type="error"
//   message="Something went wrong!"
//   open={isToastOpen}
//   onClose={() => setIsToastOpen(false)}
// />
