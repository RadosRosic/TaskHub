import { Form } from "react-router-dom";
import { TextField, Stack, Button } from "@mui/material";

const EmployeeForm = () => {
  return (
    <Form>
      <Stack width={300} m="auto" p={2} spacing={2}>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          name="name"
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          name="email"
        />
        <TextField
          id="standard-basic"
          label="Phone"
          variant="standard"
          name="phone"
        />
        <TextField
          id="standard-basic"
          label="Salary"
          variant="standard"
          name="Salary"
        />
        <TextField
          id="standard-basic"
          label="Birthday"
          variant="standard"
          name="birthday"
        />

        <Button variant="contained">Submit</Button>
      </Stack>
    </Form>
  );
};

export default EmployeeForm;

export const editEmployee = async () => {
  const response = await fetch(
    "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/employees",
    {
      method: "PATCH",
    }
  );
};
