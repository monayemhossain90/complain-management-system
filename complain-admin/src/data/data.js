import { FaAdn, FaUsers } from "react-icons/fa";
import {  FaUserDoctor } from "react-icons/fa6";



export const navItems = [
 
    {
        title: "Users List",
        icon: FaUsers,
        link: '/getAllUsers'
    },
   {
        title: "Complains List",
        icon: FaAdn,
        link: '/getAllPendingComplains'
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