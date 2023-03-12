import TaskForm from "../components/TaskForm";
import { useRouteLoaderData, useLoaderData } from "react-router-dom";

const EditTask = () => {
  const data = useLoaderData();
  const task = useRouteLoaderData("task");
  const options = data?.map((employee) => {
    return {
      label: `${employee.lastName} ${employee.name}`,
      value: {
        name: `${employee.lastName} ${employee.name}`,
        employeeID: employee.id,
      },
    };
  });
  options?.sort((a, b) => a.label.localeCompare(b.label));

  return <TaskForm method="PUT" task={task} options={options} />;
};

export default EditTask;
