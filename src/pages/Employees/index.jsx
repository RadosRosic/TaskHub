import { useState } from "react";
import { useRouteLoaderData, json, useNavigate } from "react-router-dom";

import Table from "../../components/Table";

const Employees = () => {
  const data = [...useRouteLoaderData("employees")];
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const lastPage = Math.ceil(data.length / pageSize);

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
    <>
      <Table
        bodyData={data}
        page={page}
        setPage={setPage}
        setSortBy={setSortBy}
        pageSize={pageSize}
        lastPage={lastPage}
      />
    </>
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
