import TaskForm from "../../components/TaskForm";
import { useRouteLoaderData } from "react-router-dom";

const NewTask = () => {
  const data = useRouteLoaderData("task");
  return <TaskForm method="PUT" task={data} />;
};

export default NewTask;
