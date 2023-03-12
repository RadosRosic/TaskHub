import { json, Link, useRouteLoaderData, redirect } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import VerticalStack from "../../components/Layout/VerticalStack";
import HorizontalStack from "../../components/Layout/HorizontalStack";

import { formatDate } from "../../functions/format-data";

const Task = () => {
  const data = useRouteLoaderData("task");
  console.log(data);

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
    console.log(employeeRes);

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
    redirect("/tasks");
  };
  return (
    <VerticalStack>
      <HorizontalStack>
        <Typography>{data.assignee}</Typography>
        <PersonIcon />
      </HorizontalStack>
      <HorizontalStack>
        <Typography>{data.title}</Typography>
        <AssignmentIcon />
      </HorizontalStack>
      <HorizontalStack>
        <Typography variant="subtitle2">{formatDate(data.dueDate)}</Typography>
        <CalendarMonthIcon />
      </HorizontalStack>
      <Typography variant="body2">{data.description}</Typography>
      <Typography variant="body2" color="primary" textAlign="center">
        <Link to="edit-task">EDIT</Link>
      </Typography>
      <Button onClick={markComplete}>Mark as done</Button>
    </VerticalStack>
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
