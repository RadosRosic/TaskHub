import { Form, json, redirect, useLoaderData } from "react-router-dom";
import {
  TextField,
  Stack,
  Button,
  Autocomplete,
  Typography,
} from "@mui/material";
import DatePicker from "./DatePicker";
import FormWrapper from "./FormWrapper";

const TaskForm = ({ method, task }) => {
  const data = useLoaderData();
  const options = data.map((employee) => {
    return {
      employeeID: employee.id,
      label: `${employee.lastName} ${employee.name}`,
    };
  });
  options.sort((a, b) => a.label.localeCompare(b.label));

  const formTitle = method === "POST" ? "Create task" : "Edit task";

  return (
    <FormWrapper>
      <Form method={method}>
        <Stack width={300} m="auto" p={2} spacing={2}>
          <Typography variant="h5" element="h2" textAlign="center">
            {formTitle}
          </Typography>
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
          <Autocomplete
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assignee"
                variant="standard"
                name="assignee"
                required
              />
            )}
          />
          {method === "PUT" && (
            <TextField
              label="Completed"
              variant="standard"
              name="completed"
              required
              defaultValue={task ? task.completed : ""}
            />
          )}
          <DatePicker name="dueDate" disablePast={true} label="Due Date *" />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </FormWrapper>
  );
};

export default TaskForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const newTaskData = Object.fromEntries(data);

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
