import { useState } from "react";
import { Form, json, redirect } from "react-router-dom";
import {
  TextField,
  Stack,
  Button,
  Autocomplete,
  Typography,
} from "@mui/material";

import DatePicker from "./DatePicker";
import FormWrapper from "./FormWrapper";

const TaskForm = ({ method, task, options }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [assignee, setAssignee] = useState(task ? task.assignee : "");
  const [dueDate, setDueDate] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const formTitle = method === "POST" ? "Create task" : "Edit task";

  return (
    <FormWrapper>
      <Form method={method}>
        <Stack width={350} m="auto" p={1} spacing={2}>
          <Typography variant="h5" element="h2" textAlign="center">
            {formTitle}
          </Typography>
          <TextField
            label="Title"
            name="title"
            required
            value={title}
            onChange={(e) => handleTitleChange(e)}
            variant="standard"
          />

          <Autocomplete
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assignee"
                name="assignee"
                required
                variant="standard"
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
          <DatePicker
            name="dueDate"
            disablePast={true}
            label="Due Date *"
            value={dueDate}
            setDate={setDueDate}
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={6}
            required
            variant="outlined"
            defaultValue={task ? task.description : ""}
          />
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
