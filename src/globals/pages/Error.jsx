import { useRouteError } from "react-router-dom";
import { Typography } from "@mui/material";
import Header from "../Header";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An Error Occured";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Page not found";
    message = "Resource does not exist";
  }

  return (
    <div>
      <Header />
      <Typography textAlign="center">{title}</Typography>
      <Typography textAlign="center">{message}</Typography>
    </div>
  );
};

export default ErrorPage;
