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
        title: "Users List",
        icon: FaUsers,
        link: '/getAllUsers'
    },

          {
        title: "History",
        icon: FaAdn,
        link: '/getHistory'
    },
 
  
      {
        title: "Appointments",
        icon: FaAdn,
        link: '/appointments'
    },


  
]