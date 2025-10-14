import { createBrowserRouter, } from "react-router-dom";

import Login from './pages/login/Login';
/*
import SignUp from './pages/signUp/SignUp';
import Home from './pages/home/Home';
import RegisterEvent from "./pages/registerEvent/RegisterEvent";
import ResetPassword from "./pages/resetPassword/ResetPassword";
*/

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Login /> 
    },

    /*
    { 
        path: "/signUp", 
        element: <SignUp /> 
    },
    
    {
    path: "/home", 
        element: <Home /> 
    },
    
    {
    path: "/registerEvent", 
        element: <RegisterEvent /> 
    },
    
    {
    path: "/resetPassword", 
        element: <ResetPassword /> 
    },
    */
])

export default router