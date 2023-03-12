import { Link } from "react-router-dom";
import { Grid, Stack, Typography, Box } from "@mui/material";
import TaskCard from "./Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Pagination from "../../layout/Pagination";
import TaskFilters from "./TaskFilters";

const TaskGrid = ({
  tasks,
  checkBoxHandler,
  page,
  lastPage,
  setPage,
  sortBy,
  handleSortChange,
}) => {
  return (
    <>
      <Box sx={{ width: "80%", m: "auto" }}>
        <Stack alignItems="center" spacing={1} py={1}>
          <Link to="new-task">
            <Stack direction="row" spacing={1}>
              <Typography color="primary"> Create task </Typography>
              <AddCircleIcon color="primary" />
            </Stack>
          </Link>

          <TaskFilters
            sortBy={sortBy}
            handleSortChange={handleSortChange}
            checkBoxHandler={checkBoxHandler}
          />
          <Grid container spacing={1} p={1}>
            {tasks.map((task) => (
              <Grid key={task.id} item xs={12} sm={6} md={4} lg={3}>
                {<TaskCard task={task} />}
              </Grid>
            ))}
          </Grid>
          <Pagination
            page={page}
            lastPage={lastPage}
            setPage={setPage}
            location="center"
          />
        </Stack>
      </Box>
    </>
  );
};

export default TaskGrid;
