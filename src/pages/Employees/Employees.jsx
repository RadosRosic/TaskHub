import { useState } from "react";
import { useRouteLoaderData, json } from "react-router-dom";

import Table from "../../components/Table";

const Employees = () => {
  const data = [...useRouteLoaderData("employees")];
  const [page, setPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() - 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showTopWorkers, setShowTopWorkers] = useState(false);

  const pageSize = 5;
  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  const paginatedData = data.slice(from, to);
  const lastPage = Math.ceil(data.length / pageSize);

  const sortEmployeesByCompletedTasks = (
    employees,
    selectedMonth,
    selectedYear
  ) => {
    return employees.sort((employeeA, employeeB) => {
      let completedTasksA = employeeA.completedTasks.filter((task) => {
        let taskDate = new Date(task.time);
        return (
          taskDate.getMonth() === selectedMonth &&
          taskDate.getFullYear() === selectedYear
        );
      }).length;

      let completedTasksB = employeeB.completedTasks.filter((task) => {
        let taskDate = new Date(task.time);
        return (
          taskDate.getMonth() === selectedMonth &&
          taskDate.getFullYear() === selectedYear
        );
      }).length;

      return completedTasksB - completedTasksA;
    });
  };

  if (showTopWorkers) {
    sortEmployeesByCompletedTasks(data, selectedMonth, selectedYear);
  }

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
