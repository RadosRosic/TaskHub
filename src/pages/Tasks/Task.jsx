import { json, useRouteLoaderData } from "react-router-dom";

const Task = () => {
  const data = useRouteLoaderData("task");
  return <div>{data.title}</div>;
};

export default Task;

export async function loader({ params }) {
  const id = params.taskID;

  const response = await fetch(
    "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/tasks/" + id
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected task." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
