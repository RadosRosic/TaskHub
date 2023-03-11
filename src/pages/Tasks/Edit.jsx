import TaskForm from "../../components/TaskForm";
import { useRouteLoaderData, useLoaderData } from "react-router-dom";

const EditTask = () => {
  const data = useLoaderData();
  const task = useRouteLoaderData("task");
  const options = data?.map((employee) => {
    return {
      employeeID: employee.id,
      label: `${employee.lastName} ${employee.name}`,
    };
  });
  options?.sort((a, b) => a.label.localeCompare(b.label));

  console.log(options);
  return <TaskForm method="PUT" task={task} options={options} />;
};

export default EditTask;
