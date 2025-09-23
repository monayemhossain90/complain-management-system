import Layout from "./components/Layout/Layout.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PublicRoute from "./components/routes/PublicRoute.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
 import UsersListPage from "./pages/UsersPage.jsx";
import ComplainsPage from "./pages/ComplainsPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";



const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                     <Route index element={<PrivateRoute><DashboardPage/></PrivateRoute>}/>
                      
                        <Route path="getAllUsers" element={<PrivateRoute><UsersListPage/></PrivateRoute>} />
                      
                        <Route path="getAllPendingComplains" element={<PrivateRoute><ComplainsPage/></PrivateRoute>} /> 
                    

                        <Route path="getHistory" element={<PrivateRoute><HistoryPage/></PrivateRoute>} />
                      
                    </Route>
                    <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}/>
                    <Route path="/*" element={<PrivateRoute><NotFoundPage/></PrivateRoute>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;