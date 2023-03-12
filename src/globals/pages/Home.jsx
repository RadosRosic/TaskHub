import { Link } from "react-router-dom";
import { Box, Typography, Paper, Stack } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Paper sx={{ maxWidth: 500, m: "auto", p: 4, mt: 4 }}>
        <Stack spacing={3}>
          <Typography>
            Welcome to Task Hub, the ultimate task management app. With Task
            Hub, you can easily create, track, and manage tasks from anywhere,
            anytime.
          </Typography>
          <Typography>
            Create, read, update, delete employees and tasks.
          </Typography>
          <Typography>
            Asign tasks to employees and track completed tasks.
          </Typography>
          <Typography>
            See the top performing workers for each month.
          </Typography>
          <Typography>Visit Github repo to read the readme file.</Typography>
          <Typography color="primary" align="center">
            <Link to="https://github.com/RadosRosic" target="_blank">
              Github
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Home;
