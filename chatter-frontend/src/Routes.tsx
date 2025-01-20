import { Routes as ReactRoutes, Route } from "react-router";
import { Signup } from "./components/auth/Signup";
import { Login } from "./components/auth/Login";
import { Home } from "./components/home/Home";

export function Routes() {
  return (
    <ReactRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
    </ReactRoutes>
  );
}
