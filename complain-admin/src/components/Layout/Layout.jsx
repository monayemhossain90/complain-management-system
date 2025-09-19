import {useState} from "react";
import Sidebar from "./Sidebar.jsx";
import MobileMenu from "./MobileMenu.jsx";
import {IoMdClose} from "react-icons/io";
import {HiMenuAlt3} from "react-icons/hi";
import {Outlet} from "react-router-dom";



const Layout = () => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <Sidebar />
                <div className="content flex-1 h-screen md:overflow-y-scroll">
                    {/*Header Started*/}
                    <div className="shadow-md block md:hidden px-4 py-5 z-10 bg-white dark:bg-dark dark:text-white duration-300">
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold font-serif text-3xl">Complain Management Admin</h1>
                            <div>
                                {/* Mobile Hamburger icon */}
                                {showMenu ? (
                                    <IoMdClose
                                        onClick={toggleMenu}
                                        className=" cursor-pointer transition-all"
                                        size={30}
                                    />
                                ) : (
                                    <HiMenuAlt3
                                        onClick={toggleMenu}
                                        className="cursor-pointer transition-all"
                                        size={30}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    {/*Header Ended*/}

                    <div className="content-body p-4 h-auto overflow-y-scroll md:overflow-y-auto">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <MobileMenu showMenu={showMenu} setShowMenu={setShowMenu}/>
        </>
    );
};

export default Layout;