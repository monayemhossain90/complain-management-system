import { FaAdn, FaUsers } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";


export const navItems = [
     {
        title: "Dashboard",
        icon: MdOutlineDashboard,
        link: '/'
    },

     {
        title: "Complains List",
        icon: FaAdn,
        link: '/getAllPendingComplains'
    },

   {
        title: "Employee List",
        icon: FaUsers,
        link: '/getAllEmployees'
    },

 
  
]