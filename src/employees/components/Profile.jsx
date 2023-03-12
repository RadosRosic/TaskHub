import { json, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EuroIcon from "@mui/icons-material/Euro";

import VerticalStack from "../../layout/VerticalStack";
import HorizontalStack from "../../layout/HorizontalStack";

import { formatDate } from "../../functions/format-data";
const Profile = ({ employee }) => {
  const navigate = useNavigate();
  const deleteEmployeeHandler = async (id) => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      const response = await fetch(
        "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/employees/" + id,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw json(
          { message: "Could not delete employee" },
          {
            status: 500,
          }
        );
      }
      navigate("..");
      navigate(0);
    }
  };

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
      <HorizontalStack>
        <Typography>{employee.email}</Typography>
        <EmailIcon />
      </HorizontalStack>

      <HorizontalStack>
        <Typography>{employee.phoneNumber}</Typography>
        <PhoneIcon />
      </HorizontalStack>
      <HorizontalStack>
        <Typography>{employee.salary}</Typography>
        <EuroIcon />
      </HorizontalStack>
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
