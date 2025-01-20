import { useEffect } from "react";
import { excludedRoutes } from "../../constants/excluded-routes";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { useGetMe } from "../../hooks/userGetMe";
import { useLocation } from "react-router";

interface GuardProps {
  children: JSX.Element;
}

export const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetMe();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }   
  }, [error]);

  return (
    <>
      {excludedRoutes.includes(location.pathname) ? children : user && children}
    </>
  );
};

