import { FaAdn, FaUsers } from "react-icons/fa";
import {  FaUserDoctor } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md"


export const navItems = [
    {
        title: "Dashboard",
        icon: MdOutlineDashboard,
        link: '/'
    },
    {
        title: "Users List",
        icon: FaUsers,
        link: '/users'
    },
    {
        title: "Doctors",
        icon: FaUserDoctor,
        link: '/doctors'
    },
    {
        title: "Appointments",
        icon: FaAdn,
        link: '/appointments'
    },
  
   

  
]