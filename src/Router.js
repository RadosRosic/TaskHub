import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./globals/pages/Home";
import Root from "./globals/pages/Root";
import ErrorPage from "./globals/pages/Error";

import EmployeesPage, {
  loader as employeesLoader,
} from "./employees/pages/Employees";
import EmployeePage, {
  loader as employeeLoader,
} from "./employees/pages/Employee";
import NewEmployeePage from "./employees/pages/New";
import EditEmployeePage from "./employees/pages/Edit";

import TaskPage, { loader as taskLoader } from "./tasks/pages/Task";
import TasksPage, { loader as tasksLoader } from "./tasks/pages/Tasks";
import NewTaskPage from "./tasks/pages/New";
import EditTaskPage from "./tasks/pages/Edit";

import { action as taskHttpAction } from "./tasks/components/TaskForm";
import { action as employeeHttpAction } from "./employees/components/EmployeeForm";

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
