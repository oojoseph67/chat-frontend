import axios from "axios";
import { BACKEND_URL } from "@/utils/index.utils";
import { apolloClient } from "@/utils/configs/apollo-client";
import { useMutation as useReactMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function useLogOutMutation() {
  const router = useRouter();

  return useReactMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${BACKEND_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      await apolloClient.clearStore();
      router.push("/login");

      return response.data;
    },
    onError: (error: any) => {
      throw error;
    },
  });
}
