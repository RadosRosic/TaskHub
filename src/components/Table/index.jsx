import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { formatDate, shortenEmail } from "../../functions/format-data";

const MyTable = ({
  cellNames,
  bodyData,
  setSortBy,
  setPage,
  page,
  pageSize,
  deleteEmployeeHandler,
}) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  const paginatedData = bodyData.slice(from, to);

  const matches = useMediaQuery("(max-width:960px)");

  return (
    <TableContainer component={Paper}>
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            {cellNames.map((name) => (
              <TableCell key={name} onClick={() => setPage((page) => page + 1)}>
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
                <IconButton>
                  <PersonRemoveIcon />
                </IconButton>
              </TableCell>
              <TableCell sx={{ width: 20 }}>
                <IconButton>
                  <ModeEditIcon />
                </IconButton>
              </TableCell>
              <TableCell sx={{ width: 20 }}>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
