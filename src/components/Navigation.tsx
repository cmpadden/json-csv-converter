import { FC, ReactElement } from "react";
import { Box, Link, Container, Toolbar, Typography } from "@mui/material";
import { routes } from "../routes";
import { NavLink } from "react-router-dom";

const Navigation: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        color: "white",
        backgroundColor: "primary.main",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            Apache Arrow File Converter
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              {routes.map(
                (page) =>
                  page.enabled && (
                    <Link
                      key={page.key}
                      component={NavLink}
                      to={page.path}
                      color="white"
                      underline="none"
                      variant="button"
                      sx={{ fontSize: "large", marginLeft: "1rem" }}
                    >
                      {page.title}
                    </Link>
                  )
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Navigation;
