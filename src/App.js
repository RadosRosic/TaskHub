import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import Root from "./pages/Root";
import EmployeesPage, { loader as employeesLoader } from "./pages/Employees";
import NewEmployeePage from "./pages/Employees/New";
import EditEmployeePage from "./pages/Employees/Edit";
import TasksPage, { loader as tasksLoader } from "./pages/Tasks";
import ErrorPage from "./pages/Error";

import { action as employeeHttpAction } from "./components/EmployeeForm";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Employee, { loader as employeeLoader } from "./pages/Employees/Employee";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "tasks",
        children: [
          { index: true, element: <TasksPage />, loader: tasksLoader },
          {
            path: ":taskID",
            children: [
              { index: true, elemet: <p>Task ID</p> },
              { path: "edit-task", element: <p>Edit Task</p> },
            ],
          },
        ],
      },
      {
        path: "employees",
        children: [
          {
            index: true,
            element: <EmployeesPage />,
            loader: employeesLoader,
          },
          {
            path: "new-employee",
            element: <NewEmployeePage />,
            action: employeeHttpAction,
          },
          {
            id: "employee",
            path: ":employeeID",
            loader: employeeLoader,

            children: [
              { index: true, element: <Employee /> },
              {
                path: "edit-employee",
                element: <EditEmployeePage />,
                action: employeeHttpAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
