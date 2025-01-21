import { Link } from "react-router";
import { Link as MUILink } from "@mui/material";
import { Auth } from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { extractErrorMessage } from "../../utils/errors";
import { useState } from "react";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/errors";
import { useLogin } from "../../hooks/useLogin";

export function Signup() {
  const [createUser] = useCreateUser();
  const [error, setError] = useState("");
  const { login } = useLogin();

  return (
    <Auth
      submitLabel="Signup"
      error={error}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });
          await login({ email, password });
          setError("");
        } catch (err) {
          const errorMessage = extractErrorMessage(err);
          if (errorMessage) {
            setError(errorMessage);
            return
          }

          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
    >
      <Link to="/login" style={{ alignSelf: "center " }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
}
