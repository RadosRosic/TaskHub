import { Link } from "react-router-dom";
import {
  Grid,
  Stack,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import TaskCard from "./Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TaskGrid = ({ tasks, checkBoxHandler }) => {
  return (
    <Box sx={{ width: "80%", m: "auto" }}>
      <Stack alignItems="center" spacing={2} py={2}>
        <Link to="new-task">
          <Stack direction="row" spacing={1}>
            <Typography color="primary"> Create task </Typography>
            <AddCircleIcon color="primary" />
          </Stack>
        </Link>
        <FormControlLabel
          control={<Checkbox onChange={(e) => checkBoxHandler(e)} />}
          label="Uncompleted only"
        />
        <Grid container spacing={1} p={1}>
          {tasks.map((task) => (
            <Grid key={task.id} item xs={12} sm={6} md={4} lg={3}>
              {<TaskCard task={task} />}
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default TaskGrid;
