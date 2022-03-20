import { FC, ReactElement } from "react";
import { Box, Link, Container, Toolbar } from "@mui/material";
import { routes } from "../routes";
import { NavLink } from "react-router-dom";

import SwapCallsIcon from "@mui/icons-material/SwapCalls";

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
        <Toolbar>
          <SwapCallsIcon sx={{ fontSize: 40 }} />
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
