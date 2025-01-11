import { useSingleUserQuery } from "@/modules/graphql/queries";
import Login from "@/pages/login";
import { useRouter } from "next/router";
import { JSX, useEffect } from "react";

interface GuardProps {
  children: JSX.Element;
}

export const excludedRoutes = ["/login", "/signup"];

export default function Guard({ children }: GuardProps) {
  const router = useRouter();
  const { data: user, isFetched } = useSingleUserQuery();

  const pathname = router.pathname;

  useEffect(() => {}, [isFetched]);

  return (
    <>
      {" "}
      {excludedRoutes.includes(pathname) ? (
        children
      ) : !user ? (
        <Login />
      ) : (
        user && children
      )}
    </>
  );
}
