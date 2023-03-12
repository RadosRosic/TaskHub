import { useState } from "react";
import { Form, json, redirect } from "react-router-dom";
import { TextField, Stack, Button, Typography } from "@mui/material";
import DatePicker from "../../components/DatePicker";
import FormWrapper from "../../layout/FormWrapper";

const EmployeeForm = ({ method, employee }) => {
  const [name, setName] = useState(employee ? employee.name : "");
  const [lastName, setLastName] = useState(employee ? employee.name : "");
  const [email, setEmail] = useState(employee ? employee.email : "");
  const [phoneNumber, setPhoneNumber] = useState(
    employee ? employee.phoneNumber : ""
  );
  const [salary, setSalary] = useState(employee ? employee.salary : "");
  const [birthdate, setBirthdate] = useState(null);

  const formTitle = method === "POST" ? "Create employee" : "Edit employee";

  let allEntered = name && lastName && email && phoneNumber && salary;
  if (method === "POST") {
    allEntered = allEntered && birthdate;
  }

  const handleNameChange = (e, stateDispatch) => {
    let name = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    name = name.replace(/^\s+/, "");
    let words = name.split(/\s+/);
    words = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    name = words.join(" ");
    stateDispatch(name);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSalaryChange = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9.,]/g, "");
    const fixedDecimals = onlyNums.replace(/,/g, ".");
    const noExtraDecimals = fixedDecimals.replace(/(\..*)\./g, "$1");

    setSalary(noExtraDecimals);
  };

  const handlePhoneChange = (e) => {
    let onlyNumsAndPlus = e.target.value.replace(/[^+\d]/g, "");
    if (onlyNumsAndPlus.indexOf("+") > 0) {
      onlyNumsAndPlus = onlyNumsAndPlus.replace(/\D/g, "");
    }

    setPhoneNumber(onlyNumsAndPlus);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <FormWrapper>
      <Form method={method}>
        <Stack width={300} m="auto" p={2} spacing={2}>
          <Typography variant="h5" element="h2" textAlign="center">
            {formTitle}
          </Typography>
          <TextField
            label="Name"
            name="name"
            required
            value={name}
            onChange={(e) => handleNameChange(e, setName)}
            variant="standard"
          />
          <TextField
            label="Last Name"
            name="lastName"
            required
            value={lastName}
            onChange={(e) => handleNameChange(e, setLastName)}
            variant="standard"
          />
          <TextField
            label="Email"
            name="email"
            required
            value={email}
            onChange={(e) => handleEmailChange(e)}
            variant="standard"
            type="email"
          />
          <TextField
            label="Phone"
            name="phoneNumber"
            required
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e)}
            variant="standard"
          />
          <TextField
            label="Salary"
            name="salary"
            required
            value={salary}
            onChange={(e) => handleSalaryChange(e)}
            variant="standard"
          />
          {method === "POST" && (
            <DatePicker
              label="Date of Birth *"
              name="dateOfBirth"
              value={birthdate}
              setDate={setBirthdate}
              disableFuture={true}
            />
          )}

          <Button variant="contained" type="submit" disabled={!allEntered}>
            Submit
          </Button>
        </Stack>
      </Form>
    </FormWrapper>
  );
};

export default EmployeeForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const newEmployeeData = Object.fromEntries(data);

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
