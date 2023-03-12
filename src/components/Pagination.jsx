import { Paper, IconButton } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

const Pagination = ({ page, lastPage, setPage, location = "flex-end" }) => {
  const goToFirstPage = () => {
    setPage(1);
  };
  const prevPage = () => {
    setPage((page) => page - 1);
  };
  const nextPage = () => {
    setPage((page) => page + 1);
  };
  const goToLastPage = () => {
    setPage(lastPage);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: location,
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
