import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useFetch from "./hooks/fetch-data";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <p>Implement This</p>,
    children: [
      { index: true, element: <p>Home Page</p> },
      {
        path: "projects",
        children: [
          { index: true, element: <p>Projects Index</p> },
          { path: "new-project", element: <p>New Project</p> },
          {
            path: ":projectID",
            children: [
              { index: true, element: <p>Project ID</p> },
              { path: "edit-project", element: <p>Edit Project</p> },
            ],
          },
        ],
      },
      {
        path: "employees",
        children: [
          { index: true, element: <p>Employees Index</p> },
          {
            path: ":employeeID",
            children: [
              { index: true, element: <p>Employee ID</p> },
              { path: "edit-employee", element: <p>Edit Employee</p> },
            ],
          },
        ],
      },
      {
        path: "teams",
        children: [
          { index: true, element: <p>Teams Index</p> },
          {
            path: ":teamID",
            children: [
              { index: true, element: <p>Team ID</p> },
              { path: "edit-team", element: <p>Edit Team</p> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  const { makeRequest, transformData } = useFetch();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    transformData("employees", setEmployees);
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
