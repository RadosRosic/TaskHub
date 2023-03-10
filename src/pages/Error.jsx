import { useRouteError } from "react-router-dom";
import MainHeader from "../components/MainHeader";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An Error Occured";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Page not found";
    message = "Could not find page :(";
  }

  return (
    <div>
      <MainHeader />
      <p>{title}</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
