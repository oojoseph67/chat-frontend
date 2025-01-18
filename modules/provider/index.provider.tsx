import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import ToastSnackbar from "../components/toast(snackbar)/toast-snackbat";

type QueryProviderProps = {
  children: ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps) {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 0 } },
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            console.log("query provider error: ", error);

            const errorMessage = mutation?.meta?.errorMessage as {
              title?: string;
              description: string;
            };

            setToastMessage(
              errorMessage
                ? `${errorMessage.description}: ${error.message}`
                : error.message
            );
            setToastType("error");
            setToastOpen(true);
          },
        }),
      })
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <ToastSnackbar
        type={toastType}
        message={toastMessage}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
}
