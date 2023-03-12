import { useState } from "react";
import { useLoaderData, json } from "react-router-dom";
import TaskGrid from "../components/Grid";

const Tasks = () => {
  let data = [...useLoaderData()];
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("assignee");
  const [uncompletedOnly, setUncompletedOnly] = useState(false);
  const [disableColors, setDisableColors] = useState(false);

  if (uncompletedOnly) {
    data = data.filter((task) => !task.completed);
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const checkBoxHandler = (e) => {
    if (e.target.checked) {
      setUncompletedOnly(true);
    } else {
      setUncompletedOnly(false);
    }
  };

  const handleColors = (e) => {
    if (e.target.checked) {
      setDisableColors(true);
    } else {
      setDisableColors(false);
    }
  };

  if (sortBy === "dueDate") {
    data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else {
    data.sort((a, b) => {
      if (a.assignee && b.assignee) {
        const assigneeComparison = a.assignee.localeCompare(b.assignee);
        if (assigneeComparison !== 0) {
          return assigneeComparison;
        } else {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
      } else {
        return 0;
      }
    });
  }

  const pageSize = 12;
  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  const paginatedData = data.slice(from, to);
  const lastPage = Math.ceil(data.length / pageSize);

  return (
    <TaskGrid
      tasks={paginatedData}
      uncompletedOnly={uncompletedOnly}
      checkBoxHandler={checkBoxHandler}
      page={page}
      lastPage={lastPage}
      setPage={setPage}
      sortBy={sortBy}
      handleSortChange={handleSortChange}
      disableColors={disableColors}
      handleColors={handleColors}
    />
  );
};

export default Tasks;

export async function loader() {
  const response = await fetch(
    "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/tasks"
  );
  if (!response.ok) {
    throw json({ message: "Could not fetch employees." }, { status: 500 });
  } else {
    return response;
  }
}
