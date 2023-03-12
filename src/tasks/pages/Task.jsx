import {
  json,
  useRouteLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";

import CardBig from "../components/CardBig";

const Task = () => {
  const data = useRouteLoaderData("task");
  const navigate = useNavigate();

  const markComplete = async () => {
    const url = "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/";

    const employeeRes = await fetch(url + "employees/" + data.assigneeID);
    if (!employeeRes.ok) {
      throw json(
        { message: "Could not fetch employee data." },
        {
          status: 500,
        }
      );
    }
    const employeeData = await employeeRes.json();

    const employeeResPut = await fetch(url + "employees/" + data.assigneeID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completedTasks: [
          ...employeeData.completedTasks,
          { taskID: data.id, time: new Date() },
        ],
      }),
    });

    const taskResPut = await fetch(url + "tasks/" + data.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    });

    if (!employeeResPut.ok || !taskResPut.ok) {
      throw json(
        { message: "Could not update data." },
        {
          status: 500,
        }
      );
    }
    navigate("/tasks");
  };

  const deleteTaskHandler = async (id) => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      const response = await fetch(
        "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/tasks/" + id,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw json(
          { message: "Could not delete task" },
          {
            status: 500,
          }
        );
      }
    }
    navigate("/tasks");
  };

  return (
    <CardBig
      data={data}
      markComplete={markComplete}
      deleteTaskHandler={deleteTaskHandler}
    />
  );
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
