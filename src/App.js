import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import useFetch from "./hooks/fetch-data";

import HomePage from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import EmployeesPage from "./pages/Employees";
import TeamsPage from "./pages/Teams";

const projects = [
  { index: true, element: <ProjectsPage /> },
  { path: "new-project", element: <p>New Project</p> },
  {
    path: ":projectID",
    children: [
      { index: true, element: <p>Project ID</p> },
      { path: "edit-project", element: <p>Edit Project</p> },
    ],
  },
];

const employees = [
  { index: true, element: <EmployeesPage /> },
  {
    path: ":employeeID",
    children: [
      { index: true, element: <p>Employee ID</p> },
      { path: "edit-employee", element: <p>Edit Employee</p> },
    ],
  },
];

const teams = [
  { index: true, element: <TeamsPage /> },
  {
    path: ":teamID",
    children: [
      { index: true, element: <p>Team ID</p> },
      { path: "edit-team", element: <p>Edit Team</p> },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <p>Implement This</p>,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "projects",
        children: projects,
      },
      {
        path: "employees",
        children: employees,
      },
      {
        path: "teams",
        children: teams,
      },
    ],
  },
]);

function App() {
  const { setData } = useFetch();
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setData("employees", setEmployees);
    setData("tasks", setTasks);
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
