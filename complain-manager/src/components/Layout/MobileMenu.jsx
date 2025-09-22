import {FaSignOutAlt} from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import {Link, useLocation} from "react-router-dom";
import {logout} from "../../helper/SessionHelper.js";
import { navItems } from "../../data/data.js";


const MobileMenu = ({showMenu, setShowMenu}) => {
    const location = useLocation();
    const path = location.pathname;

    return (
      <>
        <div
          className={`${
            showMenu ? "left-0" : "-left-[100%]"
          } fixed top-0 bottom-0 h-screen z-20 w-72 bg-dark-purple dark:text-white px-5 pb-5 pt-8 md:hidden transition-all duration-500 rounded-r-xl shadow-md`}
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

          <ul className="pt-6 space-y-3">
            {/* looping the nav items */}
            {navItems?.map((item, i) => (
              <>
                <Link
                  key={i.toString()}
                  to={item?.link}
                  onClick={() => setShowMenu(false)}
                  className={`text-gray-300 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                    path === item?.link && "bg-light-white"
                  }`}
                >
                  <item.icon size={22} />
                  <span className="origin-left duration-300">
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
              <span className="origin-left duration-300">Signout</span>
            </li>
          </ul>
        </div>
      </>
    );
};

export default MobileMenu;