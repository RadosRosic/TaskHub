import EmployeeForm from "../components/Form";
import { useRouteLoaderData } from "react-router-dom";

const EditEmployee = () => {
  const data = useRouteLoaderData("employee");

  return <EmployeeForm method="PUT" employee={data} />;
};

export default EditEmployee;
