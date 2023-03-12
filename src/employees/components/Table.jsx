import { Link } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import EmployeeFilter from "./EmployeeFilter";
import Pagination from "../../layout/Pagination";
import { formatDate, shortenEmail } from "../../functions/format-data";

const MyTable = ({
  pageSize,
  lastPage,
  paginatedData,
  selectedYear,
  setSelectedYear,
  setPage,
  page,
  selectedMonth,
  setSelectedMonth,
  setShowTopWorkers,
  showTopWorkers,
}) => {
  const matches960px = useMediaQuery("(min-width:960px)");
  const matches650px = useMediaQuery("(min-width:650px)");
  const matches475px = useMediaQuery("(min-width:475px)");

  const getCompletedTasks = (employee) => {
    let totalCompletedTasks = 0;

    if (showTopWorkers) {
      employee.completedTasks.forEach((task) => {
        const taskDate = new Date(task.time);
        if (
          taskDate.getMonth() === selectedMonth &&
          taskDate.getFullYear() === selectedYear
        ) {
          totalCompletedTasks++;
        }
      });
    } else {
      totalCompletedTasks = employee.completedTasks.length;
    }

    return totalCompletedTasks;
  };

  return (
    <Stack alignItems="center" spacing={2} py={2}>
      <Link to="new-employee">
        <Stack direction="row" spacing={1}>
          <Typography color="primary"> Create employee </Typography>
          <PersonAddIcon color="primary" />
        </Stack>
      </Link>

      <EmployeeFilter
        showTopWorkers={showTopWorkers}
        setShowTopWorkers={setShowTopWorkers}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />

      <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell width={150}>Tasks Done</TableCell>
              {matches960px && <TableCell>Phone</TableCell>}
              {matches475px && <TableCell>Email</TableCell>}
              {matches475px && <TableCell>Salary</TableCell>}
              {matches960px && <TableCell>Birthday</TableCell>}
              <TableCell width={100}>Edit</TableCell>
              <TableCell width={100}>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  {`${employee.name} 
                  ${employee.lastName}`}
                </TableCell>
                <TableCell>{`${getCompletedTasks(employee)}`}</TableCell>
                {matches960px && (
                  <TableCell>
                    <Link to={`tel:${employee.phoneNumber}`}>
                      {employee.phoneNumber}
                    </Link>
                  </TableCell>
                )}
                {matches475px && (
                  <TableCell>
                    <Link to={`mailto:${employee.email}`}>
                      {matches960px
                        ? employee.email
                        : shortenEmail(employee.email)}
                    </Link>
                  </TableCell>
                )}
                {matches475px && <TableCell>{employee.salary}€</TableCell>}
                {matches960px && (
                  <TableCell>{formatDate(employee.dateOfBirth)}</TableCell>
                )}
                <TableCell>
                  <Link to={`${employee.id}/edit-employee`}>
                    <ModeEditIcon />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={employee.id}>
                    <VisibilityIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        page={page}
        pageSize={pageSize}
        lastPage={lastPage}
        setPage={setPage}
      />
    </Stack>
  );
};

export default MyTable;
