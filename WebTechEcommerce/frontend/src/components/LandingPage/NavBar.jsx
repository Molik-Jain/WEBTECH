import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import CartComponent from "./CartCompnent";
import { Menu } from "lucide-react";

const NavBar = () => {
  const [state, setState] = useState(false);

  const menus = [
    { title: "Signup", path: "/signup" },
    { title: "Login", path: "/login" },
  ];
  return (
    <nav className="w-full my-5">
      <div className="items-center px-4 max-w-screen-xl mx-auto flex md:px-8">
        <div className="flex items-center justify-between md:block">
          <div className=" mt-1 text-center">
            <Link to="/">
              <h2>WebTech.</h2>
            </Link>
          </div>
          {/* <div className="md:hidden">
            <Button
              className="outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </Button>
          </div> */}
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 `}
        >
          <ul
            className={`justify-end items-center space-y-5 md:flex md:space-x-6 md:space-y-0 `}
          >
            <li className="cursor-pointer flex justify-end items-start -mt-3 md:-mt-1">
              <CartComponent />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
