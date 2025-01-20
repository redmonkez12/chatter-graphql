import { Button, Stack, TextField } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useGetMe } from "../../hooks/userGetMe";
import { useNavigate } from "react-router";

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: ReactNode;
  error?: string;
}

export const Auth = ({ submitLabel, onSubmit, children, error }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: { xs: "70%", md: "30%" },
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        error={!!error}
        helperText={error}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        error={!!error}
        helperText={error}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};
