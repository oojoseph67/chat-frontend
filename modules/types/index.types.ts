import { ErrorResponse } from "@apollo/client/link/error";

export type CustomGraphqlError = ErrorResponse & {
  graphQLErrors?: ReadonlyArray<{
    message: string;
    extensions?: {
      originalError?: {
        message: string;
        statusCode: string;
      };
    };
  }>;
  response?: {
    data?: {
      message?: string;
    };
  };
};
