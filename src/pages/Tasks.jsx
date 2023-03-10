import { useLoaderData, json } from "react-router-dom";

const Tasks = () => {
  const data = useLoaderData();

  return <div>Tasks</div>;
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
