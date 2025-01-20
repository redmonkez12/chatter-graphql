import { Link } from "react-router";
import { Link as MUILink } from "@mui/material";
import { Auth } from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";
import { extractErrorMessage } from "../../utils/errors";
import { useState } from "react";

export function Signup() {
  const [createUser] = useCreateUser();
  const [error, setError] = useState("");

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
          setError("");
        } catch (err) {
          const errorMessage = extractErrorMessage(err);
          if (errorMessage) {
            setError(errorMessage);
            return
          }

          setError("Unknown error occurred");
        }
      }}
    >
      <Link to="/login" style={{ alignSelf: "center " }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
}
