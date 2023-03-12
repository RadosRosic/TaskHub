import { useState } from "react";
import { useRouteLoaderData, json } from "react-router-dom";

import Table from "../components/Table";

const Employees = () => {
  const data = [...useRouteLoaderData("employees")];
  const [page, setPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() - 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showTopWorkers, setShowTopWorkers] = useState(false);

  const sortByCompletedTasks = () => {
    data.sort((a, b) => {
      return (
        b.completedTasks.filter((task) => {
          return (
            new Date(task.time).getMonth() === selectedMonth &&
            new Date(task.time).getFullYear() === selectedYear
          );
        }).length -
        a.completedTasks.filter((task) => {
          return (
            new Date(task.time).getMonth() === selectedMonth &&
            new Date(task.time).getFullYear() === selectedYear
          );
        }).length
      );
    });
  };

  const sortByName = () => {
    data.sort((a, b) => a.name.localeCompare(b.name));
  };

  if (showTopWorkers) {
    sortByCompletedTasks();
  } else {
    sortByName();
  }

  const pageSize = 5;
  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  const paginatedData = data.slice(from, to);
  const lastPage = Math.ceil(data.length / pageSize);

  return (
    <Table
      page={page}
      pageSize={pageSize}
      lastPage={lastPage}
      setPage={setPage}
      paginatedData={paginatedData}
      showTopWorkers={showTopWorkers}
      setShowTopWorkers={setShowTopWorkers}
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      setSelectedMonth={setSelectedMonth}
      setSelectedYear={setSelectedYear}
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
