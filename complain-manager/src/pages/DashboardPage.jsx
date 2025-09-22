import { useLocation } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import { useEffect } from "react";


const DashboardPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
      // "document.documentElement.scrollTo" is the magic for React Router Dom v6
      document.documentElement.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant", // Optional if you want to skip the scrolling animation
      });
  }, [pathname]);

  
    return (
        <>
        <section className="bg-gray-100 min-h-[90vh]">
          <div className="px-4 py-3">
           <Dashboard/>
          
          </div>
        </section>
        </>
    );
};

export default DashboardPage;