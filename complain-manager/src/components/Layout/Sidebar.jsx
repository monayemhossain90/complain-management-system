import {useState} from 'react';
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {FaSignOutAlt} from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import {Link, useLocation} from "react-router-dom";
import {logout} from "../../helper/SessionHelper.js";
import { navItems } from '../../data/data.js';

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const path = location.pathname;

    return (
      <>
        {/*Sidebar started*/}

        <div
          className={`${
            open ? "w-72" : "w-20"
          } hidden md:block sidebar h-screen px-5 pb-5 pt-8 duration-300 bg-dark-purple rounded-r-xl relative`}
        >
          {/* logo part*/}
          <div className="flex gap-x-4 items-center">
            <img
              src={logo}
              className="cursor-pointer duration-500"
              alt="logo"
            />
            <h1
              className={`text-white origin-left font-semibold text-xl duration-300 ${
                !open && "scale-0"
              }`}
            >
             Manager
            </h1>
          </div>
          {/* logo part ended*/}

          {open ? (
            <>
              <div
                onClick={() => setOpen(!open)}
                className="bg-red-400 p-1.5 border-dark-purple absolute -right-4 top-9 rounded-full cursor-pointer"
              >
                <IoIosArrowBack className="text-xl text-white" />
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => setOpen(!open)}
                className="bg-red-400 p-1.5 border-dark-purple absolute -right-5 top-9 rounded-full cursor-pointer"
              >
                <IoIosArrowForward className="text-xl text-white" />
              </div>
            </>
          )}

          {/*menu-items*/}
          <ul className="pt-6 space-y-3">
      
           {/* looping the nav items */}
            {navItems?.map((item, i) => (
              <>
                <Link
                  key={i.toString()}
                  to={item?.link}
                  className={`text-gray-300 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                    path === item?.link && "bg-light-white"
                  }`}
                >
                  <item.icon size={22} />
                  <span
                    className={`${!open && "hidden"} origin-left duration-300`}
                  >
                    {item?.title}
                  </span>
                </Link>
              </>
            ))}

        
            <li
              onClick={() => logout()}
              className="text-gray-300 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md"
            >
              <FaSignOutAlt size={22} />
              <span className={`${!open && "hidden"} origin-left duration-300`}>
                Signout
              </span>
            </li>
          </ul>
          {/*menu-items ended*/}
        </div>

        {/*Sidebar Ended*/}
      </>
    );
};

export default Sidebar;