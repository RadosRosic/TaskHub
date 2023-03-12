import { Paper, IconButton } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

const Pagination = ({ page, lastPage, setPage }) => {
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
  );
};

export default Pagination;
