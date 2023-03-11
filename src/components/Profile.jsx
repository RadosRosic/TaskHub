import { json, useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Stack, Button } from "@mui/material";
import { formatDate } from "../functions/format-data";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EuroIcon from "@mui/icons-material/Euro";

const Profile = ({ employee }) => {
  const navigate = useNavigate();
  const CustomStack = ({ children }) => (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={1}
    >
      {children}
    </Stack>
  );

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
    }
    navigate("..");
    navigate(0);
  };

  return (
    <Box p={2}>
      <Paper sx={{ p: 2, maxWidth: 310, m: "auto" }}>
        <Stack spacing={2}>
          <CustomStack>
            <Typography>
              {employee.name} {employee.lastName}
            </Typography>
            <PersonIcon />
          </CustomStack>
          <CustomStack>
            <Typography>{formatDate(employee.dateOfBirth)}</Typography>
            <CakeIcon />
          </CustomStack>
          <CustomStack>
            <Typography>{employee.email}</Typography>
            <EmailIcon />
          </CustomStack>

          <CustomStack>
            <Typography>{employee.phoneNumber}</Typography>
            <PhoneIcon />
          </CustomStack>
          <CustomStack>
            <Typography>{employee.salary}</Typography>
            <EuroIcon />
          </CustomStack>
          <Button
            color="error"
            onClick={deleteEmployeeHandler.bind(null, employee.id)}
          >
            DELETE
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Profile;
