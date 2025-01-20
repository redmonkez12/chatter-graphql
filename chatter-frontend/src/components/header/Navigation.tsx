import { Box, Button } from "@mui/material";
import { Page } from "../../interfaces/page.interface";
import { useNavigate } from "react-router";

interface NavigationProps {
  pages: Page[];
}

const Navigation = ({ pages }: NavigationProps) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page.title}
          onClick={() => navigate(page.path)}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {page.title}
        </Button>
      ))}
    </Box>
  );
};

export default Navigation;
