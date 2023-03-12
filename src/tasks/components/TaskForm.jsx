import { useState } from "react";
import { Form, json, redirect } from "react-router-dom";
import {
  TextField,
  Stack,
  Button,
  Autocomplete,
  Typography,
} from "@mui/material";

import DatePicker from "../../components/DatePicker";
import FormWrapper from "../../layout/FormWrapper";

const TaskForm = ({ method, task, options }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [dueDate, setDueDate] = useState(null);
  const [assigneeID, setAssigneeID] = useState("");
  const [assignee, setAssignee] = useState("");

  const [description, setDescription] = useState(task ? task.description : "");

  const allSelected = title && assignee && dueDate && description;

  const handleAssigneeChange = (e, newValue) => {
    if (newValue) {
      setAssigneeID(newValue.value.employeeID);
      setAssignee(newValue.value.name);
    } else {
      setAssignee(e.target.value);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
          <Stack direction="row" justifyContent="space-between">
            <Autocomplete
              sx={{ width: "75%" }}
              disableClearable
              options={options}
              value={assignee}
              onChange={handleAssigneeChange}
              isOptionEqualToValue={(option, value) => option !== value}
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
            <TextField
              label="ID"
              name="assigneeID"
              sx={{ width: "20%" }}
              value={assigneeID}
              variant="standard"
              InputProps={{ readOnly: true }}
            />
          </Stack>
          <DatePicker
            label="Due Date *"
            name="dueDate"
            value={dueDate}
            setDate={setDueDate}
            disablePast={true}
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={6}
            required
            variant="outlined"
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          />

          <Button variant="contained" type="submit" disabled={!allSelected}>
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
  newTaskData.completed === "true"
    ? (newTaskData.completed = true)
    : (newTaskData.completed = false);

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

  if (newTaskData.completed) {
  }

  return redirect("/tasks");
}
