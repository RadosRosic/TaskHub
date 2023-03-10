import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import EmployeesPage, { loader as employeeLoader } from "./pages/Employees";
import TasksPage, { loader as tasksLoader } from "./pages/Tasks";
import ErrorPage from "./pages/Error";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import EditEmployeePage from "./pages/EmployeeForm";
import NewEmployeePage from "./pages/EmployeeForm";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
            loader: employeeLoader,
          },
          {
            path: "new-employee",
            element: <NewEmployeePage />,
          },
          {
            path: ":employeeID",
            children: [
              { index: true, element: <p>Employee ID</p> },
              {
                path: "edit-employee",
                element: <EditEmployeePage />,
                action: () => {
                  console.log("xd");
                },
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
