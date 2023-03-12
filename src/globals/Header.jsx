import { NavLink } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, Toolbar, Box } from "@mui/material";
import HorizontalStack from "./layout/HorizontalStack";
import HamburgerMenu from "./HamburgerMenu";

import classes from "./Header.module.css";

const Header = () => {
  const matches650px = useMediaQuery("(min-width:650px)");
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <h1 className={classes["main-title"]}>TaskHub</h1>
          {matches650px && (
            <HorizontalStack>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Employees
              </NavLink>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Tasks
              </NavLink>
            </HorizontalStack>
          )}
        </Box>
        {!matches650px && <HamburgerMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
