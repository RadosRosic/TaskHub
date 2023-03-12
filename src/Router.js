import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import Root from "./pages/Root";
import ErrorPage from "./pages/Error";

import EmployeesPage, {
  loader as employeesLoader,
} from "./pages/Employees/Employees";
import EmployeePage, {
  loader as employeeLoader,
} from "./pages/Employees/Employee";
import NewEmployeePage from "./pages/Employees/New";
import EditEmployeePage from "./pages/Employees/Edit";

import TaskPage, { loader as taskLoader } from "./pages/Tasks/Task";
import TasksPage, { loader as tasksLoader } from "./pages/Tasks/Tasks";
import NewTaskPage from "./pages/Tasks/New";
import EditTaskPage from "./pages/Tasks/Edit";

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
            loader: employeesLoader,
            action: taskHttpAction,
          },
          {
            id: "task",
            path: ":taskID",
            loader: taskLoader,
            children: [
              { index: true, element: <TaskPage /> },
              {
                id: "edit-task",
                path: "edit-task",
                element: <EditTaskPage />,
                action: taskHttpAction,
                loader: employeesLoader,
              },
            ],
          },
        ],
      },
      {
        id: "employees",
        path: "employees",
        loader: employeesLoader,
        children: [
          {
            index: true,
            element: <EmployeesPage />,
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
              { index: true, element: <EmployeePage /> },
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
