import { Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { useNavigate } from "react-router";

const MobileBranding = () => {
  const navigate = useNavigate();

  return (
    <>
      <ForumIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={() => navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          cursor: "pointer",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        CHATTER
      </Typography>
    </>
  );
};

export default MobileBranding;
