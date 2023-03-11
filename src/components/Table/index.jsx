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
  IconButton,
  Stack,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { formatDate, shortenEmail } from "../../functions/format-data";

const MyTable = ({
  bodyData,
  setSortBy,
  setPage,
  page,
  pageSize,
  deleteEmployeeHandler,
  lastPage,
}) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  const paginatedData = bodyData.slice(from, to);

  const matches960px = useMediaQuery("(min-width:960px)");
  const matches650px = useMediaQuery("(min-width:650px)");
  const matches550px = useMediaQuery("(min-width:550px)");
  const matches475px = useMediaQuery("(min-width:475px)");

  const nextPage = () => {
    setPage((page) => page + 1);
  };
  const goToFirstPage = () => {
    setPage(1);
  };
  const goToLastPage = () => {
    setPage(lastPage);
  };
  const prevPage = () => {
    setPage((page) => page - 1);
  };

  return (
    <Stack alignItems="center" spacing={2} py={2}>
      <Link to="new-employee">
        <PersonAddIcon
          sx={{
            fontSize: "50px",
          }}
        />
      </Link>

      <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              {matches650px && <TableCell>Phone</TableCell>}
              {matches475px && <TableCell>Salary</TableCell>}
              {matches960px && <TableCell>Birthday</TableCell>}
              <TableCell>Edit</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  {`${employee.name} 
                  ${employee.lastName}`}
                </TableCell>

                <TableCell>
                  <Link to={`mailto:${employee.email}`}>
                    {matches650px
                      ? employee.email
                      : shortenEmail(employee.email)}
                  </Link>
                </TableCell>
                {matches650px && (
                  <TableCell>
                    <Link to={`tel:${employee.phoneNumber}`}>
                      {employee.phoneNumber}
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
      <Paper
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton onClick={goToFirstPage} disabled={page === 1}>
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={prevPage} disabled={page === 1}>
          <KeyboardArrowLeft />
        </IconButton>
        {page}
        <IconButton onClick={nextPage} disabled={page === lastPage}>
          <KeyboardArrowRight />
        </IconButton>
        <IconButton onClick={goToLastPage} disabled={page === lastPage}>
          <LastPageIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default MyTable;
