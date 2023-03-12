import { useState } from "react";
import { useRouteLoaderData, json } from "react-router-dom";

import Table from "../../components/Table";

const Employees = () => {
  const data = [...useRouteLoaderData("employees")];
  const [page, setPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() - 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showTopWorkers, setShowTopWorkers] = useState(false);

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
    const test = sortEmployeesByCompletedTasks(
      data,
      selectedMonth,
      selectedYear
    );
    console.log(test);
  }

  return (
    <Table
      page={page}
      setPage={setPage}
      bodyData={data}
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
