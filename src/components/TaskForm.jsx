import { Form, json, redirect } from "react-router-dom";
import { TextField, Stack, Button, Paper } from "@mui/material";
import DatePicker from "./DatePicker";

const TaskForm = ({ method, task }) => {
  return (
    <Form method={method}>
      <Stack width={300} m="auto" p={2} spacing={2}>
        <TextField
          label="Title"
          variant="standard"
          name="title"
          required
          defaultValue={task ? task.title : ""}
        />
        <TextField
          label="Description"
          variant="standard"
          name="description"
          required
          defaultValue={task ? task.description : ""}
        />
        <TextField
          label="Assignee"
          variant="standard"
          name="assignee"
          required
          defaultValue={task ? task.assignee : ""}
        />

        <TextField
          label="Completed"
          variant="standard"
          name="completed"
          required
          defaultValue={task ? task.completed : ""}
        />
        <DatePicker name="dueDate" disablePast={true} label="Due Date" />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </Form>
  );
};

export default TaskForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  // const newTaskData = {
  //   title: data.get("title"),
  //   description: data.get("description"),
  //   dueDate: data.get("dueDate"),
  //   completed: data.get("completed"),
  //   assignee: data.get("assignee"),
  // };

  const newTaskData = Object.fromEntries(data);

  console.log(newTaskData);

  let url = "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/tasks";

  if (method === "PUT") {
    const taskID = params.taskID;
    url += `/${taskID}`;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTaskData),
  });

  if (!response.ok && method === "PUT") {
    throw json({ message: "Could not edit task" }, { status: 500 });
  }
  if (!response.ok && method === "POST") {
    throw json({ message: "Could not create new task" }, { status: 500 });
  }

  return redirect("/tasks");
}
