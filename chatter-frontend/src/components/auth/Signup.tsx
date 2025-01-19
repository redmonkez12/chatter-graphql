import { Link } from "react-router";
import { Link as MUILink } from "@mui/material";
import { Auth } from "./Auth";
import { useCreateUser } from "../../hooks/useCreateUser";

export function Signup() {
  const [createUser] = useCreateUser();

  return (
    <Auth
      submitLabel="Signup"
      onSubmit={async ({ email, password }) => {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password,
            },
          },
        });
      }}
    >
      <Link to="/login" style={{ alignSelf: "center " }}>
        <MUILink>Login</MUILink>
      </Link>
    </Auth>
  );
}
