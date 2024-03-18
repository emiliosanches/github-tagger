import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { LoginCallback } from "./pages/LoginCallback";
import { RepositoriesList } from "./pages/RepositoriesList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login-callback",
    element: <LoginCallback />,
  },
  {
    path: "/repositories",
    element: <RepositoriesList />,
  },
]);
