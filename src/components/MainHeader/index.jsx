import { NavLink } from "react-router-dom";

import classes from "./styles.module.scss";

const Navigation = () => {
  return (
    <header className={classes["main-header"]}>
      <h1>TaskHub</h1>
      <nav className={classes["main-navigation"]}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to="/employees"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Employees
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Tasks
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Projects
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Teams
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
