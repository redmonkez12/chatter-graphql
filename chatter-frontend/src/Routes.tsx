import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router";
import { Signup } from "./components/auth/Signup";
import { Login } from "./components/auth/Login";

export function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </ReactRoutes>
    </BrowserRouter>
  );
}
