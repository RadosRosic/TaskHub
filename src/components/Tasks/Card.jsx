import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

import { formatDate, shortenText } from "../../functions/format-data";

const TaskCard = ({ task }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h3">
          {task.assignee}
        </Typography>
        <Typography variant="h6" component="h3">
          {task.title}
        </Typography>
        <Typography variant="subtitle2">{formatDate(task.dueDate)}</Typography>
        <Typography variant="body2">{shortenText(task.description)}</Typography>
        <Typography>{task.completed}</Typography>
        {/* <Typography>{task.assignee}</Typography> */}
      </CardContent>
      <CardActions>
        <Button>More info</Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
