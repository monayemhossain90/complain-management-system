import { FaAdn, FaUsers } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";




export const navItems = [
     {
        title: "Dashboard",
        icon: MdOutlineDashboard,
        link: '/'
    },

     {
        title: "Pending Complains",
        icon: FaAdn,
        link: '/getAllPendingComplains'
    },

      {
        title: "Completed Complains",
        icon: FaAdn,
        link: '/getAllCompletedComplains'
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
 
  

  
]