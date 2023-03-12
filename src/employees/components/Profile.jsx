import { json, Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EuroIcon from "@mui/icons-material/Euro";
import TaskIcon from "@mui/icons-material/Task";

import VerticalStack from "../../layout/VerticalStack";
import HorizontalStack from "../../layout/HorizontalStack";

import { formatDate } from "../../functions/format-data";
const Profile = ({ employee, deleteEmployeeHandler }) => {
  return (
    <VerticalStack>
      <HorizontalStack>
        <Typography>
          {employee.name} {employee.lastName}
        </Typography>
        <PersonIcon />
      </HorizontalStack>
      <HorizontalStack>
        <Typography>{formatDate(employee.dateOfBirth)}</Typography> <CakeIcon />
      </HorizontalStack>
      <Link to={`mailto:${employee.email}`}>
        <HorizontalStack>
          <Typography>{employee.email}</Typography>
          <EmailIcon />
        </HorizontalStack>
      </Link>
      <Link to={`tel:${employee.phoneNumber}`}>
        <HorizontalStack>
          <Typography>{employee.phoneNumber}</Typography>
          <PhoneIcon />
        </HorizontalStack>
      </Link>
      <HorizontalStack>
        <Typography>{employee.salary}</Typography>
        <EuroIcon />
      </HorizontalStack>
      <HorizontalStack>
        <Typography>{employee.completedTasks.length}</Typography>
        <TaskIcon />
      </HorizontalStack>
      <Typography color="primary" textAlign="center">
        <Link to={"edit-employee"}>EDIT</Link>
      </Typography>
      <Button
        color="error"
        onClick={deleteEmployeeHandler.bind(null, employee.id)}
      >
        DELETE
      </Button>
    </VerticalStack>
  );
};

export default Profile;
