import { CustomGraphqlError } from "@/modules/types/index.types";

export function extractErrorMessage(error: CustomGraphqlError | null) {
  if (!error) return "";

  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const originalError =
      error.graphQLErrors[0].extensions?.originalError?.message ||
      error.graphQLErrors[0]?.message;

    if (Array.isArray(originalError)) {
      return originalError[0];
    } else {
      return originalError;
    }
  } else {
    const originalError = error.response?.data?.message;
    return originalError;
  }
}
