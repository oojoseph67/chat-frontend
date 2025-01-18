import axios from "axios";
import { BACKEND_URL } from "@/utils/index.utils";
import { apolloClient } from "@/utils/configs/apollo-client";
import {
  useQueryClient,
  useMutation as useReactMutation,
} from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  return useReactMutation({
    mutationFn: async ({ request }: { request: LoginInterface }) => {
      const response = await axios.post(
        `${BACKEND_URL}/auth/login`,
        {
          email: request.email,
          password: request.password,
        },
        {
          withCredentials: true,
        }
      );

      await apolloClient.refetchQueries({ include: "active" });

      await queryClient.invalidateQueries({
        queryKey: ["single-user"],
      });

      return response.data;
    },
    meta: {
      errorMessage: {
        description: "Error logging user",
      },
    },
  });
}
