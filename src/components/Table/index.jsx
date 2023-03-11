import { Link } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { formatDate } from "../../functions/format-data";

const MyTable = ({
  cellNames,
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

  const matches = useMediaQuery("(max-width:960px)");

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
    <>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              {cellNames.map((name, i) => (
                <TableCell
                  key={name + i}
                  onClick={() => setSortBy(name.toLowerCase())}
                >
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.phoneNumber}</TableCell>
                <TableCell>{data.salary}</TableCell>
                <TableCell>{formatDate(data.dateOfBirth)}</TableCell>
                <TableCell sx={{ width: 20 }}>
                  <IconButton onClick={() => deleteEmployeeHandler(data.id)}>
                    <PersonRemoveIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ width: 20 }}>
                  <Link to={`${data.id}/edit-employee`}>
                    <ModeEditIcon />
                  </Link>
                </TableCell>
                <TableCell sx={{ width: 20 }}>
                  <Link to={data.id}>
                    <VisibilityIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={goToFirstPage} disabled={page === 1}>
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={prevPage} disabled={page === 1}>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton onClick={nextPage} disabled={page === lastPage}>
          <KeyboardArrowRight />
        </IconButton>
        <IconButton onClick={goToLastPage} disabled={page === lastPage}>
          <LastPageIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default MyTable;
