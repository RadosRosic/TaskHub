import { useState } from "react";
import { useLoaderData, json } from "react-router-dom";
import TaskGrid from "../../components/Tasks/Grid";

const Tasks = () => {
  let data = [...useLoaderData()];
  const [uncompletedOnly, setUncompletedOnly] = useState(false);

  if (uncompletedOnly) {
    data = data.filter((task) => !task.completed);
  }

  const checkBoxHandler = (e) => {
    if (e.target.checked) {
      setUncompletedOnly(true);
    } else {
      setUncompletedOnly(false);
    }
  };

  return (
    <TaskGrid
      tasks={data}
      uncompletedOnly={uncompletedOnly}
      checkBoxHandler={checkBoxHandler}
    />
  );
};

export default Tasks;

export async function loader() {
  const response = await fetch(
    "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/tasks"
  );
  if (!response.ok) {
    throw json({ message: "Could not fetch employees." }, { status: 500 });
  } else {
    return response;
  }
}
