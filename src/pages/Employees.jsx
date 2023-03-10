import { useLoaderData, json } from "react-router-dom";
import { useState } from "react";
import Table from "../components/Table";
const cellNames = [
  "Name",
  "Email",
  "Phone",
  "Salary",
  "Birthday",
  "Remove",
  "Edit",
  "View",
];

const Employees = () => {
  const data = [...useLoaderData()];
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  if (sortBy === "name") {
    data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "email") {
    data.sort((a, b) => a.email.localeCompare(b.email));
  } else if (sortBy === "salary") {
    data.sort((a, b) => b.salary - a.salary);
  } else if (sortBy === "task") {
    data.sort((a, b) => a.task.localeCompare(b.task));
  }

  return (
    <Table
      cellNames={cellNames}
      bodyData={data}
      page={page}
      setPage={setPage}
      pageSize={pageSize}
    />
  );
};

export default Employees;

export async function loader() {
  const response = await fetch(
    "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/employees"
  );
  if (!response.ok) {
    throw json({ message: "Could not fetch employees." }, { status: 500 });
  } else {
    return response;
  }
}
