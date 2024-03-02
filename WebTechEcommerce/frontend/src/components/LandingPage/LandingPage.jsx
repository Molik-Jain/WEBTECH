import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const LandingPage = () => {
  return (
    <div>
      <div className="fixed w-full z-50 backdrop-blur-xl">
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LandingPage;
