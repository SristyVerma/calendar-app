import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import VendorIntegration from "../Pages/VendorIntegration";


export const routes = [
  {
    path: "/",
    component: <Home />, 
    protected: false, 
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
    protected: false,
  },
  {
    path: "/login",
    component: <Login />,
    protected: true,
  },
  {
    path: "/signup",
    component: <Register />,
    protected: true,
  },
  {
    path: "/vendor",
    component: <VendorIntegration />,
    protected: false,
  },
  {
    path: "*",
    component: <div>Page Not Found</div>,
  },
];
