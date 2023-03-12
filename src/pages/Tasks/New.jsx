import { useLoaderData } from "react-router-dom";
import TaskForm from "../../components/TaskForm";
const NewTask = () => {
  const data = useLoaderData();
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
  return <TaskForm method="POST" options={options} />;
};

export default NewTask;
