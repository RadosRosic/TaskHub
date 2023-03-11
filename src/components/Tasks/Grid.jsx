import { Link } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import TaskCard from "./Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TaskGrid = ({ tasks }) => {
  return (
    <Stack alignItems="center" spacing={2} py={2}>
      <Link to="new-task">
        <AddCircleIcon
          sx={{
            fontSize: "50px",
          }}
        />
      </Link>

      <Grid container spacing={3} p={3}>
        {tasks.map((task) => (
          <Grid key={task.id} item xs={12} sm={6} md={4} lg={3}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default TaskGrid;
