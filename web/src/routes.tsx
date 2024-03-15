import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { LoginCallback } from "./pages/LoginCallback";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login-callback",
    element: <LoginCallback />,
  },
]);
