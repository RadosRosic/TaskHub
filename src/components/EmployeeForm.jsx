import { useState } from "react";
import { Form, json, redirect } from "react-router-dom";
import { TextField, Stack, Button, Paper, Input } from "@mui/material";
import DatePicker from "./DatePicker";

const EmployeeForm = ({ method, employee }) => {
  const [name, setName] = useState(employee ? employee.name : "");
  const [email, setEmail] = useState(employee ? employee.email : "");
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
      elevation={3}
    >
      <Form method={method}>
        <Stack width={300} m="auto" p={2} spacing={2}>
          <TextField
            label="Name"
            variant="standard"
            name="name"
            required
            value={name}
          />
          <TextField
            label="Email"
            variant="standard"
            name="email"
            type="email"
            required
            value={email}
          />
          <TextField
            label="Phone"
            variant="standard"
            name="phoneNumber"
            required
            defaultValue={employee ? employee.phoneNumber : ""}
          />
          <TextField
            label="Salary"
            variant="standard"
            name="salary"
            required
            defaultValue={employee ? employee.salary : ""}
          />
          <DatePicker
            name="dateOfBirth"
            disableFuture={true}
            label="Date of Birth"
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Paper>
  );
};

export default EmployeeForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const newEmployeeData = {
    name: data.get("name"),
    email: data.get("email"),
    phoneNumber: data.get("phoneNumber"),
    salary: data.get("salary"),
    dateOfBirth: data.get("dateOfBirth"),
  };

  let url = "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/employees";

  if (method === "PUT") {
    const employeeID = params.employeeID;
    url += `/${employeeID}`;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEmployeeData),
  });

  if (!response.ok && method === "PUT") {
    throw json({ message: "Could not edit employee" }, { status: 500 });
  }
  if (!response.ok && method === "POST") {
    throw json({ message: "Could not create new employee" }, { status: 500 });
  }

  return redirect("/employees");
}
