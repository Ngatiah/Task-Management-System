import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./features/header/index";
import Home from "./features/home/index";
import AddTask from "./components/services/tasks/AddTask";
import EditTask from "./components/services/tasks/EditTask";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import ForgotPassword from "./components/auth/forgot-password";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/add-task",
      element: <AddTask />,
    },
    {
      path: "/edit-task/:taskId",
      element: <ProtectedRoute> <EditTask /> </ProtectedRoute> ,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword/> ,
    },
    
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
