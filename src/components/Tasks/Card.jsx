import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HorizontalStack from "../Layout/HorizontalStack";

import { formatDate } from "../../functions/format-data";

const TaskCard = ({ task }) => {
  const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
  const taskDate = new Date(task.dueDate).getTime();
  const now = Date.now();
  let bgColor;
  if (task.completed) {
    bgColor = "forestgreen";
  } else if (taskDate < now) {
    bgColor = "red";
  } else if (taskDate - now < MILLISECONDS_IN_DAY) {
    bgColor = "maroon";
  } else if (taskDate - now < MILLISECONDS_IN_DAY * 7) {
    bgColor = "orange";
  } else if (taskDate - now > MILLISECONDS_IN_DAY * 14) {
    bgColor = "unset";
  }
  console.log(taskDate, now);

  return (
    <Card sx={{ backgroundColor: bgColor }}>
      <CardContent>
        <Link to={task.id}>
          <HorizontalStack>
            <Typography component="h3">{task.assignee}</Typography>
            <PersonIcon />
          </HorizontalStack>
          <HorizontalStack>
            <Typography component="h3">{task.title}</Typography>
            <AssignmentIcon />
          </HorizontalStack>
          <HorizontalStack>
            <Typography variant="subtitle2">
              {formatDate(task.dueDate)}
            </Typography>
            <CalendarMonthIcon />
          </HorizontalStack>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
