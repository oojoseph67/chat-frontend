import axios from "axios";
import { BACKEND_URL } from "@/utils/index.utils";
import { apolloClient } from "@/utils/configs/apollo-client";
import { useState } from "react";
import { useMutation as useReactMutation } from "@tanstack/react-query";

interface LoginInterface {
  email: string;
  password: string;
}

// export function useLoginMutation() {
//   //   const [login, { loading, error }] = useMutation<UserModel, LoginInterface>(
//   //     loginGQLMutation
//   //   );

//   //   return { login, loading, error };

//   const [error, setError] = useState();

//   const login = async (request: LoginInterface) => {
//     try {
//   const res = await axios.post(`${BACKEND_URL}/auth/login`, {
//     email: request.email,
//     password: request.password,
//   });

//   console.log({ res });
//   await apolloClient.refetchQueries({ include: "active" });
//     } catch (error: any) {
//       console.error(error);
//       setError(error);
//     }
//   };

//   return { login, error };
// }

export function useLoginMutation() {
  return useReactMutation({
    mutationFn: async ({ request }: { request: LoginInterface }) => {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, {
        email: request.email,
        password: request.password,
      });

      await apolloClient.refetchQueries({ include: "active" });
    },
    onSuccess: (data, variables, context) => {
      // your success callback here
    },
    onError: (error, variables, context) => {
      // your error callback here
    },
  });
}
