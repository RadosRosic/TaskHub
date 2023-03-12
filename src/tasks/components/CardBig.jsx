import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import VerticalStack from "../../layout/VerticalStack";
import HorizontalStack from "../../layout/HorizontalStack";

import { formatDate } from "../../functions/format-data";

const CardBig = ({ data, markComplete, deleteTaskHandler }) => {
  return (
    <VerticalStack>
      <HorizontalStack>
        <Typography>{data.assignee}</Typography>
        <PersonIcon />
      </HorizontalStack>
      <HorizontalStack>
        <Typography>{data.title}</Typography>
        <AssignmentIcon />
      </HorizontalStack>
      <HorizontalStack>
        <Typography variant="subtitle2">{formatDate(data.dueDate)}</Typography>
        <CalendarMonthIcon />
      </HorizontalStack>
      <Typography variant="body2">{data.description}</Typography>
      <Typography variant="body2" color="primary" textAlign="center">
        <Link to="edit-task">EDIT</Link>
      </Typography>
      <Button onClick={markComplete}>Mark as done</Button>
      <Button color="error" onClick={deleteTaskHandler.bind(null, data.id)}>
        DELETE
      </Button>
    </VerticalStack>
  );
};

export default CardBig;
