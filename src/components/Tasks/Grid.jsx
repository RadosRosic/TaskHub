import React from "react";
import { Grid } from "@mui/material";
import TaskCard from "./Card";

const TaskGrid = ({ tasks }) => {
  return (
    <Grid container spacing={3} p={3}>
      {tasks.map((task) => (
        <Grid key={task.id} item xs={12} sm={6} md={4} lg={3}>
          <TaskCard task={task} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskGrid;
