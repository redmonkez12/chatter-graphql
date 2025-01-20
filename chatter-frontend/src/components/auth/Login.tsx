import { Link } from "react-router";
import { Link as MUILink } from "@mui/material";
import { Auth } from "./Auth";
import { useLogin } from "../../hooks/useLogin";

export function Login() {
  const { login, error } = useLogin();

  return (
    <Auth submitLabel="Login" onSubmit={(request) => login(request)} error={error ? "Credentials are not valid" : undefined}>
      <Link to="/signup" style={{ alignSelf: "center" }}>
        <MUILink>Signup</MUILink>
      </Link>
    </Auth>
  );
}
