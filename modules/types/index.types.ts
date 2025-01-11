export type CustomGraphqlError = Error & {
  graphQLErrors: Array<{
    extensions: {
      originalError: {
        error: string;
        message: string[];
      };
    };
    message: string;
  }>;
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
};
