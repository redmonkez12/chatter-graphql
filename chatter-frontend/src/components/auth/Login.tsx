import { Link } from "react-router";
import { Link as MUILink } from "@mui/material";
import { Auth } from "./Auth";

export function Login() {
  return <Auth submitLabel="Login" onSubmit={async () => {}}>
        <Link to="/signup" style={{ alignSelf: "center" }}>
            <MUILink>Signup</MUILink> 
        </Link>
  </Auth>;
}
