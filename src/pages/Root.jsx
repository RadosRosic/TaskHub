import { Outlet, useNavigation } from "react-router-dom";
import MainHeader from "../components/MainHeader";

const Root = () => {
  const navigation = useNavigation();

  return (
    <>
      <MainHeader />
      <main>
        {navigation.state === "loading" && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
};

export default Root;
