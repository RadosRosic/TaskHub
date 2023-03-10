import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import Root from "./pages/Root";
import EmployeesPage, { loader as employeesLoader } from "./pages/Employees";
import Employee, { loader as employeeLoader } from "./pages/Employees/Employee";
import NewEmployeePage from "./pages/Employees/New";
import EditEmployeePage from "./pages/Employees/Edit";
import TasksPage, { loader as tasksLoader } from "./pages/Tasks/Tasks";
import NewTaskPage from "./pages/Tasks/New";
import EditTaskPage from "./pages/Tasks/Edit";
import ErrorPage from "./pages/Error";

import { action as taskHttpAction } from "./components/TaskForm";
import { action as employeeHttpAction } from "./components/EmployeeForm";

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
            path: "new-task",
            element: <NewTaskPage />,
            action: taskHttpAction,
          },
          {
            id: "task",
            path: ":taskID",
            children: [
              { index: true, element: <p>Task ID</p> },
              {
                path: "edit-task",
                element: <EditTaskPage />,
                action: taskHttpAction,
              },
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

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
