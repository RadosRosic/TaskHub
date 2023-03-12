import { json, useRouteLoaderData, useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

const Employee = () => {
  const data = useRouteLoaderData("employee");
  const navigate = useNavigate();
  const deleteEmployeeHandler = async (id) => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      const response = await fetch(
        "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/employees/" + id,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw json(
          { message: "Could not delete employee" },
          {
            status: 500,
          }
        );
      }
      navigate("/employees");
    }
  };

  return (
    <Profile employee={data} deleteEmployeeHandler={deleteEmployeeHandler} />
  );
};

export default Employee;

export async function loader({ params }) {
  const id = params.employeeID;

  const response = await fetch(
    "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/employees/" + id
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected employee." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
